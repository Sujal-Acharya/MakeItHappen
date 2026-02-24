'use client'

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Users } from 'lucide-react'

export default function CommunityPage() {
    return (
        <div className="p-6 space-y-6 animate-fade-in">
            <div>
                <h1 className="text-3xl font-bold mb-2">Community</h1>
                <p className="text-muted-foreground">
                    Connect with friends and join groups
                </p>
            </div>

            <Card>
                <CardContent className="pt-6 text-center py-12">
                    <Users className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                    <h3 className="font-semibold mb-2">Community Features Coming Soon</h3>
                    <p className="text-sm text-muted-foreground">
                        Friends, groups, and social features will be available soon
                    </p>
                </CardContent>
            </Card>
        </div>
    )
}
