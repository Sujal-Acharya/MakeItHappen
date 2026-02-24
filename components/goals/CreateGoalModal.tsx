'use client'

import { useState } from 'react'
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { useCreateGoal } from '@/lib/hooks/useGoals'
import { Loader2 } from 'lucide-react'

interface CreateGoalModalProps {
    open: boolean
    onOpenChange: (open: boolean) => void
    userId?: string
}

const categories = [
    'Health & Fitness',
    'Career',
    'Education',
    'Finance',
    'Personal Development',
    'Relationships',
    'Hobbies',
    'Other'
]

export function CreateGoalModal({ open, onOpenChange, userId }: CreateGoalModalProps) {
    const [title, setTitle] = useState('')
    const [description, setDescription] = useState('')
    const [category, setCategory] = useState(categories[0])
    const [targetValue, setTargetValue] = useState('')
    const [targetDate, setTargetDate] = useState('')

    const createGoal = useCreateGoal()

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()

        if (!userId) return

        await createGoal.mutateAsync({
            user_id: userId,
            title,
            description: description || null,
            category,
            target_value: targetValue ? parseInt(targetValue) : null,
            target_date: targetDate || null,
            status: 'active',
            progress: 0,
            current_value: 0,
        })

        // Reset form
        setTitle('')
        setDescription('')
        setCategory(categories[0])
        setTargetValue('')
        setTargetDate('')
        onOpenChange(false)
    }

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="sm:max-w-[500px]">
                <form onSubmit={handleSubmit}>
                    <DialogHeader>
                        <DialogTitle>Create New Goal</DialogTitle>
                        <DialogDescription>
                            Set a new goal and start tracking your progress
                        </DialogDescription>
                    </DialogHeader>

                    <div className="space-y-4 py-4">
                        <div className="space-y-2">
                            <Label htmlFor="title">Goal Title *</Label>
                            <Input
                                id="title"
                                placeholder="e.g., Run a marathon"
                                value={title}
                                onChange={(e) => setTitle(e.target.value)}
                                required
                            />
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="description">Description</Label>
                            <Textarea
                                id="description"
                                placeholder="Describe your goal..."
                                value={description}
                                onChange={(e) => setDescription(e.target.value)}
                                rows={3}
                            />
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="category">Category *</Label>
                            <select
                                id="category"
                                value={category}
                                onChange={(e) => setCategory(e.target.value)}
                                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                                required
                            >
                                {categories.map(cat => (
                                    <option key={cat} value={cat}>{cat}</option>
                                ))}
                            </select>
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <Label htmlFor="targetValue">Target Value</Label>
                                <Input
                                    id="targetValue"
                                    type="number"
                                    placeholder="e.g., 100"
                                    value={targetValue}
                                    onChange={(e) => setTargetValue(e.target.value)}
                                />
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="targetDate">Target Date</Label>
                                <Input
                                    id="targetDate"
                                    type="date"
                                    value={targetDate}
                                    onChange={(e) => setTargetDate(e.target.value)}
                                />
                            </div>
                        </div>
                    </div>

                    <DialogFooter>
                        <Button
                            type="button"
                            variant="outline"
                            onClick={() => onOpenChange(false)}
                            disabled={createGoal.isPending}
                        >
                            Cancel
                        </Button>
                        <Button type="submit" disabled={createGoal.isPending}>
                            {createGoal.isPending && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                            Create Goal
                        </Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    )
}
