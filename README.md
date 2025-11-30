# 🎯 Kuro QR - QR Code Redirector

A Next.js static website that redirects users to random URLs based on QR code scans. Each user has a unique hash that maps to a personalized list of URLs.

## 🌟 Features

- **Static Export**: Fully static website that can be hosted anywhere
- **Encrypted Data**: User data is encrypted at build time to obscure the hash-to-URL mappings
- **Random Redirects**: Each scan redirects to a random URL from the user's list
- **Privacy-Focused**: Encryption keys stay local and are never committed to version control

## 🚀 Quick Start

```bash
# 1. Install dependencies
pnpm install

# 2. Generate encryption key
openssl rand -base64 32

# 3. Set up environment
cp .env.example .env.local
# Edit .env.local and add your key + base URL

# 4. Set up users
cp data/users.example.json data/users.json
# Edit data/users.json and add your users

# 5. Build the site
pnpm build

# 6. Generate QR codes
pnpm run generate-qr

# 7. Deploy the out/ directory
```

## 📖 Detailed Setup

### Prerequisites

- Node.js 18+
- pnpm package manager

### Installation

1. Clone the repository:
```bash
git clone <your-repo-url>
cd kuro-qr
```

2. Install dependencies:
```bash
pnpm install
```

3. Set up your encryption keys:
```bash
# Generate a random key
openssl rand -base64 32

# Copy the example env file
cp .env.example .env.local

# Edit .env.local and replace both keys with the generated key
```

Your `.env.local` should look like:
```env
ENCRYPTION_SECRET=your-generated-key-here
NEXT_PUBLIC_CLIENT_KEY=your-generated-key-here
```

⚠️ **Important**: Keep `.env.local` secret and never commit it to version control!

### Adding Users

1. Copy the example users file:
```bash
cp data/users.example.json data/users.json
```

2. Edit `data/users.json` and add your users:

```json
[
  {
    "hash": "abc123",
    "name": "John Doe",
    "urls": [
      "https://example.com",
      "https://github.com",
      "https://stackoverflow.com"
    ]
  },
  {
    "hash": "xyz789",
    "name": "Jane Smith",
    "urls": [
      "https://twitter.com",
      "https://linkedin.com"
    ]
  }
]
```

**Field descriptions:**
- `hash`: A unique identifier for the user (will be part of the URL). Use random, hard-to-guess values.
- `name`: A friendly name for reference (not shown to users)
- `urls`: Array of URLs to randomly redirect to

**Tips:**
- Generate secure random hashes: `pnpm run generate-hash` or `openssl rand -hex 16`
- Keep `data/users.json` private (it's already in `.gitignore`)
- The data will be encrypted automatically during the build process

### Development

Run the development server:

```bash
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) to see the homepage.

To test a user redirect, visit: `http://localhost:3000/[hash]` (e.g., `http://localhost:3000/abc123`)

### Building for Production

Build the static site:

```bash
pnpm build
```

This will:
1. Encrypt your user data using the encryption key from `.env.local`
2. Build the Next.js app as a static site
3. Output everything to the `out/` directory

### Deployment

The `out/` directory contains your complete static website. Deploy it to any static hosting service:

**GitHub Pages:**
```bash
# Push the out/ directory to gh-pages branch
pnpm dlx gh-pages -d out
```

**Netlify:**
```bash
# Drag and drop the out/ folder to Netlify
# Or connect your repo and set build command to: pnpm build
```

**Vercel:**
```bash
vercel --prod
```

**Any Web Server:**
```bash
# Upload the out/ directory to your web server
scp -r out/* user@yourserver:/var/www/html/
```

## 🔐 Security Notes

1. **Encryption Keys**: The encryption uses a simple XOR cipher suitable for basic obfuscation. It's not cryptographically secure against determined attackers.

2. **Client-Side Decryption**: The encrypted data and decryption key are sent to the client, so technically someone could reverse-engineer it. This system is designed for basic privacy, not high security.

3. **Use HTTPS**: Always host on HTTPS to prevent man-in-the-middle attacks.

4. **Keep Keys Private**: Never commit `.env.local` or `data/users.json` to public repositories.

## 📱 Generating QR Codes

### Automatic Generation (Recommended)

After deploying, use the built-in script to generate QR codes:

```bash
# Set your base URL in .env.local first
# NEXT_PUBLIC_BASE_URL=https://yourdomain.com

pnpm run generate-qr
```

This will create PNG QR codes for all users in the `qr-codes/` directory.

### Manual Generation

Alternatively, use any QR code generator (e.g., [qr-code-generator.com](https://www.qr-code-generator.com/)):
1. Create a QR code for: `https://yourdomain.com/[hash]`
2. Example: `https://yourdomain.com/abc123`

## 🔄 Common Workflows

### Adding a New User

```bash
# 1. Generate a new hash
pnpm run generate-hash

# 2. Add the user to data/users.json
# Copy the output from step 1 and add it to the JSON array

# 3. Rebuild the site
pnpm build

# 4. Generate new QR codes
pnpm run generate-qr
```

### Updating URLs for a User

```bash
# 1. Edit data/users.json and update the URLs

# 2. Rebuild
pnpm build

# QR codes don't need to be regenerated - they stay the same!
```

### Deploying Updates

```bash
# 1. Make your changes to data/users.json

# 2. Rebuild
pnpm build

# 3. Deploy the out/ directory to your hosting service
```

## 🛠️ Project Structure

```
kuro-qr/
├── app/
│   ├── [hash]/         # Dynamic route for user redirects
│   │   └── page.tsx
│   ├── layout.tsx
│   └── page.tsx        # Homepage
├── data/
│   └── users.json      # User configuration (not committed)
├── lib/
│   └── crypto.ts       # Encryption utilities
├── scripts/
│   └── encrypt-data.ts # Build-time encryption script
├── public/
│   └── data.enc        # Encrypted user data (generated at build)
└── .env.local          # Environment variables (not committed)
```

## 📝 License

MIT

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.
