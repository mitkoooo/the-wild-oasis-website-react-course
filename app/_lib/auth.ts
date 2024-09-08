import type { Session, User } from "next-auth";
import NextAuth, { NextAuthConfig } from "next-auth";
import Google from "next-auth/providers/google";
import { NextRequest } from "next/server";
import { createGuest, getGuest } from "./data-service";

const authConfig: NextAuthConfig = {
  providers: [
    Google({
      clientId: process.env.AUTH_GOOGLE_ID,
      clientSecret: process.env.AUTH_GOOGLE_SECRET,
    }),
  ],
  callbacks: {
    authorized({
      request,
      auth,
    }: {
      request: NextRequest;
      auth: Session | null;
    }) {
      return !!auth?.user;
    },
    async signIn({ user, account, profile, credentials }) {
      if (!user?.email || !user?.name)
        throw new Error(
          "user email is undefined in authConfig callback function"
        );

      try {
        const existingGuest = await getGuest(user?.email);

        if (!existingGuest)
          await createGuest({ email: user.email, fullName: user.name });

        return true;
      } catch {
        return false;
      }
    },
    async session({ session, user }: { session: Session; user: User }) {
      if (!session?.user?.email)
        throw new Error("The email of the current user is undefined");

      const guest = await getGuest(session?.user?.email);

      if (!guest?.id)
        throw new Error(
          `The id property does not exist on the guest with email of ${session?.user?.email}`
        );
      session.user.id = "" + guest?.id;

      return session;
    },
  },
  pages: {
    signIn: "/login",
  },
};

export const {
  auth,
  signIn,
  signOut,
  handlers: { GET, POST },
} = NextAuth(authConfig);
