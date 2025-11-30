import fs from "fs"
import path from "path"
import ClientPage from "./client-page"

interface UserData {
  hash: string
  name: string
  urls: string[]
}

// This runs at build time only
export async function generateStaticParams() {
  // Read users.json at build time to generate static pages
  const dataPath = path.join(process.cwd(), "data", "users.json")

  if (!fs.existsSync(dataPath)) {
    console.warn("Warning: data/users.json not found. No pages will be generated.")
    return []
  }

  const rawData = fs.readFileSync(dataPath, "utf8")
  const users: UserData[] = JSON.parse(rawData)

  // Generate params for each user hash
  return users.map((user) => ({
    hash: user.hash
  }))
}

export default function HashPage() {
  return <ClientPage />
}
