# Fresh Start Checklist (New Project)

Since you deleted the project, **all your settings and keys were deleted too.**
You must configure them again for the new project.

## 1. Project Configuration (Crucial)
When creating the project (or in Settings -> General):
*   **Root Directory**: Click `Edit` and select `backend`.
    *   *(If you leave this as `.`, it will fail)*.
*   **Framework Preset**: Ensure it selects `Next.js`.

## 2. Environment Variables (Required again)
You must re-enter these in **Settings -> Environment Variables**:

| Key | Value |
| :--- | :--- |
| `DATABASE_URL` | (Your Neon DB URL) |
| `GOOGLE_CLIENT_ID` | `(Get from Google Console)` |
| `GOOGLE_CLIENT_SECRET` | `(Get from Google Console)` |
| `LINKEDIN_CLIENT_ID` | `(Get from LinkedIn Developers)` |
| `LINKEDIN_CLIENT_SECRET` | `(Get from LinkedIn Developers)` |
| `NEXTAUTH_URL` | `https://your-new-project-url.vercel.app` (Update this after deploy!) |
| `NEXTAUTH_SECRET` | (Any random password) |

## 3. Deployment
*   Click **Deploy**.
*   If it fails initially because of missing keys, add the keys and **Redeploy**.
