'use client'

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Progress } from '@/components/ui/progress'
import { Skeleton } from '@/components/ui/skeleton'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Badge } from '@/components/ui/badge'
import { useUser } from '@/lib/hooks/useUser'
import { useGoals } from '@/lib/hooks/useGoals'
import { Flame, Plus, Target, TrendingUp, Calendar, CheckCircle2 } from 'lucide-react'
import Link from 'next/link'
import { getRandomQuote } from '@/lib/utils'
import { useMemo } from 'react'

export default function DashboardPage() {
    const { user, profile, loading: userLoading } = useUser()
    const { data: goals, isLoading: goalsLoading } = useGoals(user?.id)

    const quote = useMemo(() => getRandomQuote(), [])

    // Calculate stats
    const stats = useMemo(() => {
        if (!goals) return { active: 0, completed: 0, completionRate: 0, streak: 0 }

        const active = goals.filter(g => g.status === 'active').length
        const completed = goals.filter(g => g.status === 'completed').length
        const total = goals.length
        const completionRate = total > 0 ? Math.round((completed / total) * 100) : 0

        // Mock streak for now - will be calculated from progress_logs later
        const streak = 7

        return { active, completed, completionRate, streak }
    }, [goals])

    const activeGoals = useMemo(() => {
        return goals?.filter(g => g.status === 'active').slice(0, 4) || []
    }, [goals])

    if (userLoading || goalsLoading) {
        return (
            <div className="p-6 space-y-6">
                <Skeleton className="h-32 w-full" />
                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {[1, 2, 3, 4].map(i => (
                        <Skeleton key={i} className="h-32" />
                    ))}
                </div>
            </div>
        )
    }

    return (
        <div className="p-6 space-y-6 animate-fade-in">
            {/* Welcome Header */}
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                <div>
                    <h1 className="text-3xl font-bold mb-2">
                        Welcome back, <span className="gradient-text">{profile?.name || 'there'}</span>! 👋
                    </h1>
                    <p className="text-muted-foreground">
                        Here&apos;s what&apos;s happening with your goals today
                    </p>
                </div>
                <Link href="/goals">
                    <Button size="lg" className="gap-2">
                        <Plus className="h-5 w-5" />
                        New Goal
                    </Button>
                </Link>
            </div>

            {/* Stats Cards */}
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
                <Card className="card-hover">
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Active Goals</CardTitle>
                        <Target className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">{stats.active}</div>
                        <p className="text-xs text-muted-foreground mt-1">
                            Keep pushing forward!
                        </p>
                    </CardContent>
                </Card>

                <Card className="card-hover">
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Completed</CardTitle>
                        <CheckCircle2 className="h-4 w-4 text-success" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">{stats.completed}</div>
                        <p className="text-xs text-muted-foreground mt-1">
                            Goals achieved
                        </p>
                    </CardContent>
                </Card>

                <Card className="card-hover">
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Success Rate</CardTitle>
                        <TrendingUp className="h-4 w-4 text-primary-600" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">{stats.completionRate}%</div>
                        <p className="text-xs text-muted-foreground mt-1">
                            Overall completion
                        </p>
                    </CardContent>
                </Card>

                <Card className="card-hover border-warning/50 bg-gradient-to-br from-warning/5 to-transparent">
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Current Streak</CardTitle>
                        <Flame className="h-4 w-4 text-warning" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold flex items-center gap-2">
                            {stats.streak} <Flame className="h-6 w-6 text-warning" />
                        </div>
                        <p className="text-xs text-muted-foreground mt-1">
                            Days in a row
                        </p>
                    </CardContent>
                </Card>
            </div>

            {/* Main Content Grid */}
            <div className="grid lg:grid-cols-3 gap-6">
                {/* Active Goals */}
                <div className="lg:col-span-2 space-y-6">
                    <div className="flex items-center justify-between">
                        <h2 className="text-2xl font-bold">Active Goals</h2>
                        <Link href="/goals">
                            <Button variant="ghost" size="sm">View All</Button>
                        </Link>
                    </div>

                    {activeGoals.length === 0 ? (
                        <Card>
                            <CardContent className="pt-6 text-center py-12">
                                <Target className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                                <h3 className="font-semibold mb-2">No active goals yet</h3>
                                <p className="text-sm text-muted-foreground mb-4">
                                    Create your first goal to get started on your journey
                                </p>
                                <Link href="/goals">
                                    <Button>
                                        <Plus className="h-4 w-4 mr-2" />
                                        Create Goal
                                    </Button>
                                </Link>
                            </CardContent>
                        </Card>
                    ) : (
                        <div className="grid md:grid-cols-2 gap-4">
                            {activeGoals.map((goal) => (
                                <Link key={goal.id} href={`/goals/${goal.id}`}>
                                    <Card className="card-hover cursor-pointer h-full">
                                        <CardHeader>
                                            <div className="flex items-start justify-between gap-2">
                                                <CardTitle className="text-base line-clamp-1">{goal.title}</CardTitle>
                                                <Badge variant="secondary" className="shrink-0">
                                                    {goal.category}
                                                </Badge>
                                            </div>
                                            {goal.description && (
                                                <CardDescription className="line-clamp-2">
                                                    {goal.description}
                                                </CardDescription>
                                            )}
                                        </CardHeader>
                                        <CardContent>
                                            <div className="space-y-2">
                                                <div className="flex items-center justify-between text-sm">
                                                    <span className="text-muted-foreground">Progress</span>
                                                    <span className="font-medium">{goal.progress || 0}%</span>
                                                </div>
                                                <Progress value={goal.progress || 0} />
                                                {goal.target_date && (
                                                    <div className="flex items-center gap-2 text-xs text-muted-foreground mt-2">
                                                        <Calendar className="h-3 w-3" />
                                                        Due {new Date(goal.target_date).toLocaleDateString()}
                                                    </div>
                                                )}
                                            </div>
                                        </CardContent>
                                    </Card>
                                </Link>
                            ))}
                        </div>
                    )}
                </div>

                {/* Sidebar */}
                <div className="space-y-6">
                    {/* Motivational Quote */}
                    <Card className="border-primary/20 bg-gradient-to-br from-primary-50 to-secondary-50 dark:from-primary-950/50 dark:to-secondary-950/50">
                        <CardHeader>
                            <CardTitle className="text-base">Daily Motivation</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <p className="text-sm italic text-foreground">&quot;{quote}&quot;</p>
                        </CardContent>
                    </Card>

                    {/* Weekly Focus */}
                    <Card>
                        <CardHeader>
                            <CardTitle className="text-base">This Week</CardTitle>
                            <CardDescription>Your focus areas</CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-3">
                            {activeGoals.slice(0, 3).map((goal) => (
                                <div key={goal.id} className="flex items-center gap-3">
                                    <div className="h-2 w-2 rounded-full bg-primary-600" />
                                    <span className="text-sm flex-1 line-clamp-1">{goal.title}</span>
                                </div>
                            ))}
                            {activeGoals.length === 0 && (
                                <p className="text-sm text-muted-foreground">
                                    No goals set for this week
                                </p>
                            )}
                        </CardContent>
                    </Card>

                    {/* Quick Actions */}
                    <Card>
                        <CardHeader>
                            <CardTitle className="text-base">Quick Actions</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-2">
                            <Link href="/goals">
                                <Button variant="outline" className="w-full justify-start" size="sm">
                                    <Plus className="h-4 w-4 mr-2" />
                                    Create New Goal
                                </Button>
                            </Link>
                            <Link href="/analytics">
                                <Button variant="outline" className="w-full justify-start" size="sm">
                                    <TrendingUp className="h-4 w-4 mr-2" />
                                    View Analytics
                                </Button>
                            </Link>
                            <Link href="/community">
                                <Button variant="outline" className="w-full justify-start" size="sm">
                                    <Target className="h-4 w-4 mr-2" />
                                    Join Community
                                </Button>
                            </Link>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
    )
}
