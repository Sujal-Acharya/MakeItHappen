import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs))
}

export function formatDate(date: string | Date): string {
    const d = typeof date === 'string' ? new Date(date) : date
    return d.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric'
    })
}

export function calculateProgress(current: number, target: number): number {
    if (target === 0) return 0
    return Math.min(Math.round((current / target) * 100), 100)
}

export function getDaysUntil(targetDate: string | Date): number {
    const target = typeof targetDate === 'string' ? new Date(targetDate) : targetDate
    const today = new Date()
    const diffTime = target.getTime() - today.getTime()
    return Math.ceil(diffTime / (1000 * 60 * 60 * 24))
}

export function getRandomQuote(): string {
    const quotes = [
        "The secret of getting ahead is getting started.",
        "Don't watch the clock; do what it does. Keep going.",
        "The future depends on what you do today.",
        "Success is the sum of small efforts repeated day in and day out.",
        "Your limitation—it's only your imagination.",
        "Great things never come from comfort zones.",
        "Dream it. Wish it. Do it.",
        "Success doesn't just find you. You have to go out and get it.",
        "The harder you work for something, the greater you'll feel when you achieve it.",
        "Dream bigger. Do bigger.",
    ]
    return quotes[Math.floor(Math.random() * quotes.length)]
}
