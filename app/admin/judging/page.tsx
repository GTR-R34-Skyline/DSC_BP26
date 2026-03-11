import { createClient } from '@/lib/supabase/server'
import JudgingFilter from './JudgingFilter'

export default async function JudgingPage() {
    const supabase = await createClient()

    // Get current user
    const { data: { user } } = await supabase.auth.getUser()
    const userEmail = user?.email || ''

    // Fetch all submissions
    const { data: submissions, error: submissionsError } = await supabase
        .from('submissions')
        .select('id, team_name, problem_statement, ppt_link')
        .order('created_at', { ascending: false })

    // Fetch scores by ANY judge
    const { data: allScores, error: scoresError } = await supabase
        .from('judging_scores')
        .select('submission_id, total_score, judge_email')

    // Extract unique problem statements for the filter
    const problemStatements = Array.from(
        new Set(submissions?.map(s => s.problem_statement).filter(Boolean))
    ).sort() as string[]

    return (
        <div className="space-y-8">
            <div>
                <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-400 to-emerald-400 bg-clip-text text-transparent">
                    Judging Dashboard
                </h1>
                <p className="text-zinc-400 mt-1">Review and evaluate team submissions across all problem statements.</p>
            </div>

            <JudgingFilter 
                submissions={submissions || []} 
                allScores={allScores || []} 
                problemStatements={problemStatements}
            />
        </div>
    )
}
