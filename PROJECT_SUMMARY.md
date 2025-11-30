# Kuro QR - Project Summary

## ✅ What Was Built

A complete Next.js static website that:
- Redirects QR code scans to random URLs based on user hashes
- Encrypts user data to obscure the hash-to-URL mappings
- Exports as a fully static site that can be hosted anywhere
- Includes QR code generation tools
- Uses pnpm as the package manager

## 📁 Project Structure

```
kuro-qr/
├── app/
│   ├── [hash]/
│   │   ├── page.tsx           # Server component with generateStaticParams
│   │   └── client-page.tsx    # Client component handling redirects
│   ├── globals.css            # Global styles
│   ├── layout.tsx             # Root layout
│   └── page.tsx               # Homepage with info
│
├── data/
│   ├── users.json             # Your user data (gitignored)
│   └── users.example.json     # Example template
│
├── lib/
│   └── crypto.ts              # Encryption utilities
│
├── scripts/
│   ├── encrypt-data.ts        # Encrypts users.json at build time
│   ├── generate-qr-codes.ts   # Generates QR code images
│   └── generate-hash.ts       # Generates random hashes for new users
│
├── public/
│   └── data.enc               # Encrypted user data (generated at build)
│
├── out/                       # Static build output (ready to deploy)
│
├── qr-codes/                  # Generated QR code images
│
├── .env.local                 # Your secrets (gitignored)
├── .env.example               # Environment template
├── README.md                  # Main documentation
├── DEPLOYMENT.md              # Deployment guide
└── package.json               # Dependencies and scripts
```

## 🔑 Key Features Implemented

### 1. Static Export Configuration
- `next.config.ts` configured for static export
- Dynamic routes with `generateStaticParams`
- All pages pre-rendered at build time

### 2. Data Encryption
- Simple XOR encryption for basic obfuscation
- Build-time encryption of user data
- Client-side decryption in the browser
- Uses a secret key stored in `.env.local`

### 3. Dynamic Redirect System
- Each user hash gets its own static page
- Random URL selection from user's list
- Client-side redirect with loading state
- Error handling for invalid hashes

### 4. QR Code Generation
- Automatic QR code image generation
- 512x512 PNG format
- Configurable base URL
- Organized by user hash and name

### 5. Helper Scripts
- `encrypt-data`: Encrypts users.json before build
- `generate-qr`: Creates QR codes for all users
- `generate-hash`: Generates secure random hashes

## 📝 Available Commands

```bash
pnpm dev              # Start development server
pnpm build            # Build static site (encrypts data + builds)
pnpm encrypt-data     # Manually encrypt user data
pnpm generate-qr      # Generate QR codes for all users
pnpm generate-hash    # Generate a new random hash
pnpm start            # Start production server (for testing)
pnpm lint             # Run ESLint
```

## 🔐 Security Implementation

1. **Encryption Key**:
   - Generated using `openssl rand -base64 32`
   - Stored in `.env.local` (gitignored)
   - Used for both encryption and decryption

2. **Data Obfuscation**:
   - User data encrypted at build time
   - XOR-based encryption (suitable for basic privacy)
   - Not cryptographically secure against determined attackers
   - Good enough for obscuring casual inspection

3. **Privacy Measures**:
   - `data/users.json` is gitignored
   - `.env.local` is gitignored
   - QR codes folder is gitignored
   - Encrypted data is included in build output

## 🚀 How It Works

### Build Process
1. User runs `pnpm build`
2. Script reads `data/users.json`
3. Data is encrypted using `ENCRYPTION_SECRET`
4. Encrypted data saved to `public/data.enc`
5. Next.js builds static pages for each user hash
6. Output directory `out/` contains complete site

### Runtime Process
1. User scans QR code (e.g., `https://yourdomain.com/abc123`)
2. Browser loads the static HTML for that hash
3. Client-side React component loads
4. Component fetches `/data.enc`
5. Data is decrypted using `NEXT_PUBLIC_CLIENT_KEY`
6. User's hash is found in decrypted data
7. Random URL selected from user's list
8. Browser redirects to the selected URL

## 📦 Dependencies

### Runtime
- `next` - React framework with static export
- `react` & `react-dom` - UI library

### Development
- `typescript` - Type safety
- `tailwindcss` - Styling
- `eslint` - Code quality
- `tsx` - TypeScript execution
- `dotenv` - Environment variables
- `qrcode` - QR code generation

## 🎯 Example Usage

1. **Add a user**:
```bash
pnpm run generate-hash
# Copy output to data/users.json
```

2. **Build the site**:
```bash
pnpm build
```

3. **Generate QR codes**:
```bash
pnpm run generate-qr
```

4. **Deploy**:
```bash
# Upload the out/ directory to any static host
```

## 🔄 Updating Content

To update URLs for existing users:
1. Edit `data/users.json`
2. Run `pnpm build`
3. Redeploy `out/` directory
4. QR codes remain the same!

To add new users:
1. Generate hash: `pnpm run generate-hash`
2. Add to `data/users.json`
3. Run `pnpm build`
4. Run `pnpm run generate-qr`
5. Print new QR codes
6. Redeploy `out/` directory

## ✨ Ready to Deploy!

The project is fully set up and ready to use. The `out/` directory contains your complete static website that can be deployed to:

- GitHub Pages
- Netlify
- Vercel
- Cloudflare Pages
- Any static web hosting

See `DEPLOYMENT.md` for detailed deployment instructions for each platform.

## 📚 Documentation

- `README.md` - Main documentation and setup guide
- `DEPLOYMENT.md` - Detailed deployment instructions
- `.env.example` - Environment variables template
- `data/users.example.json` - User data template

Everything is documented and ready to use! 🎉
