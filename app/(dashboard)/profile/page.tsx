'use client'

import { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Skeleton } from '@/components/ui/skeleton'
import { Badge } from '@/components/ui/badge'
import { useUser } from '@/lib/hooks/useUser'
import { useGoals } from '@/lib/hooks/useGoals'
import { createClient } from '@/lib/supabase/client'
import { Target, Trophy, Flame, Calendar, TrendingUp, CheckCircle2 } from 'lucide-react'
import toast from 'react-hot-toast'
import { useMemo } from 'react'

export default function ProfilePage() {
    const { user, profile, loading } = useUser()
    const { data: goals } = useGoals(user?.id)
    const [name, setName] = useState(profile?.name || '')
    const [isUpdating, setIsUpdating] = useState(false)
    const supabase = createClient()

    const stats = useMemo(() => {
        if (!goals) return { total: 0, completed: 0, active: 0, streak: 7, daysActive: 30 }

        return {
            total: goals.length,
            completed: goals.filter(g => g.status === 'completed').length,
            active: goals.filter(g => g.status === 'active').length,
            streak: 7, // Mock - will be calculated from progress_logs
            daysActive: 30, // Mock - will be calculated from progress_logs
        }
    }, [goals])

    const handleUpdateProfile = async (e: React.FormEvent) => {
        e.preventDefault()
        setIsUpdating(true)

        try {
            const { error } = await supabase
                .from('profiles')
                .update({ name, updated_at: new Date().toISOString() })
                .eq('id', user?.id)

            if (error) throw error

            toast.success('Profile updated successfully!')
        } catch (error: any) {
            toast.error(error.message || 'Failed to update profile')
        } finally {
            setIsUpdating(false)
        }
    }

    if (loading) {
        return (
            <div className="p-6 space-y-6">
                <Skeleton className="h-32 w-full" />
                <div className="grid md:grid-cols-2 gap-6">
                    <Skeleton className="h-64" />
                    <Skeleton className="h-64" />
                </div>
            </div>
        )
    }

    const getInitials = (name: string) => {
        return name
            .split(' ')
            .map(n => n[0])
            .join('')
            .toUpperCase()
            .slice(0, 2)
    }

    return (
        <div className="p-6 space-y-6 animate-fade-in">
            {/* Header */}
            <div>
                <h1 className="text-3xl font-bold mb-2">Profile Settings</h1>
                <p className="text-muted-foreground">
                    Manage your account settings and view your statistics
                </p>
            </div>

            <div className="grid lg:grid-cols-3 gap-6">
                {/* Profile Info */}
                <div className="lg:col-span-2 space-y-6">
                    <Card>
                        <CardHeader>
                            <CardTitle>Profile Information</CardTitle>
                            <CardDescription>Update your personal information</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <form onSubmit={handleUpdateProfile} className="space-y-6">
                                <div className="flex items-center gap-6">
                                    <Avatar className="h-20 w-20">
                                        <AvatarImage src={profile?.avatar_url || undefined} />
                                        <AvatarFallback className="text-2xl">
                                            {profile?.name ? getInitials(profile.name) : 'U'}
                                        </AvatarFallback>
                                    </Avatar>
                                    <div>
                                        <Button type="button" variant="outline" size="sm" disabled>
                                            Change Avatar
                                        </Button>
                                        <p className="text-xs text-muted-foreground mt-2">
                                            Avatar upload coming soon
                                        </p>
                                    </div>
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="name">Full Name</Label>
                                    <Input
                                        id="name"
                                        value={name}
                                        onChange={(e) => setName(e.target.value)}
                                        placeholder="Your name"
                                    />
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="email">Email</Label>
                                    <Input
                                        id="email"
                                        type="email"
                                        value={user?.email || ''}
                                        disabled
                                        className="bg-muted"
                                    />
                                    <p className="text-xs text-muted-foreground">
                                        Email cannot be changed
                                    </p>
                                </div>

                                <Button type="submit" disabled={isUpdating}>
                                    {isUpdating ? 'Updating...' : 'Save Changes'}
                                </Button>
                            </form>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader>
                            <CardTitle>Account Actions</CardTitle>
                            <CardDescription>Manage your account</CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <Button variant="outline" className="w-full justify-start" disabled>
                                Change Password
                            </Button>
                            <Button variant="outline" className="w-full justify-start text-danger" disabled>
                                Delete Account
                            </Button>
                            <p className="text-xs text-muted-foreground">
                                Additional account features coming soon
                            </p>
                        </CardContent>
                    </Card>
                </div>

                {/* Statistics */}
                <div className="space-y-6">
                    <Card>
                        <CardHeader>
                            <CardTitle>Your Statistics</CardTitle>
                            <CardDescription>Your progress at a glance</CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="flex items-center justify-between">
                                <div className="flex items-center gap-3">
                                    <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center">
                                        <Target className="h-5 w-5 text-primary-600" />
                                    </div>
                                    <div>
                                        <div className="text-2xl font-bold">{stats.total}</div>
                                        <div className="text-xs text-muted-foreground">Total Goals</div>
                                    </div>
                                </div>
                            </div>

                            <div className="flex items-center justify-between">
                                <div className="flex items-center gap-3">
                                    <div className="h-10 w-10 rounded-lg bg-success/10 flex items-center justify-center">
                                        <CheckCircle2 className="h-5 w-5 text-success" />
                                    </div>
                                    <div>
                                        <div className="text-2xl font-bold">{stats.completed}</div>
                                        <div className="text-xs text-muted-foreground">Completed</div>
                                    </div>
                                </div>
                            </div>

                            <div className="flex items-center justify-between">
                                <div className="flex items-center gap-3">
                                    <div className="h-10 w-10 rounded-lg bg-warning/10 flex items-center justify-center">
                                        <Flame className="h-5 w-5 text-warning" />
                                    </div>
                                    <div>
                                        <div className="text-2xl font-bold">{stats.streak}</div>
                                        <div className="text-xs text-muted-foreground">Day Streak</div>
                                    </div>
                                </div>
                            </div>

                            <div className="flex items-center justify-between">
                                <div className="flex items-center gap-3">
                                    <div className="h-10 w-10 rounded-lg bg-secondary/10 flex items-center justify-center">
                                        <Calendar className="h-5 w-5 text-secondary-600" />
                                    </div>
                                    <div>
                                        <div className="text-2xl font-bold">{stats.daysActive}</div>
                                        <div className="text-xs text-muted-foreground">Days Active</div>
                                    </div>
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader>
                            <CardTitle>Achievements</CardTitle>
                            <CardDescription>Your milestones</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <div className="grid grid-cols-3 gap-3">
                                {stats.completed > 0 && (
                                    <div className="text-center">
                                        <div className="h-12 w-12 rounded-full bg-success/10 flex items-center justify-center mx-auto mb-2">
                                            <Trophy className="h-6 w-6 text-success" />
                                        </div>
                                        <div className="text-xs font-medium">First Goal</div>
                                    </div>
                                )}
                                {stats.streak >= 7 && (
                                    <div className="text-center">
                                        <div className="h-12 w-12 rounded-full bg-warning/10 flex items-center justify-center mx-auto mb-2">
                                            <Flame className="h-6 w-6 text-warning" />
                                        </div>
                                        <div className="text-xs font-medium">Week Streak</div>
                                    </div>
                                )}
                                {stats.total >= 5 && (
                                    <div className="text-center">
                                        <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-2">
                                            <Target className="h-6 w-6 text-primary-600" />
                                        </div>
                                        <div className="text-xs font-medium">Goal Setter</div>
                                    </div>
                                )}
                            </div>
                            {stats.total === 0 && (
                                <p className="text-sm text-muted-foreground text-center py-4">
                                    Complete goals to earn achievements
                                </p>
                            )}
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
    )
}
