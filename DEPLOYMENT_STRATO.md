# Deployment Instructions for kuro.korenblum.de

## What Changed
The app is now configured to work when hosted in the `/kuro` subdirectory.

## Configuration Applied
- `basePath: "/kuro"` - All routes are now prefixed with `/kuro`
- `assetPrefix: "/kuro"` - All static assets load from `/kuro/_next/`
- Data file now loads from `/kuro/data.enc`

## Upload Instructions

1. **Upload the entire `out/` folder contents** to your FTP directory:
   ```
   /kuro/
   ├── _next/              (JavaScript, CSS, fonts)
   ├── 404/
   ├── YXJpZgo=/           (Arif's hash folder)
   ├── Y2F0cmluCg==/       (Catrin's hash folder)
   ├── aGVyci1xdWVsbGUK/  (Herr Quelle's hash folder)
   ├── am9uYXMK/           (Jonas's hash folder)
   ├── ... (other hash folders)
   ├── data.enc            (encrypted user data)
   ├── index.html          (homepage)
   └── ... (other files)
   ```

2. **Make sure to upload ALL files and folders** from the `out/` directory

3. **Folder structure should be**:
   - Your FTP root → `kuro/` folder
   - Inside `kuro/` → all files from `out/`

## URLs
With the domain forwarding configured:
- Homepage: `https://kuro.korenblum.de/`
- QR redirects: `https://kuro.korenblum.de/[hash]/`
- Example: `https://kuro.korenblum.de/aGVyci1xdWVsbGUK/`

## Update QR Codes
Since the base URL changed, you need to regenerate the QR codes:

1. Update `.env.local`:
   ```
   NEXT_PUBLIC_BASE_URL=https://kuro.korenblum.de
   ```

2. Regenerate QR codes:
   ```bash
   pnpm run generate-qr
   ```

## Testing
After uploading:
1. Visit `https://kuro.korenblum.de/` - should show the homepage
2. Visit `https://kuro.korenblum.de/aGVyci1xdWVsbGUK/` - should redirect to one of Herr Quelle's URLs
3. Check browser console (F12) if there are any errors

## Important Notes
- The domain forwarding from Strato should point to the `/kuro` directory
- All paths are now relative to `/kuro`, so the app will work correctly
- Don't forget to fill in URLs for users who currently have empty URL arrays
