import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
import bcrypt from "bcryptjs";
import User from "@/models/User";
import dbConnect from "@/lib/dbConnect";

export const authOptions = {
  session: {
    strategy: "jwt",
    maxAge: 30 * 24 * 60 * 60, // 30 days
  },
  providers: [
    CredentialsProvider({
      name: "credentials",
      credentials: {},
      async authorize(credentials) {
        await dbConnect();

        const user = await User.findOne({ email: credentials.email });
        if (!user) {
          throw new Error("No user found with this email.");
        }

        // Check if user registered with Google
        if (user.provider !== "credentials") {
          throw new Error("This email is registered with Google. Please use Google to sign in.");
        }

        // Check if email is verified
        if (!user.emailVerified) {
          throw new Error(JSON.stringify({
            type: "verify",
            message: "Please verify your email before signing in.",
            userId: user._id.toString()
          }));
        }

        const isPasswordCorrect = await bcrypt.compare(credentials.password, user.password);
        if (!isPasswordCorrect) {
          throw new Error("Invalid email or password.");
        }

        return {
          _id: user._id.toString(),
          email: user.email,
          name: user.name,
          image: user.image,
          provider: user.provider
        };
      },
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
  ],

  callbacks: {
    async signIn({ user, account, profile }) {
      await dbConnect();

      const existingUser = await User.findOne({ email: user.email });

      // Handle Google sign-in
      if (account.provider === "google") {
        if (existingUser) {
          if (existingUser.provider !== "google") {
            // User already exists via credentials - redirect with error
            return `/signin?error=credentials`;
          }
          // User exists and is a Google user - allow sign in
          return true;
        } else {
          // First-time Google sign-in — create the user
          try {
            await User.create({
              name: user.name,
              email: user.email,
              image: user.image,
              provider: "google",
              emailVerified: true,
            });
            return true;
          } catch (error) {
            console.error("Error creating Google user:", error);
            return false;
          }
        }
      }

      // Handle credentials sign-in (already handled in authorize function)
      return true;
    },

    async jwt({ token, user }) {
      if (user) {
        token._id = user._id;
        token.email = user.email;
        token.name = user.name;
        token.image = user.image;
        token.provider = user.provider;
      }
      return token;
    },

    async session({ session, token }) {
      if (token) {
        session.user._id = token._id;
        session.user.email = token.email;
        session.user.name = token.name;
        session.user.image = token.image;
        session.user.provider = token.provider;
      }
      return session;
    },
  },

  pages: {
    signIn: "/signin",
    error: "/signin", // Redirect to signin page on error
  },
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };