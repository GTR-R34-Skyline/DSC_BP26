import { createClient } from '@/lib/supabase/server'
import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip as RechartsTooltip,
    ResponsiveContainer,
    PieChart,
    Pie,
    Cell,
    Legend
} from 'recharts'
import { Users, FileText, CheckCircle } from 'lucide-react'

// Note: Recharts is a client component library, but often works in generic forms
// We will split the charts into a client component to avoid issues.
import DashboardCharts from './DashboardCharts'

export default async function AdminDashboard() {
    const supabase = await createClient()

    // Fetch total submissions
    const { count: totalSubmissions, error: countError } = await supabase
        .from('submissions')
        .select('*', { count: 'exact', head: true })

    // Fetch all submissions for grouping
    const { data: submissions, error: subError } = await supabase
        .from('submissions')
        .select('problem_statement, id')

    // Fetch judging scores to count how many are judged
    const { data: scores, error: scoresError } = await supabase
        .from('judging_scores')
        .select('submission_id')

    // Calculate grouped data
    const problemDistribution: Record<string, number> = {}
    if (submissions) {
        submissions.forEach(sub => {
            const ps = sub.problem_statement || 'Unknown'
            problemDistribution[ps] = (problemDistribution[ps] || 0) + 1
        })
    }

    const chartData = Object.entries(problemDistribution).map(([name, value]) => ({
        name,
        value,
    }))

    const uniqueJudgedTeams = new Set(scores?.map(s => s.submission_id)).size || 0

    return (
        <div className="space-y-6">
            <div>
                <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-400 to-emerald-400 bg-clip-text text-transparent">
                    Dashboard Overview
                </h1>
                <p className="text-zinc-400 mt-1">Welcome back. Here's what's happening today.</p>
            </div>

            {/* Metrics Row */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-6">
                    <div className="flex items-center gap-4">
                        <div className="p-3 bg-blue-500/10 text-blue-400 rounded-xl">
                            <Users className="w-6 h-6" />
                        </div>
                        <div>
                            <p className="text-zinc-400 text-sm font-medium">Total Registrations</p>
                            <h2 className="text-3xl font-bold text-white mt-1">{totalSubmissions || 0}</h2>
                        </div>
                    </div>
                </div>

                <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-6">
                    <div className="flex items-center gap-4">
                        <div className="p-3 bg-emerald-500/10 text-emerald-400 rounded-xl">
                            <CheckCircle className="w-6 h-6" />
                        </div>
                        <div>
                            <p className="text-zinc-400 text-sm font-medium">Teams Judged</p>
                            <h2 className="text-3xl font-bold text-white mt-1">{uniqueJudgedTeams}</h2>
                        </div>
                    </div>
                </div>

                <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-6">
                    <div className="flex items-center gap-4">
                        <div className="p-3 bg-purple-500/10 text-purple-400 rounded-xl">
                            <FileText className="w-6 h-6" />
                        </div>
                        <div>
                            <p className="text-zinc-400 text-sm font-medium">Pending Judging</p>
                            <h2 className="text-3xl font-bold text-white mt-1">
                                {Math.max(0, (totalSubmissions || 0) - uniqueJudgedTeams)}
                            </h2>
                        </div>
                    </div>
                </div>
            </div>

            {/* Charts Row */}
            <DashboardCharts chartData={chartData} />
        </div>
    )
}
