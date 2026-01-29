'use client'

import { useState } from 'react'
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Plus } from 'lucide-react'
import { useCreateGoal } from '@/lib/hooks/useGoals'
import { useUser } from '@/lib/hooks/useUser'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'

export function CreateGoalDialog() {
    const [open, setOpen] = useState(false)
    const [title, setTitle] = useState('')
    const [description, setDescription] = useState('')
    const [category, setCategory] = useState<string>('personal')
    const [targetValue, setTargetValue] = useState('')
    const [targetDate, setTargetDate] = useState('')

    const { user } = useUser()
    const createGoal = useCreateGoal()

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        if (!user) return

        try {
            await createGoal.mutateAsync({
                user_id: user.id,
                title,
                description: description || null,
                category,
                target_value: targetValue ? Number(targetValue) : null,
                current_value: 0,
                progress: 0,
                status: 'active',
                start_date: new Date().toISOString(),
                target_date: targetDate ? new Date(targetDate).toISOString() : null,
            })

            setOpen(false)
            resetForm()
        } catch (error) {
            console.error('Failed to create goal', error)
        }
    }

    const resetForm = () => {
        setTitle('')
        setDescription('')
        setCategory('personal')
        setTargetValue('')
        setTargetDate('')
    }

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <Button className="gap-2">
                    <Plus className="h-4 w-4" />
                    New Goal
                </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>Create New Goal</DialogTitle>
                    <DialogDescription>
                        Set a new target for yourself. Make it specific and measurable.
                    </DialogDescription>
                </DialogHeader>
                <form onSubmit={handleSubmit} className="grid gap-4 py-4">
                    <div className="grid gap-2">
                        <Label htmlFor="title">Goal Title</Label>
                        <Input
                            id="title"
                            placeholder="e.g., Read 12 Books"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            required
                        />
                    </div>

                    <div className="grid gap-2">
                        <Label htmlFor="category">Category</Label>
                        <Select value={category} onValueChange={setCategory}>
                            <SelectTrigger>
                                <SelectValue placeholder="Select category" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="personal">Personal Growth</SelectItem>
                                <SelectItem value="career">Career & Business</SelectItem>
                                <SelectItem value="health">Health & Fitness</SelectItem>
                                <SelectItem value="financial">Financial</SelectItem>
                                <SelectItem value="education">Education</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>

                    <div className="grid gap-2">
                        <Label htmlFor="description">Description (Optional)</Label>
                        <Textarea
                            id="description"
                            placeholder="Why is this goal important?"
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                        />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div className="grid gap-2">
                            <Label htmlFor="target">Target Value</Label>
                            <Input
                                id="target"
                                type="number"
                                placeholder="e.g., 12"
                                value={targetValue}
                                onChange={(e) => setTargetValue(e.target.value)}
                            />
                        </div>
                        <div className="grid gap-2">
                            <Label htmlFor="date">Target Date</Label>
                            <Input
                                id="date"
                                type="date"
                                value={targetDate}
                                onChange={(e) => setTargetDate(e.target.value)}
                            />
                        </div>
                    </div>

                    <DialogFooter>
                        <Button type="submit" disabled={createGoal.isPending}>
                            {createGoal.isPending ? 'Creating...' : 'Create Goal'}
                        </Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    )
}
