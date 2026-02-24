'use client'

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Skeleton } from '@/components/ui/skeleton'
import { useUser } from '@/lib/hooks/useUser'
import { useGoals } from '@/lib/hooks/useGoals'
import { BarChart3, TrendingUp, Target, PieChart } from 'lucide-react'
import { useMemo } from 'react'

export default function AnalyticsPage() {
    const { user } = useUser()
    const { data: goals, isLoading } = useGoals(user?.id)

    const analytics = useMemo(() => {
        if (!goals) return { byCategory: {}, byStatus: {}, avgProgress: 0 }

        const byCategory: Record<string, number> = {}
        const byStatus: Record<string, number> = {}
        let totalProgress = 0

        goals.forEach(goal => {
            byCategory[goal.category] = (byCategory[goal.category] || 0) + 1
            byStatus[goal.status || 'active'] = (byStatus[goal.status || 'active'] || 0) + 1
            totalProgress += goal.progress || 0
        })

        return {
            byCategory,
            byStatus,
            avgProgress: goals.length > 0 ? Math.round(totalProgress / goals.length) : 0
        }
    }, [goals])

    if (isLoading) {
        return (
            <div className="p-6 space-y-6">
                <Skeleton className="h-20 w-full" />
                <div className="grid md:grid-cols-2 gap-6">
                    {[1, 2, 3, 4].map(i => (
                        <Skeleton key={i} className="h-64" />
                    ))}
                </div>
            </div>
        )
    }

    return (
        <div className="p-6 space-y-6 animate-fade-in">
            {/* Header */}
            <div>
                <h1 className="text-3xl font-bold mb-2">Analytics</h1>
                <p className="text-muted-foreground">
                    Insights into your goal progress and performance
                </p>
            </div>

            {/* Overview Cards */}
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Total Goals</CardTitle>
                        <Target className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">{goals?.length || 0}</div>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Avg Progress</CardTitle>
                        <TrendingUp className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">{analytics.avgProgress}%</div>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Active</CardTitle>
                        <BarChart3 className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">{analytics.byStatus.active || 0}</div>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Completed</CardTitle>
                        <PieChart className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">{analytics.byStatus.completed || 0}</div>
                    </CardContent>
                </Card>
            </div>

            {/* Category Breakdown */}
            <div className="grid md:grid-cols-2 gap-6">
                <Card>
                    <CardHeader>
                        <CardTitle>Goals by Category</CardTitle>
                        <CardDescription>Distribution across categories</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-3">
                            {Object.entries(analytics.byCategory).map(([category, count]) => (
                                <div key={category} className="flex items-center justify-between">
                                    <span className="text-sm font-medium">{category}</span>
                                    <span className="text-sm text-muted-foreground">{count} goals</span>
                                </div>
                            ))}
                            {Object.keys(analytics.byCategory).length === 0 && (
                                <p className="text-sm text-muted-foreground text-center py-4">
                                    No goals yet
                                </p>
                            )}
                        </div>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader>
                        <CardTitle>Goals by Status</CardTitle>
                        <CardDescription>Current status breakdown</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-3">
                            {Object.entries(analytics.byStatus).map(([status, count]) => (
                                <div key={status} className="flex items-center justify-between">
                                    <span className="text-sm font-medium capitalize">{status}</span>
                                    <span className="text-sm text-muted-foreground">{count} goals</span>
                                </div>
                            ))}
                            {Object.keys(analytics.byStatus).length === 0 && (
                                <p className="text-sm text-muted-foreground text-center py-4">
                                    No goals yet
                                </p>
                            )}
                        </div>
                    </CardContent>
                </Card>
            </div>

            {/* Coming Soon */}
            <Card>
                <CardContent className="pt-6 text-center py-12">
                    <BarChart3 className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                    <h3 className="font-semibold mb-2">More Analytics Coming Soon</h3>
                    <p className="text-sm text-muted-foreground">
                        Advanced charts, trends, and insights will be available soon
                    </p>
                </CardContent>
            </Card>
        </div>
    )
}
