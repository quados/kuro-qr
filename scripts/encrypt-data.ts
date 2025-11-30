import dotenv from "dotenv"
import fs from "fs"
import path from "path"

// Load environment variables from .env.local
dotenv.config({ path: ".env.local" })

// Load environment variable
const SECRET_KEY = process.env.ENCRYPTION_SECRET as string

if (!SECRET_KEY) {
  console.error("❌ Error: ENCRYPTION_SECRET environment variable is not set!")
  console.error("Please create a .env.local file with ENCRYPTION_SECRET=your-secret-key")
  process.exit(1)
}

interface UserData {
  hash: string
  name: string
  urls: string[]
}

// Simple XOR-based encryption for client-side compatibility
function simpleEncrypt(text: string, key: string): string {
  const keyBytes = Buffer.from(key, "utf8")
  const textBytes = Buffer.from(text, "utf8")
  const result = Buffer.alloc(textBytes.length)

  for (let i = 0; i < textBytes.length; i++) {
    result[i] = textBytes[i] ^ keyBytes[i % keyBytes.length]
  }

  return result.toString("base64")
}

async function encryptData() {
  try {
    // Read the users data
    const dataPath = path.join(process.cwd(), "data", "users.json")
    const rawData = fs.readFileSync(dataPath, "utf8")
    const users: UserData[] = JSON.parse(rawData)

    console.log(`📖 Loaded ${users.length} users from data/users.json`)

    // Validate data structure
    for (const user of users) {
      if (!user.hash || !user.urls || user.urls.length === 0) {
        throw new Error(`Invalid user data: ${JSON.stringify(user)}`)
      }
    }

    // Encrypt the data
    const encryptedData = simpleEncrypt(JSON.stringify(users), SECRET_KEY)

    // Create public directory if it doesn't exist
    const publicDir = path.join(process.cwd(), "public")
    if (!fs.existsSync(publicDir)) {
      fs.mkdirSync(publicDir, { recursive: true })
    }

    // Write encrypted data to public directory
    const outputPath = path.join(publicDir, "data.enc")
    fs.writeFileSync(outputPath, encryptedData)

    console.log("✅ Data encrypted successfully!")
    console.log(`📦 Output: ${outputPath}`)
    console.log(`🔒 Size: ${encryptedData.length} bytes`)
    console.log(`👤 Users with hashes: ${users.map((u) => u.hash).join(", ")}`)
  } catch (error) {
    console.error("❌ Error encrypting data:", error)
    process.exit(1)
  }
}

encryptData()
