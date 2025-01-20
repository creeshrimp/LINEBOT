import { GoogleSpreadsheet } from 'google-spreadsheet'
import { JWT } from 'google-auth-library'
import 'dotenv/config'

export default async (docID, sheetID) => {
    try {
        const serviceAccountAuth = new JWT({
            // env var values here are copied from service account credentials generated by google
            // see "Authentication" section in docs for more info
            email: process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL,

            // 私鑰必須將\n替換為真正的換行符號
            key: process.env.GOOGLE_PRIVATE_KEY.split(String.raw`\n`).join('\n'),
            scopes: ['https://www.googleapis.com/auth/spreadsheets'],
        })

        const doc = new GoogleSpreadsheet(docID, serviceAccountAuth)

        await doc.loadInfo()
        console.log(`
-------- getSheet --------
載入文件
文件標題: ${doc.title}
文件ID: ${doc.spreadsheetId}
--------------------------
        `)

        const sheet = doc.sheetsById[sheetID]
        return sheet
    } catch (error) {
        console.log(error)
    }
}
