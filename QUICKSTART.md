# 🚀 Quick Reference

## Essential Commands

```bash
# Setup
pnpm install                    # Install dependencies
cp .env.example .env.local      # Create environment file
cp data/users.example.json data/users.json  # Create users file

# Development
pnpm dev                        # Start dev server (localhost:3000)

# Building
pnpm build                      # Build static site → out/

# Tools
pnpm run generate-hash          # Generate new random hash
pnpm run generate-qr            # Generate QR codes → qr-codes/
pnpm run encrypt-data           # Manually encrypt user data

# Deployment
# Just upload the out/ directory!
```

## File Locations

```
.env.local              # Your secret keys (DON'T COMMIT)
data/users.json         # Your users (DON'T COMMIT)
out/                    # Deploy this directory
qr-codes/               # Print these QR codes
```

## Environment Variables

```env
ENCRYPTION_SECRET=...           # Secret key for encryption
NEXT_PUBLIC_CLIENT_KEY=...      # Must match ENCRYPTION_SECRET
NEXT_PUBLIC_BASE_URL=...        # Your deployed URL
```

## User JSON Format

```json
{
  "hash": "unique-hash-here",
  "name": "Display Name",
  "urls": [
    "https://first-url.com",
    "https://second-url.com"
  ]
}
```

## Common Workflows

### Add New User
```bash
pnpm run generate-hash          # Get hash
# Add to data/users.json
pnpm build                      # Rebuild
pnpm run generate-qr            # Generate QR
# Deploy out/
```

### Update URLs
```bash
# Edit data/users.json
pnpm build                      # Rebuild
# Deploy out/
# QR codes stay the same!
```

### Change Domain
```bash
# Update NEXT_PUBLIC_BASE_URL in .env.local
pnpm build
pnpm run generate-qr            # New QR codes needed
# Deploy out/
```

## Testing

```bash
# Local testing
pnpm dev
# Visit: http://localhost:3000/abc123

# Production testing
pnpm build
npx serve out
# Visit: http://localhost:3000/abc123
```

## Deployment Checklist

- [ ] Set `NEXT_PUBLIC_BASE_URL` to your domain
- [ ] Add users to `data/users.json`
- [ ] Run `pnpm build`
- [ ] Run `pnpm run generate-qr`
- [ ] Upload `out/` directory to hosting
- [ ] Test: Visit `https://yourdomain.com/[hash]`
- [ ] Print QR codes from `qr-codes/` folder

## URLs

- Homepage: `https://yourdomain.com/`
- User redirect: `https://yourdomain.com/[hash]`
- Example: `https://yourdomain.com/abc123`

## Troubleshooting

| Problem | Solution |
|---------|----------|
| Build fails | Check `.env.local` has `ENCRYPTION_SECRET` |
| No redirects | Verify `NEXT_PUBLIC_CLIENT_KEY` matches `ENCRYPTION_SECRET` |
| 404 errors | Ensure user hash exists in `data/users.json` |
| QR wrong URL | Update `NEXT_PUBLIC_BASE_URL` and regenerate |

## Security Reminders

- ⚠️ Never commit `.env.local`
- ⚠️ Never commit `data/users.json` to public repos
- ✅ Use HTTPS in production
- ✅ Backup your encryption key securely
- ✅ Use random, unpredictable hashes

## Support

- 📖 Full docs: `README.md`
- 🚀 Deployment: `DEPLOYMENT.md`
- 📝 Summary: `PROJECT_SUMMARY.md`
