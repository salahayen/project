# Fix Build Error: "No Output Directory named dist"

The error happens because Vercel thinks this is still a **Vite** project (which outputs to `dist`).
Since we switched to the **Backend** (Next.js), we must tell Vercel to look for a Next.js app.

## The Fix
1.  Go to your Vercel Project **Settings**.
2.  Select **Build & Development Settings**.
3.  Look for **"Framework Preset"**.
    *   It currently says: `Vite` (or Other).
    *   **Change it to**: `Next.js`.
4.  Click **Save**.
5.  Go to **Deployments** and **Redeploy**.

This will tell Vercel to expect the `.next` folder instead of `dist`, and the build will pass.
