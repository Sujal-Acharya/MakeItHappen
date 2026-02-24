'use client'

import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { createClient } from '@/lib/supabase/client'
import type { Database } from '@/types/database.types'
import toast from 'react-hot-toast'

type Goal = Database['public']['Tables']['goals']['Row']
type GoalInsert = Database['public']['Tables']['goals']['Insert']
type GoalUpdate = Database['public']['Tables']['goals']['Update']

export function useGoals(userId: string | undefined) {
    const supabase = createClient()

    return useQuery({
        queryKey: ['goals', userId],
        queryFn: async () => {
            if (!userId) return []

            const { data, error } = await supabase
                .from('goals')
                .select('*')
                .eq('user_id', userId)
                .order('created_at', { ascending: false })

            if (error) throw error
            return data as Goal[]
        },
        enabled: !!userId,
    })
}

export function useCreateGoal() {
    const queryClient = useQueryClient()
    const supabase = createClient()

    return useMutation({
        mutationFn: async (goal: GoalInsert) => {
            const { data, error } = await supabase
                .from('goals')
                // @ts-ignore
                .insert(goal)
                .select()
                .single()

            if (error) throw error
            return data
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['goals'] })
            toast.success('Goal created successfully!')
        },
        onError: (error: any) => {
            toast.error(error.message || 'Failed to create goal')
        },
    })
}

export function useUpdateGoal() {
    const queryClient = useQueryClient()
    const supabase = createClient()

    return useMutation({
        mutationFn: async ({ id, updates }: { id: string; updates: GoalUpdate }) => {
            const { data, error } = await supabase
                .from('goals')
                // @ts-ignore
                .update(updates)
                .eq('id', id)
                .select()
                .single()

            if (error) throw error
            return data
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['goals'] })
            toast.success('Goal updated successfully!')
        },
        onError: (error: any) => {
            toast.error(error.message || 'Failed to update goal')
        },
    })
}

export function useDeleteGoal() {
    const queryClient = useQueryClient()
    const supabase = createClient()

    return useMutation({
        mutationFn: async (id: string) => {
            const { error } = await supabase
                .from('goals')
                .delete()
                .eq('id', id)

            if (error) throw error
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['goals'] })
            toast.success('Goal deleted successfully!')
        },
        onError: (error: any) => {
            toast.error(error.message || 'Failed to delete goal')
        },
    })
}
