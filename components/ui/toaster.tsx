'use client'

import { Toaster as HotToaster } from 'react-hot-toast'

export function Toaster() {
    return (
        <HotToaster
            position="top-right"
            toastOptions={{
                duration: 3000,
                style: {
                    background: 'hsl(var(--background))',
                    color: 'hsl(var(--foreground))',
                    border: '1px solid hsl(var(--border))',
                    borderRadius: '0.75rem',
                    padding: '16px',
                },
                success: {
                    iconTheme: {
                        primary: '#22c55e',
                        secondary: '#ffffff',
                    },
                },
                error: {
                    iconTheme: {
                        primary: '#ef4444',
                        secondary: '#ffffff',
                    },
                },
            }}
        />
    )
}
