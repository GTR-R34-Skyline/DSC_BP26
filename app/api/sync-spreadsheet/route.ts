import { NextResponse } from 'next/server'
import { google } from 'googleapis'

export async function POST(req: Request) {
    try {
        const body = await req.json()
        const {
            teamName,
            design,
            psBreakdown,
            proposedSolution,
            technicalArchitecture,
            developmentLifeCycle,
            feasibilityAnalysis,
            total,
            outcome,
            comments
        } = body

        // 1. Get service account from environment variable
        const serviceAccountVar = process.env.GOOGLE_SERVICE_ACCOUNT
        if (!serviceAccountVar) {
            console.error("GOOGLE_SERVICE_ACCOUNT environment variable is missing")
            return NextResponse.json({ error: "Service account not configured" }, { status: 500 })
        }

        const spreadsheetId = process.env.GOOGLE_SHEET_ID
        if (!spreadsheetId) {
            console.error("GOOGLE_SHEET_ID environment variable is missing")
            return NextResponse.json({ error: "Spreadsheet ID not configured" }, { status: 500 })
        }

        let credentials
        try {
            credentials = JSON.parse(serviceAccountVar)
        } catch (e) {
            console.error("Failed to parse GOOGLE_SERVICE_ACCOUNT JSON")
            return NextResponse.json({ error: "Invalid service account format" }, { status: 500 })
        }

        // 2. Authenticate
        const auth = new google.auth.GoogleAuth({
            credentials,
            scopes: ['https://www.googleapis.com/auth/spreadsheets'],
        })

        const sheets = google.sheets({ version: 'v4', auth })

        // 3. Prepare the row data
        // Team Name | Design (10) | PS Breakedown | Proposed Solution | Technical Architecture | Development Life Cycle | Feasilibity Analsis | Total | Outcome | Comments
        const values = [
            [
                teamName,
                design,
                psBreakdown,
                proposedSolution,
                technicalArchitecture,
                developmentLifeCycle,
                feasibilityAnalysis,
                total,
                outcome,
                comments
            ]
        ]

        // 4. Append to spreadsheet
        await sheets.spreadsheets.values.append({
            spreadsheetId,
            range: 'Sheet1!A:J',
            valueInputOption: 'USER_ENTERED',
            requestBody: {
                values,
            },
        })

        return NextResponse.json({ ok: true })
    } catch (error) {
        console.error('Spreadsheet Sync Error:', error)
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 })
    }
}
