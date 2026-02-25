import { createClient } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'
import JudgingInterface from './JudgingInterface'

interface PageProps {
    params: { id: string }
}

export default async function JudgingDetail({ params }: PageProps) {
    const supabase = await createClient()

    const { data: { user } } = await supabase.auth.getUser()
    const userEmail = user?.email || ''

    const { id } = await params

    // Fetch the submission details
    const { data: team, error } = await supabase
        .from('submissions')
        .select('*')
        .eq('id', id)
        .single()

    if (error || !team) {
        redirect('/admin/judging')
    }

    // Check if already judged by this user
    const { data: existingScore } = await supabase
        .from('judging_scores')
        .select('total_score')
        .eq('submission_id', id)
        .eq('judge_email', userEmail)
        .single()

    return (
        <div className="h-[calc(100vh-8rem)]">
            <div className="mb-6 flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-400 to-emerald-400 bg-clip-text text-transparent">
                        Evaluating: {team.team_name}
                    </h1>
                    <p className="text-zinc-400 mt-1">{team.problem_statement}</p>
                </div>
                {existingScore ? (
                    <div className="bg-emerald-500/10 text-emerald-400 px-4 py-2 rounded-xl border border-emerald-500/20 font-bold">
                        Already Judged - Score: {existingScore.total_score}/100
                    </div>
                ) : null}
            </div>

            <JudgingInterface
                team={team}
                userEmail={userEmail}
                alreadyJudged={!!existingScore}
            />
        </div>
    )
}
