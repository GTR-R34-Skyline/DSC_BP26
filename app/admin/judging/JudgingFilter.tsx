'use client'

import { useState, useMemo } from 'react'
import Link from 'next/link'
import { CheckCircle, Clock, Search, Filter } from 'lucide-react'

interface Submission {
    id: string | number
    team_name: string
    problem_statement: string
    ppt_link: string
}

interface Score {
    submission_id: string | number
    total_score: number
    judge_email: string
}

interface JudgingFilterProps {
    submissions: Submission[]
    allScores: Score[]
    problemStatements: string[]
}

export default function JudgingFilter({ submissions, allScores, problemStatements }: JudgingFilterProps) {
    const [searchQuery, setSearchQuery] = useState('')
    const [selectedPS, setSelectedPS] = useState<string>('All')

    const scoreMap = useMemo(() => {
        const map = new Map()
        allScores.forEach(s => map.set(s.submission_id, s.total_score))
        return map
    }, [allScores])

    const judgedSubmissionIds = useMemo(() => {
        return new Set(allScores.map(s => s.submission_id))
    }, [allScores])

    const filteredSubmissions = useMemo(() => {
        let filtered = [...submissions]

        // Filter by Problem Statement
        if (selectedPS !== 'All') {
            filtered = filtered.filter(s => s.problem_statement === selectedPS)
        }

        // Search by Team Name
        if (searchQuery.trim() !== '') {
            const query = searchQuery.toLowerCase()
            filtered = filtered.filter(s => 
                s.team_name.toLowerCase().includes(query) || 
                s.problem_statement.toLowerCase().includes(query)
            )
        }

        // Sort by score (descending), then by name
        return filtered.sort((a, b) => {
            const scoreA = scoreMap.get(a.id) || -1
            const scoreB = scoreMap.get(b.id) || -1
            if (scoreB !== scoreA) return scoreB - scoreA
            return a.team_name.localeCompare(b.team_name)
        })
    }, [submissions, searchQuery, selectedPS, scoreMap])

    return (
        <div className="space-y-6">
            <div className="flex flex-col md:flex-row gap-4">
                {/* Search Bar */}
                <div className="relative flex-1">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-500" />
                    <input
                        type="text"
                        placeholder="Search teams or problem statements..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="w-full bg-zinc-900 border border-zinc-800 rounded-xl pl-10 pr-4 py-2.5 text-white focus:outline-none focus:ring-2 focus:ring-blue-500/50 transition-all"
                    />
                </div>

                {/* PS Filter Dropdown */}
                <div className="relative w-full md:w-72">
                    <Filter className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-500" />
                    <select
                        value={selectedPS}
                        onChange={(e) => setSelectedPS(e.target.value)}
                        className="w-full bg-zinc-900 border border-zinc-800 rounded-xl pl-10 pr-4 py-2.5 text-white focus:outline-none focus:ring-2 focus:ring-blue-500/50 transition-all appearance-none"
                    >
                        <option value="All">All Problem Statements</option>
                        {problemStatements.map((ps) => (
                            <option key={ps} value={ps}>{ps}</option>
                        ))}
                    </select>
                </div>
            </div>

            {/* Results Count */}
            <div className="text-zinc-500 text-sm px-1">
                Showing {filteredSubmissions.length} of {submissions.length} submissions
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredSubmissions.map((team) => {
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
                                                {allScores.find(s => s.submission_id === team.id)?.judge_email}
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

                {filteredSubmissions.length === 0 && (
                    <div className="col-span-full py-12 text-center text-zinc-500 border border-dashed border-zinc-800 rounded-2xl">
                        No submissions match your search/filter.
                    </div>
                )}
            </div>
        </div>
    )
}
