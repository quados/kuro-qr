# Deployment Guide

This guide covers deploying your Kuro QR static site to various hosting platforms.

## Prerequisites

Before deploying:

1. ✅ Set up your encryption keys in `.env.local`
2. ✅ Add your users to `data/users.json`
3. ✅ Run `pnpm build` to generate the static site
4. ✅ Generate QR codes with `pnpm run generate-qr`

The `out/` directory contains your complete static website ready to deploy.

## GitHub Pages

### Using gh-pages package

```bash
# Install gh-pages
pnpm add -D gh-pages

# Deploy
pnpm dlx gh-pages -d out
```

### Manual deployment

1. Push the `out/` directory to a `gh-pages` branch
2. Enable GitHub Pages in repository settings
3. Set source to `gh-pages` branch

## Netlify

### Drag and Drop

1. Go to [netlify.com](https://netlify.com)
2. Drag the `out/` folder to the upload area
3. Done!

### Git Integration

1. Connect your repository
2. Set build command: `pnpm build`
3. Set publish directory: `out`
4. Add environment variables in Netlify dashboard
5. Deploy

## Vercel

```bash
# Install Vercel CLI
pnpm add -D vercel

# Deploy
pnpm dlx vercel --prod
```

Or use the Vercel dashboard to connect your Git repository.

## Cloudflare Pages

1. Go to Cloudflare Pages dashboard
2. Connect your Git repository
3. Build command: `pnpm build`
4. Build output directory: `out`
5. Add environment variables
6. Deploy

## Static Web Server (nginx, Apache, etc.)

### Using SCP

```bash
# Upload to your server
scp -r out/* user@yourserver:/var/www/html/
```

### Using rsync

```bash
# Sync with your server
rsync -avz --delete out/ user@yourserver:/var/www/html/
```

### Using FTP

Use any FTP client (FileZilla, Cyberduck, etc.) to upload the contents of the `out/` directory.

## Custom Domain Setup

After deploying, you'll typically want to use a custom domain:

1. **Update .env.local**: Set `NEXT_PUBLIC_BASE_URL` to your domain
2. **Rebuild**: Run `pnpm build` again
3. **Regenerate QR Codes**: Run `pnpm run generate-qr`
4. **Redeploy**: Upload the new `out/` directory
5. **Configure DNS**: Point your domain to your hosting provider

## Important Notes

### Security

- ⚠️ Never commit `.env.local` to version control
- ⚠️ Never commit `data/users.json` to public repositories
- ✅ Always use HTTPS for your deployed site
- ✅ Keep your encryption keys backed up securely

### Updates

When you update user data:

1. Edit `data/users.json`
2. Run `pnpm build`
3. Redeploy the `out/` directory

QR codes only need regeneration if:
- You change your base URL
- You add new users
- The hash values change

## Troubleshooting

### QR Codes not working

- Check that `NEXT_PUBLIC_BASE_URL` in `.env.local` matches your deployed URL
- Ensure the URL includes `https://` if using SSL
- Regenerate QR codes after changing the base URL

### Redirects not working

- Verify that `data.enc` file exists in the deployed `out/` directory
- Check browser console for errors
- Ensure `NEXT_PUBLIC_CLIENT_KEY` matches `ENCRYPTION_SECRET`

### 404 Errors on refresh

This shouldn't happen with static export, but if it does:
- Check your hosting provider's SPA/routing configuration
- Ensure all hash pages are present in the `out/` directory

## Environment Variables for Deployment

When deploying, you may need to set these environment variables:

```bash
ENCRYPTION_SECRET=your-secret-key-here
NEXT_PUBLIC_CLIENT_KEY=your-secret-key-here
NEXT_PUBLIC_BASE_URL=https://yourdomain.com
```

Most hosting providers allow you to set these in their dashboard.
