# Vercel Deployment Guide

This repository contains both the Frontend (Vite) and Backend (Next.js) applications. To deploy correctly on Vercel, you must create **two separate projects**.

## 1. Deploying the Backend (API)

1.  **Create New Project** in Vercel.
2.  Import this same repository.
3.  **Project Name**: `finume-platform-backend` (or similar, but update `vercel.json` in root if different).
4.  **Framework Preset**: Next.js.
5.  **Root Directory**: Click "Edit" and select `backend`.
6.  **Environment Variables**:
    *   `DATABASE_URL`: Your Neon DB connection string.
7.  **Deploy**.

## 2. Deploying the Frontend (UI)

1.  **Create New Project** in Vercel.
2.  Import this same repository (again).
3.  **Project Name**: `finume-platform` (or whatever you prefer).
4.  **Framework Preset**: Vite.
5.  **Root Directory**: Leave as `./` (default).
6.  **Environment Variables**:
    *   `VITE_API_URL`: `https://finume-platform-backend.vercel.app` (The URL of your deployed backend).
7.  **Deploy**.

## 3. Connecting Them

The `vercel.json` file in the root directory contains a rewrite rule:
```json
"destination": "https://finume-platform-backend.vercel.app/api/:match*"
```
**CRITICAL**: If your backend project name is NOT `finume-platform-backend`, you must update the `destination` URL in `vercel.json` to match your actual backend URL, commit, and push.


## Troubleshooting: Ensure Vercel is Connected to GitHub

If Vercel is not picking up your code changes, it might be disconnected or connected to the wrong repo.

1.  Go to your **Vercel Project Dashboard**.
2.  Click on the **Settings** tab.
3.  Click on **Git** in the sidebar.
4.  Look at **Connected Git Repository**.
    *   **If it's empty**: Click **Connect** and select `salahudinhasn-lang/Finume-platform`.
    *   **If it's wrong**: Click **Disconnect**, then **Connect** the correct one.
5.  Once connected, any new `git push` to GitHub will trigger a deployment.
