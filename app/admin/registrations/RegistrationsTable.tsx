'use client'

import { useState, useMemo } from 'react'
import { Search, Download, Filter } from 'lucide-react'

interface Submission {
    id: string | number
    team_name: string
    leader_name: string
    email: string
    problem_statement: string
    ppt_link: string
    created_at: string
    [key: string]: any // allow other fields for CSV export
}

interface RegistrationsTableProps {
    submissions: Submission[]
    problemStatements: string[]
}

export default function RegistrationsTable({ submissions, problemStatements }: RegistrationsTableProps) {
    const [searchQuery, setSearchQuery] = useState('')
    const [selectedStatement, setSelectedStatement] = useState<string>('all')

    const filteredSubmissions = useMemo(() => {
        return submissions.filter((sub) => {
            const matchesSearch = sub.team_name?.toLowerCase().includes(searchQuery.toLowerCase()) || false
            const matchesStatement = selectedStatement === 'all' || sub.problem_statement === selectedStatement
            return matchesSearch && matchesStatement
        })
    }, [submissions, searchQuery, selectedStatement])

    const exportToCSV = () => {
        if (filteredSubmissions.length === 0) return

        // Extract headers dynamically from the first object
        const headers = Object.keys(filteredSubmissions[0])

        // Create CSV string
        const csvContent = [
            headers.join(','),
            ...filteredSubmissions.map(sub =>
                headers.map(header => {
                    let val = sub[header]
                    if (val === null || val === undefined) val = ''
                    // Escape quotes and wrap in quotes if there's a comma
                    val = String(val).replace(/"/g, '""')
                    if (val.includes(',') || val.includes('"') || val.includes('\n')) {
                        val = `"${val}"`
                    }
                    return val
                }).join(',')
            )
        ].join('\n')

        // Trigger download
        const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' })
        const url = URL.createObjectURL(blob)
        const link = document.createElement('a')
        link.setAttribute('href', url)
        link.setAttribute('download', `registrations_export_${new Date().toISOString().split('T')[0]}.csv`)
        document.body.appendChild(link)
        link.click()
        document.body.removeChild(link)
    }

    return (
        <div className="space-y-4">
            {/* Controls */}
            <div className="flex flex-col sm:flex-row gap-4 justify-between">
                <div className="flex flex-1 gap-4 max-w-2xl">
                    <div className="relative flex-1">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-zinc-500" />
                        <input
                            type="text"
                            placeholder="Search by Team Name..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="w-full bg-zinc-900 border border-zinc-800 rounded-xl pl-10 pr-4 py-2.5 text-white placeholder:text-zinc-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                        />
                    </div>

                    <div className="relative w-64">
                        <Filter className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-zinc-500 pointer-events-none" />
                        <select
                            value={selectedStatement}
                            onChange={(e) => setSelectedStatement(e.target.value)}
                            className="w-full bg-zinc-900 border border-zinc-800 rounded-xl pl-10 pr-4 py-2.5 text-white appearance-none focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                        >
                            <option value="all">All Statements</option>
                            {problemStatements.map(ps => (
                                <option key={ps} value={ps}>{ps}</option>
                            ))}
                        </select>
                    </div>
                </div>

                <button
                    onClick={exportToCSV}
                    className="flex items-center gap-2 bg-zinc-100 text-zinc-900 px-4 py-2.5 rounded-xl font-medium hover:bg-white transition-colors h-fit whitespace-nowrap"
                >
                    <Download className="w-4 h-4" />
                    Export CSV
                </button>
            </div>

            {/* Table */}
            <div className="bg-zinc-900 border border-zinc-800 rounded-2xl overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full text-left text-sm text-zinc-400">
                        <thead className="text-xs uppercase bg-zinc-800/50 text-zinc-300 border-b border-zinc-800">
                            <tr>
                                <th scope="col" className="px-6 py-4 font-medium">Team Name</th>
                                <th scope="col" className="px-6 py-4 font-medium">Leader</th>
                                <th scope="col" className="px-6 py-4 font-medium">Email</th>
                                <th scope="col" className="px-6 py-4 font-medium">Problem Statement</th>
                                <th scope="col" className="px-6 py-4 font-medium">PPT Link</th>
                                <th scope="col" className="px-6 py-4 font-medium text-right">Date</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredSubmissions.length > 0 ? (
                                filteredSubmissions.map((sub, idx) => (
                                    <tr
                                        key={sub.id}
                                        className={`border-b border-zinc-800/50 hover:bg-zinc-800/30 transition-colors ${idx === filteredSubmissions.length - 1 ? 'border-b-0' : ''}`}
                                    >
                                        <td className="px-6 py-4 font-medium text-white whitespace-nowrap">
                                            {sub.team_name}
                                        </td>
                                        <td className="px-6 py-4">
                                            {sub.leader_name}
                                        </td>
                                        <td className="px-6 py-4 truncate max-w-[200px]" title={sub.email}>
                                            {sub.email}
                                        </td>
                                        <td className="px-6 py-4">
                                            <span className="inline-flex items-center rounded-md bg-blue-400/10 px-2 py-1 text-xs font-medium text-blue-400 ring-1 ring-inset ring-blue-400/20">
                                                {sub.problem_statement}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4">
                                            {sub.ppt_link ? (
                                                <a
                                                    href={sub.ppt_link}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    className="text-emerald-400 hover:text-emerald-300 hover:underline"
                                                >
                                                    View PPT
                                                </a>
                                            ) : (
                                                <span className="text-zinc-600">N/A</span>
                                            )}
                                        </td>
                                        <td className="px-6 py-4 text-right">
                                            {new Date(sub.created_at).toLocaleDateString()}
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan={6} className="px-6 py-8 text-center text-zinc-500">
                                        No submissions found matching your filters.
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
                <div className="p-4 border-t border-zinc-800 bg-zinc-900/50 text-xs text-zinc-500 flex justify-between">
                    <span>{filteredSubmissions.length} record(s)</span>
                </div>
            </div>
        </div>
    )
}
