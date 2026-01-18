# Critical Deployment Fix

The "Social Login" buttons are failing because **your Vercel project only contains the Frontend (User Interface)**. The Backend (Authentication Logic) is currently **not deployed**, so the buttons have nowhere to go.

You cannot host both parts in one Vercel project without major code changes.

## The Solution: Deploy the Engine (Backend)
You need to create one more project on Vercel for the Backend.

### Step 1: Create Backend Project
1.  Go to **Vercel Dashboard**.
2.  **Add New...** -> **Project**.
3.  Select your repo: `salahudinhasn-lang/Finume-platform`.
4.  **Project Name**: `finume-platform-backend`.
5.  **Root Directory**: Click Edit -> Select `backend`.
6.  **Environment Variables** (Add these here!):
    *   `DATABASE_URL`: (Your Neon DB URL)
    *   `GOOGLE_CLIENT_ID`: (From Google)
    *   `GOOGLE_CLIENT_SECRET`: (From Google)
    *   `LINKEDIN_CLIENT_ID`: (From LinkedIn)
    *   `LINKEDIN_CLIENT_SECRET`: (From LinkedIn)
    *   `NEXTAUTH_URL`: `https://finume-platform-backend.vercel.app`
    *   `NEXTAUTH_SECRET`: (Random string)
7.  **Deploy**.

### Step 2: Connect Frontend to Backend
Once Step 1 is done, you simply tell your existing Frontend where the Backend is.

1.  Go to your **Original Project** (`finume-platform`).
2.  **Settings** -> **Initial Git Branch** -> Ensure it's main.
3.  **Settings** -> **Environment Variables**.
4.  Add/Edit `VITE_API_URL`:
    *   Value: `https://finume-platform-backend.vercel.app` (The URL from Step 1).
5.  **Redeploy** the Frontend.

### Result
User visits Frontend -> Clicks Google -> Frontend calls Backend (`finume-platform-backend`) -> Google Login -> Success.
