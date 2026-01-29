'use client'

import { useGoals } from '@/lib/hooks/useGoals'
import { useUser } from '@/lib/hooks/useUser'
import { CreateGoalDialog } from '@/components/goals/create-goal-dialog'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Progress } from '@/components/ui/progress'
import { Calendar, Target, ArrowRight, TrendingUp } from 'lucide-react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Skeleton } from '@/components/ui/skeleton'

export default function GoalsPage() {
    const { user } = useUser()
    const { data: goals, isLoading } = useGoals(user?.id)

    const getStatusVariant = (status: string) => {
        switch (status) {
            case 'completed':
                return 'success'
            case 'paused':
                return 'warning'
            default:
                return 'default'
        }
    }

    if (isLoading) {
        return (
            <div className="p-6 space-y-6">
                <div className="flex justify-between items-center">
                    <div>
                        <Skeleton className="h-8 w-48 mb-2" />
                        <Skeleton className="h-4 w-64" />
                    </div>
                    <Skeleton className="h-10 w-32" />
                </div>
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {[1, 2, 3].map((i) => (
                        <Skeleton key={i} className="h-64 rounded-xl" />
                    ))}
                </div>
            </div>
        )
    }

    return (
        <div className="p-6 space-y-6 animate-fade-in">
            {/* Header */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h1 className="text-3xl font-bold mb-2">My Goals</h1>
                    <p className="text-muted-foreground">
                        Track, manage, and achieve your ambitions
                    </p>
                </div>
                <CreateGoalDialog />
            </div>

            {/* Goals Grid */}
            {!goals || goals.length === 0 ? (
                <Card className="border-dashed">
                    <CardContent className="py-20 text-center">
                        <div className="h-20 w-20 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-6">
                            <Target className="h-10 w-10 text-primary-600" />
                        </div>
                        <h3 className="text-xl font-semibold mb-2">No goals yet</h3>
                        <p className="text-muted-foreground max-w-sm mx-auto mb-8">
                            Start your journey by creating your first goal. Break it down into tasks and track your progress.
                        </p>
                        <CreateGoalDialog />
                    </CardContent>
                </Card>
            ) : (
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {goals.map((goal) => (
                        <Link key={goal.id} href={`/goals/${goal.id}`}>
                            <Card className="h-full hover:shadow-lg transition-all duration-300 group border-t-4 hover:border-t-primary cursor-pointer">
                                <CardHeader className="pb-4">
                                    <div className="flex justify-between items-start mb-2">
                                        <Badge variant="outline" className="capitalize">
                                            {goal.category}
                                        </Badge>
                                        <Badge variant={getStatusVariant(goal.status || 'active') as any}>
                                            {goal.status ? goal.status.charAt(0).toUpperCase() + goal.status.slice(1) : 'Active'}
                                        </Badge>
                                    </div>
                                    <CardTitle className="text-xl group-hover:text-primary transition-colors">
                                        {goal.title}
                                    </CardTitle>
                                    {goal.description && (
                                        <CardDescription className="line-clamp-2">
                                            {goal.description}
                                        </CardDescription>
                                    )}
                                </CardHeader>
                                <CardContent>
                                    <div className="space-y-4">
                                        <div className="space-y-2">
                                            <div className="flex justify-between text-sm">
                                                <span className="text-muted-foreground">Progress</span>
                                                <span className="font-medium">{goal.progress}%</span>
                                            </div>
                                            <Progress value={goal.progress} className="h-2" />
                                        </div>

                                        <div className="flex items-center justify-between pt-4 text-sm text-muted-foreground">
                                            <div className="flex items-center gap-1">
                                                <Calendar className="h-4 w-4" />
                                                <span>
                                                    {goal.target_date
                                                        ? new Date(goal.target_date).toLocaleDateString()
                                                        : 'No deadline'}
                                                </span>
                                            </div>
                                            <div className="flex items-center gap-1 text-primary opacity-0 group-hover:opacity-100 transition-opacity">
                                                <span>View Details</span>
                                                <ArrowRight className="h-4 w-4" />
                                            </div>
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>
                        </Link>
                    ))}
                </div>
            )}
        </div>
    )
}

