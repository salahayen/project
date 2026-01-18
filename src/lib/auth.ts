import { NextAuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import LinkedInProvider from "next-auth/providers/linkedin";
import prisma from "./db";

export const authOptions: NextAuthOptions = {
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID || "",
            clientSecret: process.env.GOOGLE_CLIENT_SECRET || "",
        }),
        LinkedInProvider({
            clientId: process.env.LINKEDIN_CLIENT_ID || "",
            clientSecret: process.env.LINKEDIN_CLIENT_SECRET || "",
        }),
    ],
    callbacks: {
        async signIn({ user, account, profile }) {
            if (!user.email) return false;

            try {
                // Check if user exists
                const existingUser = await prisma.user.findUnique({
                    where: { email: user.email },
                });

                if (!existingUser) {
                    // Create new user if not exists
                    const code = `CUS-${Date.now().toString().slice(-6)}${Math.floor(Math.random() * 1000)}`;

                    await prisma.user.create({
                        data: {
                            code,
                            email: user.email,
                            name: user.name || "User",
                            passwordHash: "social_login_user", // Default password for social login users
                            role: "CLIENT", // Enum value string
                        },
                    });
                }
                return true;
            } catch (error) {
                console.error("Error saving user", error);
                return false;
            }
        },
        async jwt({ token, user }) {
            if (user) {
                // Fetch user role from DB to add to token
                const dbUser = await prisma.user.findUnique({
                    where: { email: user.email! },
                });
                if (dbUser) {
                    token.role = dbUser.role;
                    token.id = dbUser.id;
                }
            }
            return token;
        },
        async session({ session, token }) {
            if (session.user) {
                (session.user as any).role = token.role;
                (session.user as any).id = token.id;
            }
            return session;
        },
    },
    session: {
        strategy: "jwt",
    },
    secret: process.env.NEXTAUTH_SECRET,
};
