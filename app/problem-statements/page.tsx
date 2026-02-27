import { createClient } from '@/lib/supabase/server'
import ProblemStatementsClient from './ProblemStatementsClient'

export default async function ProblemStatementsPage() {
  const supabase = await createClient()

  // Fetch all submissions to calculate statistics per problem statement
  const { data: submissions, error } = await supabase
    .from('submissions')
    .select('problem_statement')

  console.log("Retrieved Submissions Problem Statements: ", submissions);

  const submissionStats: Record<string, number> = {}

  if (!error && submissions) {
    submissions.forEach((sub) => {
      if (sub.problem_statement) {
        // Remove trailing/leading spaces, newlines, and double spaces that could break mapping
        const ps = sub.problem_statement.trim().replace(/\s+/g, ' ');
        submissionStats[ps] = (submissionStats[ps] || 0) + 1;
      }
    })
  }

  console.log("Calculated submission stats: ", submissionStats);

  return <ProblemStatementsClient submissionStats={submissionStats} />
}
