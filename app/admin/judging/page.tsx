import { createClient } from '@/lib/supabase/server'
import Link from 'next/link'
import { CheckCircle, Clock } from 'lucide-react'

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

    const judgedSubmissionIds = new Set(allScores?.map(s => s.submission_id))

    const scoreMap = new Map()
    allScores?.forEach(s => scoreMap.set(s.submission_id, s.total_score))

    return (
        <div className="space-y-6">
            <div>
                <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-400 to-emerald-400 bg-clip-text text-transparent">
                    Judging
                </h1>
                <p className="text-zinc-400 mt-1">Select a team below to evaluate their submission.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {submissions?.map((team) => {
                    const isJudged = judgedSubmissionIds.has(team.id)

                    return (
                        <Link
                            key={team.id}
                            href={`/admin/judging/${team.id}`}
                            className="group block bg-zinc-900 border border-zinc-800 rounded-2xl hover:border-zinc-700 transition-all hover:shadow-xl hover:-translate-y-1 relative overflow-hidden"
                        >
                            <div className="p-6">
                                <div className="flex justify-between items-start mb-4">
                                    <h3 className="text-xl font-bold text-white group-hover:text-emerald-400 transition-colors">
                                        {team.team_name}
                                    </h3>
                                    {isJudged ? (
                                        <div className="flex flex-col items-end gap-1">
                                            <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-emerald-500/10 text-emerald-400 text-xs border border-emerald-500/20 font-medium">
                                                <CheckCircle className="w-3.5 h-3.5" />
                                                Judged (Score: {scoreMap.get(team.id)})
                                            </div>
                                            <span className="text-[10px] text-zinc-500 font-medium truncate max-w-[120px]">
                                                {allScores?.find(s => s.submission_id === team.id)?.judge_email}
                                            </span>
                                        </div>
                                    ) : (
                                        <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-orange-500/10 text-orange-400 text-xs border border-orange-500/20 font-medium">
                                            <Clock className="w-3.5 h-3.5" />
                                            Pending
                                        </div>
                                    )}
                                </div>

                                <div className="space-y-2">
                                    <div>
                                        <span className="text-zinc-500 text-sm">Problem Statement:</span>
                                        <p className="text-zinc-300 text-sm font-medium line-clamp-2 mt-0.5">
                                            {team.problem_statement}
                                        </p>
                                    </div>
                                </div>
                            </div>

                            <div className="px-6 py-4 border-t border-zinc-800 bg-zinc-900/50 flex items-center justify-between text-sm">
                                <span className="text-zinc-400 group-hover:text-zinc-300 transition-colors">
                                    Evaluate Team &rarr;
                                </span>
                                {(!team.ppt_link || team.ppt_link.trim() === '') && (
                                    <span className="text-red-400 text-xs font-semibold">No PPT Provided</span>
                                )}
                            </div>
                        </Link>
                    )
                })}

                {(!submissions || submissions.length === 0) && (
                    <div className="col-span-full py-12 text-center text-zinc-500 border border-dashed border-zinc-800 rounded-2xl">
                        No submissions available for judging yet.
                    </div>
                )}
            </div>
        </div>
    )
}
