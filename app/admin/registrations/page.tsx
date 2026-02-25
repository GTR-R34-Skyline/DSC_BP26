import { createClient } from '@/lib/supabase/server'
import RegistrationsTable from './RegistrationsTable'

export default async function RegistrationsPage() {
    const supabase = await createClient()

    // Fetch all submissions
    const { data: submissions, error } = await supabase
        .from('submissions')
        .select('*')
        .order('created_at', { ascending: false })

    if (error) {
        console.error('Error fetching submissions:', error)
    }

    // Get unique problem statements for the filter dropdown
    const problemStatements = Array.from(
        new Set((submissions || []).map((s) => s.problem_statement).filter(Boolean))
    )

    return (
        <div className="space-y-6">
            <div>
                <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-400 to-emerald-400 bg-clip-text text-transparent">
                    Registrations
                </h1>
                <p className="text-zinc-400 mt-1">
                    Manage all team submissions. You can search, filter, and export the data to CSV.
                </p>
            </div>

            <RegistrationsTable
                submissions={submissions || []}
                problemStatements={problemStatements}
            />
        </div>
    )
}
