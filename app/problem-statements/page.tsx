import { createClient } from '@/lib/supabase/server'
import ProblemStatementsClient from './ProblemStatementsClient'

export default async function ProblemStatementsPage() {
  const supabase = await createClient()

  // Fetch all submissions to calculate statistics per problem statement
  const { data: submissions, error } = await supabase
    .from('submissions')
    .select('problem_statement')

  const submissionStats: Record<string, number> = {}

  if (!error && submissions) {
    submissions.forEach((sub) => {
      if (sub.problem_statement) {
        submissionStats[sub.problem_statement] = (submissionStats[sub.problem_statement] || 0) + 1
      }
    })
  }

  return <ProblemStatementsClient submissionStats={submissionStats} />
}
