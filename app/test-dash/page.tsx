'use client'

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Progress } from '@/components/ui/progress'
import { Skeleton } from '@/components/ui/skeleton'
import { Badge } from '@/components/ui/badge'
import { useUser } from '@/lib/hooks/useUser'
import { useGoals } from '@/lib/hooks/useGoals'
import { CheckCircle2, Plus, Target, TrendingUp, Calendar } from 'lucide-react'
import Link from 'next/link'
import { getRandomQuote } from '@/lib/utils'
import { useMemo } from 'react'

export default function TestDashboardPage() {
    const { user, profile, loading: userLoading } = useUser()
    const { data: goals, isLoading: goalsLoading } = useGoals(user?.id)

    const quote = useMemo(() => getRandomQuote(), [])

    const stats = useMemo(() => {
        if (!goals) return { active: 0, completed: 0, completionRate: 0, total: 0 }
        const active = goals.filter(g => g.status === 'active').length
        const completed = goals.filter(g => g.status === 'completed').length
        const total = goals.length
        const completionRate = total > 0 ? Math.round((completed / total) * 100) : 0
        return { active, completed, completionRate, total }
    }, [goals])

    const activeGoals = useMemo(() => {
        return goals?.filter(g => g.status === 'active').slice(0, 4) || []
    }, [goals])

    if (userLoading || goalsLoading) {
        return <div className="p-6">Loading Test Dashboard...</div>
    }

    return (
        <div className="p-6 space-y-6">
            <h1 className="text-3xl font-bold">TEST DASHBOARD [SYNC_OK] ✨</h1>
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
                <Card>
                    <CardHeader className="pb-2">
                        <CardTitle className="text-sm font-medium">Goals Completed</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">{stats.completed}</div>
                    </CardContent>
                </Card>
            </div>

            <Card className="dark:bg-slate-900 border-primary/20">
                <CardHeader><CardTitle>Daily Motivation</CardTitle></CardHeader>
                <CardContent><p className="italic dark:text-white">&quot;{quote}&quot;</p></CardContent>
            </Card>
        </div>
    )
}
