# Single Project Setup (Final Step)

I have updated the code to combine everything into one project.

## ONE LAST STEP in Vercel

1.  Go to your **Vercel Dashboard**.
2.  Select your project `finume-platform`.
3.  Go to **Settings** -> **General**.
4.  Find **"Root Directory"**.
5.  Click **Edit** and change it to: `backend`.
    *   (Currently it is likely `.` or empty).
6.  Click **Save**.
7.  Go to **Deployments** tab and **Redeploy**.

## Why?
The "Engine" (Backend) needs to be the main project. I have programmed the Engine to automatically build and include the "Body" (Frontend) inside itself.
