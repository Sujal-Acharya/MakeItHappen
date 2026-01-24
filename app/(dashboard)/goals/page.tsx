'use client'

import { useState, useMemo } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Progress } from '@/components/ui/progress'
import { Skeleton } from '@/components/ui/skeleton'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Plus, Search, Calendar, Target } from 'lucide-react'
import Link from 'next/link'
import { useUser } from '@/lib/hooks/useUser'
import { useGoals } from '@/lib/hooks/useGoals'
import { CreateGoalModal } from '@/components/goals/CreateGoalModal'

export default function GoalsPage() {
    const { user } = useUser()
    const { data: goals, isLoading } = useGoals(user?.id)
    const [searchQuery, setSearchQuery] = useState('')
    const [statusFilter, setStatusFilter] = useState('all')
    const [isCreateModalOpen, setIsCreateModalOpen] = useState(false)

    const filteredGoals = useMemo(() => {
        if (!goals) return []

        return goals.filter(goal => {
            const matchesSearch = goal.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                goal.description?.toLowerCase().includes(searchQuery.toLowerCase())

            const matchesStatus = statusFilter === 'all' || goal.status === statusFilter

            return matchesSearch && matchesStatus
        })
    }, [goals, searchQuery, statusFilter])

    const goalCounts = useMemo(() => {
        if (!goals) return { all: 0, active: 0, completed: 0, paused: 0 }

        return {
            all: goals.length,
            active: goals.filter(g => g.status === 'active').length,
            completed: goals.filter(g => g.status === 'completed').length,
            paused: goals.filter(g => g.status === 'paused').length,
        }
    }, [goals])

    if (isLoading) {
        return (
            <div className="p-6 space-y-6">
                <Skeleton className="h-20 w-full" />
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {[1, 2, 3, 4, 5, 6].map(i => (
                        <Skeleton key={i} className="h-48" />
                    ))}
                </div>
            </div>
        )
    }

    return (
        <div className="p-6 space-y-6 animate-fade-in">
            {/* Header */}
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                <div>
                    <h1 className="text-3xl font-bold mb-2">My Goals</h1>
                    <p className="text-muted-foreground">
                        Track and manage all your goals in one place
                    </p>
                </div>
                <Button size="lg" onClick={() => setIsCreateModalOpen(true)} className="gap-2">
                    <Plus className="h-5 w-5" />
                    New Goal
                </Button>
            </div>

            {/* Search and Filters */}
            <div className="flex flex-col sm:flex-row gap-4">
                <div className="relative flex-1">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input
                        placeholder="Search goals..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="pl-10"
                    />
                </div>
            </div>

            {/* Tabs for filtering */}
            <Tabs value={statusFilter} onValueChange={setStatusFilter}>
                <TabsList>
                    <TabsTrigger value="all">
                        All ({goalCounts.all})
                    </TabsTrigger>
                    <TabsTrigger value="active">
                        Active ({goalCounts.active})
                    </TabsTrigger>
                    <TabsTrigger value="completed">
                        Completed ({goalCounts.completed})
                    </TabsTrigger>
                    <TabsTrigger value="paused">
                        Paused ({goalCounts.paused})
                    </TabsTrigger>
                </TabsList>

                <TabsContent value={statusFilter} className="mt-6">
                    {filteredGoals.length === 0 ? (
                        <Card>
                            <CardContent className="pt-6 text-center py-12">
                                <Target className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                                <h3 className="font-semibold mb-2">
                                    {searchQuery ? 'No goals found' : 'No goals yet'}
                                </h3>
                                <p className="text-sm text-muted-foreground mb-4">
                                    {searchQuery
                                        ? 'Try adjusting your search or filters'
                                        : 'Create your first goal to get started'
                                    }
                                </p>
                                {!searchQuery && (
                                    <Button onClick={() => setIsCreateModalOpen(true)}>
                                        <Plus className="h-4 w-4 mr-2" />
                                        Create Goal
                                    </Button>
                                )}
                            </CardContent>
                        </Card>
                    ) : (
                        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {filteredGoals.map((goal) => (
                                <Link key={goal.id} href={`/goals/${goal.id}`}>
                                    <Card className="card-hover cursor-pointer h-full">
                                        <CardHeader>
                                            <div className="flex items-start justify-between gap-2 mb-2">
                                                <CardTitle className="text-lg line-clamp-2">{goal.title}</CardTitle>
                                                <Badge
                                                    variant={
                                                        goal.status === 'completed' ? 'success' :
                                                            goal.status === 'paused' ? 'warning' :
                                                                'secondary'
                                                    }
                                                    className="shrink-0"
                                                >
                                                    {goal.category}
                                                </Badge>
                                            </div>
                                            {goal.description && (
                                                <CardDescription className="line-clamp-2">
                                                    {goal.description}
                                                </CardDescription>
                                            )}
                                        </CardHeader>
                                        <CardContent className="space-y-4">
                                            <div className="space-y-2">
                                                <div className="flex items-center justify-between text-sm">
                                                    <span className="text-muted-foreground">Progress</span>
                                                    <span className="font-medium">{goal.progress || 0}%</span>
                                                </div>
                                                <Progress value={goal.progress || 0} />
                                            </div>

                                            <div className="flex items-center justify-between text-sm">
                                                {goal.target_date && (
                                                    <div className="flex items-center gap-2 text-muted-foreground">
                                                        <Calendar className="h-4 w-4" />
                                                        <span>Due {new Date(goal.target_date).toLocaleDateString()}</span>
                                                    </div>
                                                )}
                                                {goal.target_value && (
                                                    <div className="text-muted-foreground">
                                                        {goal.current_value || 0} / {goal.target_value}
                                                    </div>
                                                )}
                                            </div>

                                            <Badge
                                                variant={
                                                    goal.status === 'completed' ? 'success' :
                                                        goal.status === 'paused' ? 'warning' :
                                                            'default'
                                                }
                                            >
                                                {goal.status?.charAt(0).toUpperCase() + goal.status?.slice(1)}
                                            </Badge>
                                        </CardContent>
                                    </Card>
                                </Link>
                            ))}
                        </div>
                    )}
                </TabsContent>
            </Tabs>

            {/* Create Goal Modal */}
            <CreateGoalModal
                open={isCreateModalOpen}
                onOpenChange={setIsCreateModalOpen}
                userId={user?.id}
            />
        </div>
    )
}
