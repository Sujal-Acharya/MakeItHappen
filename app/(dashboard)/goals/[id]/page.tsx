'use client'

import { useParams, useRouter } from 'next/navigation'
import { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import { Progress } from '@/components/ui/progress'
import { Skeleton } from '@/components/ui/skeleton'
import { Checkbox } from '@/components/ui/checkbox'
import { useQuery, useQueryClient } from '@tanstack/react-query'
import { createClient } from '@/lib/supabase/client'
import { ArrowLeft, Calendar, Target, TrendingUp, Edit, Trash2, Plus, X } from 'lucide-react'
import Link from 'next/link'
import { useDeleteGoal } from '@/lib/hooks/useGoals'
import { useTasks, useCreateTask, useToggleTask, useDeleteTask } from '@/lib/hooks/useTasks'
import toast from 'react-hot-toast'

export default function GoalDetailPage() {
    const params = useParams()
    const router = useRouter()
    const queryClient = useQueryClient()
    const goalId = params.id as string
    const supabase = createClient()
    const deleteGoal = useDeleteGoal()

    const [newTaskTitle, setNewTaskTitle] = useState('')
    const [isAddingTask, setIsAddingTask] = useState(false)

    const { data: goal, isLoading: goalLoading } = useQuery({
        queryKey: ['goal', goalId],
        queryFn: async () => {
            const { data, error } = await supabase
                .from('goals')
                .select('*')
                .eq('id', goalId)
                .single()

            if (error) throw error
            return data
        },
    })

    const { data: tasks, isLoading: tasksLoading } = useTasks(goalId)
    const createTask = useCreateTask()
    const toggleTask = useToggleTask()
    const deleteTask = useDeleteTask()

    const handleDelete = async () => {
        if (!confirm('Are you sure you want to delete this goal? All tasks will also be deleted.')) return

        await deleteGoal.mutateAsync(goalId)
        router.push('/goals')
    }

    const handleAddTask = async (e: React.FormEvent) => {
        e.preventDefault()
        if (!newTaskTitle.trim()) return

        await createTask.mutateAsync({
            goal_id: goalId,
            title: newTaskTitle.trim(),
            completed: false,
        })

        setNewTaskTitle('')
        setIsAddingTask(false)
    }

    const handleToggleTask = async (taskId: string, completed: boolean) => {
        await toggleTask.mutateAsync({
            id: taskId,
            goalId,
            completed: !completed,
        })

        // Refresh goal to show updated progress
        queryClient.invalidateQueries({ queryKey: ['goal', goalId] })
    }

    const handleDeleteTask = async (taskId: string) => {
        if (!confirm('Are you sure you want to delete this task?')) return

        await deleteTask.mutateAsync({ id: taskId, goalId })

        // Refresh goal to show updated progress
        queryClient.invalidateQueries({ queryKey: ['goal', goalId] })
    }

    if (goalLoading) {
        return (
            <div className="p-6 space-y-6">
                <Skeleton className="h-20 w-full" />
                <div className="grid md:grid-cols-3 gap-6">
                    <div className="md:col-span-2">
                        <Skeleton className="h-64" />
                    </div>
                    <Skeleton className="h-64" />
                </div>
            </div>
        )
    }

    if (!goal) {
        return (
            <div className="p-6">
                <Card>
                    <CardContent className="pt-6 text-center py-12">
                        <Target className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                        <h3 className="font-semibold mb-2">Goal Not Found</h3>
                        <p className="text-sm text-muted-foreground mb-4">
                            This goal doesn't exist or you don't have access to it
                        </p>
                        <Link href="/goals">
                            <Button>Back to Goals</Button>
                        </Link>
                    </CardContent>
                </Card>
            </div>
        )
    }

    const completedTasks = tasks?.filter(t => t.completed).length || 0
    const totalTasks = tasks?.length || 0

    return (
        <div className="p-6 space-y-6 animate-fade-in">
            {/* Header */}
            <div className="flex items-center gap-4">
                <Link href="/goals">
                    <Button variant="ghost" size="icon">
                        <ArrowLeft className="h-5 w-5" />
                    </Button>
                </Link>
                <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                        <h1 className="text-3xl font-bold">{goal.title}</h1>
                        <Badge variant={goal.status === 'completed' ? 'success' : goal.status === 'paused' ? 'warning' : 'default'}>
                            {goal.status?.charAt(0).toUpperCase() + goal.status?.slice(1)}
                        </Badge>
                    </div>
                    {goal.description && (
                        <p className="text-muted-foreground">{goal.description}</p>
                    )}
                </div>
                <div className="flex gap-2">
                    <Button variant="outline" size="icon" disabled>
                        <Edit className="h-4 w-4" />
                    </Button>
                    <Button variant="outline" size="icon" onClick={handleDelete} disabled={deleteGoal.isPending}>
                        <Trash2 className="h-4 w-4" />
                    </Button>
                </div>
            </div>

            <div className="grid lg:grid-cols-3 gap-6">
                {/* Main Content */}
                <div className="lg:col-span-2 space-y-6">
                    {/* Progress Card */}
                    <Card>
                        <CardHeader>
                            <CardTitle>Progress</CardTitle>
                            <CardDescription>
                                {totalTasks > 0
                                    ? `${completedTasks} of ${totalTasks} tasks completed`
                                    : 'Add tasks to track progress'
                                }
                            </CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="space-y-2">
                                <div className="flex items-center justify-between">
                                    <span className="text-sm font-medium">Overall Progress</span>
                                    <span className="text-2xl font-bold">{goal.progress || 0}%</span>
                                </div>
                                <Progress value={goal.progress || 0} className="h-3" />
                            </div>

                            {goal.target_value && (
                                <div className="flex items-center justify-between pt-4 border-t">
                                    <span className="text-sm text-muted-foreground">Current / Target</span>
                                    <span className="text-lg font-semibold">
                                        {goal.current_value || 0} / {goal.target_value}
                                    </span>
                                </div>
                            )}
                        </CardContent>
                    </Card>

                    {/* Tasks */}
                    <Card>
                        <CardHeader>
                            <div className="flex items-center justify-between">
                                <div>
                                    <CardTitle>Tasks</CardTitle>
                                    <CardDescription>Break down your goal into actionable tasks</CardDescription>
                                </div>
                                {!isAddingTask && (
                                    <Button size="sm" onClick={() => setIsAddingTask(true)}>
                                        <Plus className="h-4 w-4 mr-2" />
                                        Add Task
                                    </Button>
                                )}
                            </div>
                        </CardHeader>
                        <CardContent>
                            {/* Add Task Form */}
                            {isAddingTask && (
                                <form onSubmit={handleAddTask} className="mb-4 flex gap-2">
                                    <Input
                                        placeholder="Task title..."
                                        value={newTaskTitle}
                                        onChange={(e) => setNewTaskTitle(e.target.value)}
                                        autoFocus
                                    />
                                    <Button type="submit" size="sm" disabled={createTask.isPending}>
                                        Add
                                    </Button>
                                    <Button
                                        type="button"
                                        size="sm"
                                        variant="ghost"
                                        onClick={() => {
                                            setIsAddingTask(false)
                                            setNewTaskTitle('')
                                        }}
                                    >
                                        <X className="h-4 w-4" />
                                    </Button>
                                </form>
                            )}

                            {/* Tasks List */}
                            {tasksLoading ? (
                                <div className="space-y-2">
                                    {[1, 2, 3].map(i => (
                                        <Skeleton key={i} className="h-10 w-full" />
                                    ))}
                                </div>
                            ) : tasks && tasks.length > 0 ? (
                                <div className="space-y-2">
                                    {tasks.map((task) => (
                                        <div
                                            key={task.id}
                                            className="flex items-center gap-3 p-3 rounded-lg border hover:bg-accent/50 transition-colors group"
                                        >
                                            <Checkbox
                                                checked={task.completed || false}
                                                onCheckedChange={() => handleToggleTask(task.id, task.completed || false)}
                                            />
                                            <span className={`flex-1 ${task.completed ? 'line-through text-muted-foreground' : ''}`}>
                                                {task.title}
                                            </span>
                                            <Button
                                                variant="ghost"
                                                size="icon"
                                                className="h-8 w-8 opacity-0 group-hover:opacity-100 transition-opacity"
                                                onClick={() => handleDeleteTask(task.id)}
                                            >
                                                <Trash2 className="h-4 w-4" />
                                            </Button>
                                        </div>
                                    ))}
                                </div>
                            ) : (
                                <div className="text-center py-8 text-muted-foreground">
                                    <Target className="h-12 w-12 mx-auto mb-4 opacity-50" />
                                    <p className="text-sm">No tasks yet. Add your first task to get started!</p>
                                </div>
                            )}
                        </CardContent>
                    </Card>

                    {/* Progress Chart Placeholder */}
                    <Card>
                        <CardHeader>
                            <CardTitle>Progress Over Time</CardTitle>
                            <CardDescription>Your progress history</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <div className="h-64 flex items-center justify-center text-muted-foreground">
                                <div className="text-center">
                                    <TrendingUp className="h-12 w-12 mx-auto mb-4 opacity-50" />
                                    <p className="text-sm">Progress chart coming soon</p>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </div>

                {/* Sidebar */}
                <div className="space-y-6">
                    {/* Details Card */}
                    <Card>
                        <CardHeader>
                            <CardTitle>Details</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div>
                                <div className="text-sm text-muted-foreground mb-1">Category</div>
                                <Badge variant="secondary">{goal.category}</Badge>
                            </div>

                            {goal.start_date && (
                                <div>
                                    <div className="text-sm text-muted-foreground mb-1">Start Date</div>
                                    <div className="flex items-center gap-2">
                                        <Calendar className="h-4 w-4" />
                                        <span className="text-sm">{new Date(goal.start_date).toLocaleDateString()}</span>
                                    </div>
                                </div>
                            )}

                            {goal.target_date && (
                                <div>
                                    <div className="text-sm text-muted-foreground mb-1">Target Date</div>
                                    <div className="flex items-center gap-2">
                                        <Calendar className="h-4 w-4" />
                                        <span className="text-sm">{new Date(goal.target_date).toLocaleDateString()}</span>
                                    </div>
                                </div>
                            )}

                            <div>
                                <div className="text-sm text-muted-foreground mb-1">Created</div>
                                <div className="text-sm">{new Date(goal.created_at || '').toLocaleDateString()}</div>
                            </div>

                            {goal.updated_at && (
                                <div>
                                    <div className="text-sm text-muted-foreground mb-1">Last Updated</div>
                                    <div className="text-sm">{new Date(goal.updated_at).toLocaleDateString()}</div>
                                </div>
                            )}
                        </CardContent>
                    </Card>

                    {/* Task Summary */}
                    {totalTasks > 0 && (
                        <Card>
                            <CardHeader>
                                <CardTitle>Task Summary</CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-3">
                                <div className="flex items-center justify-between">
                                    <span className="text-sm text-muted-foreground">Total Tasks</span>
                                    <span className="font-semibold">{totalTasks}</span>
                                </div>
                                <div className="flex items-center justify-between">
                                    <span className="text-sm text-muted-foreground">Completed</span>
                                    <span className="font-semibold text-success">{completedTasks}</span>
                                </div>
                                <div className="flex items-center justify-between">
                                    <span className="text-sm text-muted-foreground">Remaining</span>
                                    <span className="font-semibold">{totalTasks - completedTasks}</span>
                                </div>
                            </CardContent>
                        </Card>
                    )}
                </div>
            </div>
        </div>
    )
}
