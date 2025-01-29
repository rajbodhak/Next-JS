import NextAuth from "next-auth";
import Google from "next-auth/providers/google";
import { client } from "./sanity/lib/client";
import { AUTHOR_BY_GOOGLE_ID_QUERY } from "./sanity/lib/queries";
import { writeClient } from "./sanity/lib/write-client";

export const { handlers, auth, signIn, signOut } = NextAuth({
    providers: [
        Google({
            clientId: process.env.AUTH_GOOGLE_ID,
            clientSecret: process.env.AUTH_GOOGLE_SECRET,
        }),
    ],
    callbacks: {
        async signIn({ user: { name, email, image }, profile }) {

            const existingUser = await client.fetch(AUTHOR_BY_GOOGLE_ID_QUERY, {
                id: profile?.sub,
            });

            if (!existingUser) {
                await writeClient.create({
                    _type: "author",
                    id: profile?.sub, // Use Google's unique ID
                    name,
                    email,
                    image,
                });
            }


            return true;
        },
        async jwt({ token, account, profile }) {
            if (account && profile) {
                const user = await client.withConfig({ useCdn: false }).fetch(
                    AUTHOR_BY_GOOGLE_ID_QUERY,
                    { id: profile?.sub }
                );

                token.id = user?._id; // Attach user ID to the token
            }

            return token;
        },
        async session({ session, token }) {
            Object.assign(session, { id: token.id }); // Add ID to the session
            return session;
        },
    },
});
