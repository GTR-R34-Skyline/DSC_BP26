'use client'

import { useEffect } from 'react'
import { AlertCircle, RefreshCcw } from 'lucide-react'

export default function AdminError({
    error,
    reset,
}: {
    error: Error & { digest?: string }
    reset: () => void
}) {
    useEffect(() => {
        // Log the error to an error reporting service
        console.error(error)
    }, [error])

    return (
        <div className="flex flex-col items-center justify-center min-h-[50vh] space-y-6 text-center px-4">
            <div className="w-16 h-16 bg-red-500/10 text-red-500 rounded-2xl flex items-center justify-center">
                <AlertCircle className="w-8 h-8" />
            </div>

            <div>
                <h2 className="text-2xl font-bold text-white mb-2">Something went wrong!</h2>
                <p className="text-zinc-400 max-w-md mx-auto">
                    We encountered an error loading this data. Please try again or contact support if the problem persists.
                </p>
            </div>

            <button
                onClick={() => reset()}
                className="flex items-center gap-2 bg-white text-zinc-950 px-6 py-3 rounded-xl font-bold hover:bg-zinc-200 transition-colors"
            >
                <RefreshCcw className="w-4 h-4" />
                Try Again
            </button>
        </div>
    )
}
