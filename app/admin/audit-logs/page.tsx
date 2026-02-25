import { createClient } from '@/lib/supabase/server'
import { History } from 'lucide-react'

export default async function AuditLogsPage() {
    const supabase = await createClient()

    // Fetch all audit logs
    const { data: logs, error } = await supabase
        .from('audit_logs')
        .select('*')
        .order('created_at', { ascending: false })

    if (error) {
        console.error('Error fetching audit logs:', error)
    }

    return (
        <div className="space-y-6">
            <div>
                <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-400 to-emerald-400 bg-clip-text text-transparent">
                    Audit Logs
                </h1>
                <p className="text-zinc-400 mt-1">
                    Track judging actions and evaluation history.
                </p>
            </div>

            <div className="bg-zinc-900 border border-zinc-800 rounded-2xl overflow-hidden">
                <div className="p-4 border-b border-zinc-800 bg-zinc-800/20 flex items-center gap-2">
                    <History className="w-5 h-5 text-zinc-400" />
                    <h2 className="text-white font-medium">Activity Timeline</h2>
                </div>

                <div className="overflow-x-auto">
                    <table className="w-full text-left text-sm text-zinc-400">
                        <thead className="text-xs uppercase bg-zinc-800/50 text-zinc-300 border-b border-zinc-800">
                            <tr>
                                <th scope="col" className="px-6 py-4 font-medium">Timestamp</th>
                                <th scope="col" className="px-6 py-4 font-medium">Judge Email</th>
                                <th scope="col" className="px-6 py-4 font-medium">Team Name</th>
                                <th scope="col" className="px-6 py-4 font-medium">Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {logs && logs.length > 0 ? (
                                logs.map((log, idx) => (
                                    <tr
                                        key={log.id}
                                        className={`border-b border-zinc-800/50 hover:bg-zinc-800/30 transition-colors ${idx === logs.length - 1 ? 'border-b-0' : ''}`}
                                    >
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <div className="flex flex-col">
                                                <span className="text-white font-medium">
                                                    {new Date(log.created_at).toLocaleDateString()}
                                                </span>
                                                <span className="text-xs text-zinc-500">
                                                    {new Date(log.created_at).toLocaleTimeString()}
                                                </span>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 text-zinc-300">
                                            {log.judge_email}
                                        </td>
                                        <td className="px-6 py-4 font-medium text-white">
                                            {log.team_name}
                                        </td>
                                        <td className="px-6 py-4">
                                            <span className="inline-flex items-center rounded-md bg-blue-400/10 px-2 py-1 text-xs font-medium text-blue-400 ring-1 ring-inset ring-blue-400/20">
                                                {log.action}
                                            </span>
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan={4} className="px-6 py-12 text-center text-zinc-500">
                                        No activity logs found.
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    )
}
