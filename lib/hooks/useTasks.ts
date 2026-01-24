'use client'

import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { createClient } from '@/lib/supabase/client'
import type { Database } from '@/types/database.types'
import toast from 'react-hot-toast'

type Task = Database['public']['Tables']['tasks']['Row']
type TaskInsert = Database['public']['Tables']['tasks']['Insert']
type TaskUpdate = Database['public']['Tables']['tasks']['Update']

export function useTasks(goalId: string | undefined) {
    const supabase = createClient()

    return useQuery({
        queryKey: ['tasks', goalId],
        queryFn: async () => {
            if (!goalId) return []

            const { data, error } = await supabase
                .from('tasks')
                .select('*')
                .eq('goal_id', goalId)
                .order('created_at', { ascending: true })

            if (error) throw error
            return data as Task[]
        },
        enabled: !!goalId,
    })
}

export function useCreateTask() {
    const queryClient = useQueryClient()
    const supabase = createClient()

    return useMutation({
        mutationFn: async (task: TaskInsert) => {
            const { data, error } = await supabase
                .from('tasks')
                .insert(task)
                .select()
                .single()

            if (error) throw error
            return data
        },
        onSuccess: (_, variables) => {
            queryClient.invalidateQueries({ queryKey: ['tasks', variables.goal_id] })
            toast.success('Task created successfully!')
        },
        onError: (error: any) => {
            toast.error(error.message || 'Failed to create task')
        },
    })
}

export function useUpdateTask() {
    const queryClient = useQueryClient()
    const supabase = createClient()

    return useMutation({
        mutationFn: async ({ id, goalId, updates }: { id: string; goalId: string; updates: TaskUpdate }) => {
            const { data, error } = await supabase
                .from('tasks')
                .update(updates)
                .eq('id', id)
                .select()
                .single()

            if (error) throw error
            return data
        },
        onSuccess: (_, variables) => {
            queryClient.invalidateQueries({ queryKey: ['tasks', variables.goalId] })
        },
        onError: (error: any) => {
            toast.error(error.message || 'Failed to update task')
        },
    })
}

export function useToggleTask() {
    const queryClient = useQueryClient()
    const supabase = createClient()

    return useMutation({
        mutationFn: async ({ id, goalId, completed }: { id: string; goalId: string; completed: boolean }) => {
            const { data, error } = await supabase
                .from('tasks')
                .update({
                    completed,
                    completed_at: completed ? new Date().toISOString() : null,
                    updated_at: new Date().toISOString()
                })
                .eq('id', id)
                .select()
                .single()

            if (error) throw error
            return data
        },
        onSuccess: async (_, variables) => {
            queryClient.invalidateQueries({ queryKey: ['tasks', variables.goalId] })

            // Update goal progress based on task completion
            await updateGoalProgress(variables.goalId, queryClient)
        },
        onError: (error: any) => {
            toast.error(error.message || 'Failed to update task')
        },
    })
}

export function useDeleteTask() {
    const queryClient = useQueryClient()
    const supabase = createClient()

    return useMutation({
        mutationFn: async ({ id, goalId }: { id: string; goalId: string }) => {
            const { error } = await supabase
                .from('tasks')
                .delete()
                .eq('id', id)

            if (error) throw error
        },
        onSuccess: async (_, variables) => {
            queryClient.invalidateQueries({ queryKey: ['tasks', variables.goalId] })
            toast.success('Task deleted successfully!')

            // Update goal progress after deletion
            await updateGoalProgress(variables.goalId, queryClient)
        },
        onError: (error: any) => {
            toast.error(error.message || 'Failed to delete task')
        },
    })
}

// Helper function to update goal progress based on tasks
async function updateGoalProgress(goalId: string, queryClient: any) {
    const supabase = createClient()

    // Get all tasks for this goal
    const { data: tasks } = await supabase
        .from('tasks')
        .select('completed')
        .eq('goal_id', goalId)

    if (!tasks || tasks.length === 0) {
        // If no tasks, set progress to 0 and status to active
        await supabase
            .from('goals')
            .update({
                progress: 0,
                status: 'active',
                updated_at: new Date().toISOString()
            })
            .eq('id', goalId)
    } else {
        // Calculate progress percentage
        const completedTasks = tasks.filter(t => t.completed).length
        const progress = Math.round((completedTasks / tasks.length) * 100)

        // Determine status based on progress
        const status = progress === 100 ? 'completed' : 'active'

        // Update goal progress and status
        await supabase
            .from('goals')
            .update({
                progress,
                status,
                updated_at: new Date().toISOString()
            })
            .eq('id', goalId)

        // Show celebration message when goal is completed
        if (progress === 100) {
            toast.success('🎉 Goal completed! Congratulations!', { duration: 4000 })
        }
    }

    // Invalidate goal queries to refresh UI
    queryClient.invalidateQueries({ queryKey: ['goals'] })
    queryClient.invalidateQueries({ queryKey: ['goal', goalId] })
}
