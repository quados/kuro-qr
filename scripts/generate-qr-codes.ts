import dotenv from "dotenv"
import fs from "fs"
import path from "path"
import QRCode from "qrcode"

// Load environment variables
dotenv.config({ path: ".env.local" })

interface UserData {
  hash: string
  name: string
  urls: string[]
}

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000"

async function generateQRCodes() {
  try {
    // Read the users data
    const dataPath = path.join(process.cwd(), "data", "users.json")
    if (!fs.existsSync(dataPath)) {
      console.error("❌ Error: data/users.json not found!")
      process.exit(1)
    }

    const rawData = fs.readFileSync(dataPath, "utf8")
    const users: UserData[] = JSON.parse(rawData)

    console.log(`📖 Loaded ${users.length} users from data/users.json\n`)

    // Create qr-codes directory if it doesn't exist
    const qrDir = path.join(process.cwd(), "qr-codes")
    if (!fs.existsSync(qrDir)) {
      fs.mkdirSync(qrDir, { recursive: true })
    }

    // Generate QR code for each user
    for (const user of users) {
      const url = `${BASE_URL}/${user.hash}`
      const filename = `${user.hash}_${user.name.replace(/\s+/g, "_")}.png`
      const outputPath = path.join(qrDir, filename)

      await QRCode.toFile(outputPath, url, {
        errorCorrectionLevel: "M",
        type: "png",
        width: 512,
        margin: 2
      })

      console.log(`✅ Generated QR code for ${user.name}`)
      console.log(`   Hash: ${user.hash}`)
      console.log(`   URL: ${url}`)
      console.log(`   File: ${outputPath}\n`)
    }

    console.log(`🎉 Successfully generated ${users.length} QR codes in ./qr-codes/`)
  } catch (error) {
    console.error("❌ Error generating QR codes:", error)
    process.exit(1)
  }
}

generateQRCodes()
