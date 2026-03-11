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

        // 1. Get service account from environment variable or local file
        let credentials
        const serviceAccountVar = process.env.GOOGLE_SERVICE_ACCOUNT
        
        if (serviceAccountVar) {
            try {
                credentials = JSON.parse(serviceAccountVar)
            } catch (e) {
                console.error("Failed to parse GOOGLE_SERVICE_ACCOUNT JSON")
                return NextResponse.json({ error: "Invalid service account format" }, { status: 500 })
            }
        } else {
            // Fallback to local service_account.json
            try {
                const fs = require('fs')
                const path = require('path')
                const saPath = path.join(process.cwd(), 'service_account.json')
                if (fs.existsSync(saPath)) {
                    credentials = JSON.parse(fs.readFileSync(saPath, 'utf8'))
                } else {
                    console.error("GOOGLE_SERVICE_ACCOUNT missing and service_account.json not found")
                    return NextResponse.json({ error: "Service account not configured" }, { status: 500 })
                }
            } catch (e) {
                console.error("Error reading service_account.json:", e)
                return NextResponse.json({ error: "Failed to read service account" }, { status: 500 })
            }
        }

        const spreadsheetId = process.env.GOOGLE_SHEET_ID || '1nJKRhKlNmDYZgp9NhZ4dudksx-sm6qKbkNe9nT2rn2w'
        console.log(`[Spreadsheet Sync] Using Spreadsheet ID: ${spreadsheetId}`)
        
        if (!spreadsheetId) {
            console.error("GOOGLE_SHEET_ID environment variable is missing")
            return NextResponse.json({ error: "Spreadsheet ID not configured" }, { status: 500 })
        }

        // 2. Authenticate
        const auth = new google.auth.GoogleAuth({
            credentials,
            scopes: ['https://www.googleapis.com/auth/spreadsheets'],
        })

        const sheets = google.sheets({ version: 'v4', auth })

        // 3. Prepare the row data
        // Team Name | Design (10) | PS Breakedown | Proposed Solution | Technical Architecture | Development Life Cycle | Feasilibity Analsis | Total | Outcome | Comments | Timestamp
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
                comments,
                new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' })
            ]
        ]

        // 4. Append to spreadsheet
        try {
            await sheets.spreadsheets.values.append({
                spreadsheetId,
                range: 'Sheet1!A:K',
                valueInputOption: 'USER_ENTERED',
                requestBody: {
                    values,
                },
            })
            console.log("[Spreadsheet Sync] Successfully appended to Sheet1")
        } catch (appendError: any) {
            console.error(`[Spreadsheet Sync] Error appending to Sheet1: ${appendError.message}. Trying generic range A:K.`)
            // Fallback: try appending to the first sheet without specifying name
            await sheets.spreadsheets.values.append({
                spreadsheetId,
                range: 'A:K',
                valueInputOption: 'USER_ENTERED',
                requestBody: {
                    values,
                },
            })
            console.log("[Spreadsheet Sync] Successfully appended using generic range A:K")
        }

        return NextResponse.json({ ok: true })
    } catch (error: any) {
        console.error('Spreadsheet Sync Error:', error)
        return NextResponse.json({ 
            error: 'Internal Server Error', 
            details: error.message || 'Unknown error',
            code: (error as any).code || 'No code'
        }, { status: 500 })
    }
}
