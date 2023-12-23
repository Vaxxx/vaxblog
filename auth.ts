import NextAuth, {getServerSession, NextAuthOptions, User} from "next-auth";
import {PrismaAdapter} from "@auth/prisma-adapter";
import prisma from "@/lib/prisma";
import bcrypt from "bcryptjs";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
import GithubProvider from "next-auth/providers/github";
import {
    GetServerSidePropsContext,
    NextApiRequest,
    NextApiResponse,
} from "next";


declare module "next-auth" {
    interface Session {
        user: User & {
            id: string;
            role: string;
        }
    }
}

declare module "next-auth/jwt" {
    interface JWT{
        id: string;
        role: string;
    }
}


export const config = {
    adapter: PrismaAdapter(prisma),
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID as string,
            clientSecret: process.env.GOOGLE_SECRET_ID as string
        }),
        GithubProvider({
            clientId: process.env.GITHUB_CLIENT_ID as string,
            clientSecret: process.env.GITHUB_SECRET_ID as string
        }),
        CredentialsProvider({
            name: 'Credentials',
            credentials: {
                email: {label: 'email', type: 'email'},
                password: {label: 'password', type: 'password'}
            },
            async authorize(credentials){
                if(!credentials?.email || !credentials?.password){
                    throw new Error("Invalid Credentials");
                }

                //check to see if user exists
                const user = await prisma.user.findUnique({
                    where: {email: credentials.email}
                })

                //if no user is found
                if(!user || !user?.password){
                    throw new Error("Invalid Credentials");
                }

                //check to see if password matches
                const isPasswordAMatch = bcrypt.compare(credentials.password, user.password);

                //if password do not match
                if(!isPasswordAMatch){
                    throw new Error("Invalid Credentials")
                }

                return user;
            }
        })
    ],
    pages: {
        signIn: '/login',
        error: '/error'
    },
    secret: process.env.NEXTAUTH_SECRET,
    session: {strategy: 'jwt'},
    debug: process.env.NODE_ENV === 'development',
    callbacks: {
        async session({session, token}){
            if(token){
                session.user.role = token.role;
                session.user.id = token.id;
            }
            return session;
        },
        async jwt({token, user}){
            return {...token, ...user};
        }
    }
} satisfies NextAuthOptions;

// export const getAuthSession = () => getServerSession(authOptions);
export default NextAuth(config);

// Use it in server contexts
export function auth(
    ...args:
        | [GetServerSidePropsContext["req"], GetServerSidePropsContext["res"]]
        | [NextApiRequest, NextApiResponse]
        | []
) {
    return getServerSession(...args, config);
}
