'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { createClient } from '@/lib/supabase/client'
import { Loader2, ArrowLeft } from 'lucide-react'

interface Team {
    id: string | number
    team_name: string
    problem_statement: string
    ppt_link: string
}

interface JudgingInterfaceProps {
    team: Team
    userEmail: string
    alreadyJudged: boolean
}

const getEmbedUrl = (url: string) => {
    if (!url) return ''
    try {
        if (url.includes('docs.google.com/presentation')) {
            return url.replace(/\/edit.*$/, '/embed?start=false&loop=false&delayms=3000').replace(/\/view.*$/, '/embed?start=false&loop=false&delayms=3000')
        }
    } catch (e) {
        console.error("Invalid URL format", e)
    }
    return url // fallback
}

export default function JudgingInterface({ team, userEmail, alreadyJudged }: JudgingInterfaceProps) {
    const router = useRouter()
    const [submitting, setSubmitting] = useState(false)

    const [scores, setScores] = useState({
        approach: 0,
        novelty: 0,
        technicality: 0,
        business_model: 0,
        feasibility: 0,
        wow_factor: 0
    })

    const totalScore = Object.values(scores).reduce((a, b) => a + b, 0)

    const handleScoreChange = (criteria: keyof typeof scores, value: string, max: number) => {
        const num = parseInt(value) || 0
        if (num >= 0 && num <= max) {
            setScores(prev => ({ ...prev, [criteria]: num }))
        }
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        if (alreadyJudged) return

        setSubmitting(true)
        const supabase = createClient()

        try {
            // 1. Insert into judging_scores
            const { error: scoreError } = await supabase
                .from('judging_scores')
                .insert({
                    submission_id: team.id,
                    judge_email: userEmail,
                    approach: scores.approach,
                    novelty: scores.novelty,
                    technicality: scores.technicality,
                    business_model: scores.business_model,
                    feasibility: scores.feasibility,
                    wow_factor: scores.wow_factor,
                    total_score: totalScore
                })

            if (scoreError) throw scoreError

            // 2. Insert into audit_logs
            const { error: logError } = await supabase
                .from('audit_logs')
                .insert({
                    judge_email: userEmail,
                    team_name: team.team_name,
                    action: `Scored ${totalScore}/100`
                })

            if (logError) console.error("Audit log error:", logError)

            // Redirect back on success
            router.push('/admin/judging')
            router.refresh()
        } catch (err) {
            console.error("Error submitting score:", err)
            alert("Failed to submit score. Please try again.")
        } finally {
            setSubmitting(false)
        }
    }

    const embedUrl = getEmbedUrl(team.ppt_link)

    return (
        <div className="h-full flex flex-col lg:flex-row gap-6">
            {/* Left panel: PPT Preview */}
            <div className="flex-1 rounded-2xl border border-zinc-800 bg-zinc-900 overflow-hidden flex flex-col">
                <div className="px-4 py-3 bg-zinc-800/50 border-b border-zinc-800 text-sm font-medium text-zinc-300 flex justify-between items-center">
                    <span>Presentation Deck</span>
                    <a
                        href={team.ppt_link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-400 hover:text-blue-300 transition-colors"
                    >
                        Open in new tab
                    </a>
                </div>
                <div className="flex-1 bg-zinc-950/50 p-2">
                    {embedUrl ? (
                        <iframe
                            src={embedUrl}
                            className="w-full h-full rounded-xl border-none"
                            allowFullScreen
                        />
                    ) : (
                        <div className="w-full h-full flex items-center justify-center text-zinc-500">
                            No valid presentation link provided.
                        </div>
                    )}
                </div>
            </div>

            {/* Right panel: Scoring Form */}
            <div className="w-full lg:w-96 rounded-2xl border border-zinc-800 bg-zinc-900 overflow-hidden flex flex-col">
                <div className="px-6 py-4 bg-zinc-800/50 border-b border-zinc-800">
                    <h2 className="text-lg font-bold text-white">Evaluation Form</h2>
                    <p className="text-zinc-400 text-sm mt-1">Score each criteria from 0 to 10.</p>
                </div>

                <form onSubmit={handleSubmit} className="p-6 flex-1 overflow-y-auto space-y-6 flex flex-col">

                    <div className="space-y-4 flex-1">
                        {[
                            { id: 'approach', label: 'Approach / Relevance', max: 20 },
                            { id: 'novelty', label: 'Novelty / Innovation', max: 20 },
                            { id: 'technicality', label: 'Technicality', max: 20 },
                            { id: 'business_model', label: 'Business Model', max: 20 },
                            { id: 'feasibility', label: 'Feasibility', max: 10 },
                            { id: 'wow_factor', label: 'Wow Factor', max: 10 }
                        ].map((criteria) => (
                            <div key={criteria.id} className="flex items-center justify-between gap-4">
                                <label className="text-zinc-300 font-medium text-sm flex-1">
                                    {criteria.label}
                                </label>
                                <div className="relative w-24">
                                    <input
                                        type="number"
                                        min="0"
                                        max={criteria.max}
                                        disabled={alreadyJudged}
                                        value={scores[criteria.id as keyof typeof scores]}
                                        onChange={(e) => handleScoreChange(criteria.id as keyof typeof scores, e.target.value, criteria.max)}
                                        className="w-full bg-zinc-950 border border-zinc-800 rounded-lg px-3 py-2 text-white text-right focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all disabled:opacity-50"
                                    />
                                    <div className="absolute right-3 top-1/2 -translate-y-1/2 text-zinc-500 text-sm pointer-events-none opacity-0">/{criteria.max}</div>
                                </div>
                            </div>
                        ))}
                    </div>

                    <div className="pt-6 border-t border-zinc-800 mt-auto">
                        <div className="flex items-center justify-between mb-6">
                            <span className="text-lg font-bold text-white">Total Score</span>
                            <span className="text-2xl font-black text-emerald-400">{totalScore} <span className="text-sm font-medium text-emerald-500/50">/ 100</span></span>
                        </div>

                        <button
                            type="submit"
                            disabled={alreadyJudged || submitting}
                            className="w-full flex justify-center items-center py-3.5 px-4 bg-blue-600 hover:bg-blue-500 text-white rounded-xl font-bold transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            {submitting ? (
                                <Loader2 className="w-5 h-5 animate-spin" />
                            ) : alreadyJudged ? (
                                'Evaluation Completed'
                            ) : (
                                'Submit Evaluation'
                            )}
                        </button>
                        <button
                            type="button"
                            onClick={() => router.push('/admin/judging')}
                            className="w-full mt-3 py-3.5 px-4 bg-zinc-800 hover:bg-zinc-700 text-zinc-300 rounded-xl font-medium transition-colors"
                        >
                            Cancel & Go Back
                        </button>
                    </div>
                </form>
            </div>
        </div>
    )
}
