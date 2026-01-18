# Social Login Setup Guide

I cannot create accounts for you, but this guide will walk you through exactly how to get the keys you need.

## 1. Google Cloud Platform (GCP)
**Goal**: Get `GOOGLE_CLIENT_ID` and `GOOGLE_CLIENT_SECRET`.

1.  **Go to**: [Google Cloud Console](https://console.cloud.google.com/).
2.  **Create Project**: Click the project dropdown (top left) > **New Project**. Name it "Finume Platform" and create.
3.  **Configure Consent Screen**:
    *   Go to **APIs & Services** > **OAuth consent screen**.
    *   Select **External** > specified **Create**.
    *   Fill in App Name ("Finume"), User Support Email (your email), and Developer Contact Info.
    *   Click **Save and Continue** (skip Scopes and Test Users for now).
4.  **Create Credentials**:
    *   Go to **APIs & Services** > **Credentials**.
    *   Click **+ CREATE CREDENTIALS** > **OAuth client ID**.
    *   **Application type**: Web application.
    *   **Name**: "Finume Web App".
    *   **Authorized JavaScript origins**:
        *   `https://finume-platform.vercel.app`
        *   `http://localhost:3000` (For local testing)
    *   **Authorized redirect URIs**:
        *   `https://finume-platform.vercel.app/api/auth/callback/google`
        *   `http://localhost:3000/api/auth/callback/google`
    *   Click **Create**.
5.  **Copy Keys**: A modal will appear. Copy the **Client ID** and **Client Secret**.

---

## 2. LinkedIn Developers
**Goal**: Get `LINKEDIN_CLIENT_ID` and `LINKEDIN_CLIENT_SECRET`.

1.  **Go to**: [LinkedIn Developers](https://www.linkedin.com/developers/apps).
2.  **Create App**: Click **Create app**.
    *   **App name**: Finume Platform.
    *   **LinkedIn Page**: You need a company page (or create a dummy one).
    *   Upload a logo.
    *   Accept terms and create.
3.  **Add Product**:
    *   Go to **Products** tab.
    *   Request access for **"Sign In with LinkedIn using OpenID Connect"**.
4.  **Configure Auth**:
    *   Go to **Auth** tab.
    *   **Authorized redirect URLs for your app**:
        *   `https://finume-platform.vercel.app/api/auth/callback/linkedin`
        *   `http://localhost:3000/api/auth/callback/linkedin`
5.  **Copy Keys**: Under "Application credentials", copy the **Client ID** and **Client Secret**.

---

## 3. Add to Vercel
1.  Go to your **Project** in Vercel (`finume-platform`).
2.  Settings > **Environment Variables**.
3.  Add the 4 keys you just copied:
    *   `GOOGLE_CLIENT_ID`
    *   `GOOGLE_CLIENT_SECRET`
    *   `LINKEDIN_CLIENT_ID`
    *   `LINKEDIN_CLIENT_SECRET`
4.  **Redeploy** the backend project for changes to take effect.
