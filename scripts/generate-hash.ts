#!/usr/bin/env node
import { exec } from "child_process"
import { promisify } from "util"

const execAsync = promisify(exec)

async function generateHash() {
  try {
    const { stdout } = await execAsync("openssl rand -hex 16")
    const hash = stdout.trim()

    console.log("🎲 Generated new unique hash:")
    console.log(`\n   ${hash}\n`)
    console.log("Add this to your data/users.json file:")
    console.log(`
{
  "hash": "${hash}",
  "name": "User Name Here",
  "urls": [
    "https://example.com"
  ]
}
`)
  } catch (error) {
    console.error("❌ Error generating hash:", error)
    console.log("\nAlternatively, you can use any random string generator or UUID.")
    process.exit(1)
  }
}

generateHash()
