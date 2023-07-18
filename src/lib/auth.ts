import { db } from '@/lib/db'
import { PrismaAdapter } from '@next-auth/prisma-adapter'
import { nanoid } from 'nanoid'
import { NextAuthOptions, getServerSession } from 'next-auth'
import GoogleProvider from 'next-auth/providers/google'
import GitHubProvider from "next-auth/providers/github";
import { Sidebar } from '@prisma/client'
import { JWT } from 'next-auth/jwt'
export const authOptions: NextAuthOptions = {
  adapter: PrismaAdapter(db),
  session: {
    strategy: 'jwt',
  },
  pages: {
    signIn: '/sign-in',
  },
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
      authorization: {
        params: {
          prompt: "consent",
          access_type: "offline",
          response_type: "code"
        }
      }
    }),
    GitHubProvider({
      clientId: process.env.GITHUB_CLIENT_ID!,
      clientSecret: process.env.GITHUB_CLIENT_SECRET!,
    })
  ],
  callbacks: {
    async session({ token, session }) {
      session.user.id = token.id;
  session.user.name = token.name;
  session.user.email = token.email;
  session.user.image = token.picture;
  session.user.username = token.username;

  if (token) {
    session.user.homeScreen = token.homeScreen;
    session.user.sidebar = token.sidebar;
  }

  return session;
    },
    async jwt({ token, user }) {
      let dbUser = await db.user.findFirst({
        where: {
          email: token.email,
        },
        include: {
          sidebar: true,
        },
      })
    
      if (!dbUser) {
        token.id = user!.id
        return token
      }
    
      if (!dbUser.username) {
        dbUser = await db.user.update({
          where: {
            id: dbUser.id,
          },
          data: {
            username: nanoid(10),
          },
          include: {
            sidebar: true,
          },
        })
      }
    
      if (!dbUser.homeScreen) {
        dbUser = await db.user.update({
          where: {
            id: dbUser.id,
          },
          data: {
            homeScreen: 'FEED',
          },
          include: {
            sidebar: true,
          },
        })
      }
    
      const defaultSidebarOptions: Sidebar[] = [Sidebar.FEED, Sidebar.DISCUSSIONS, Sidebar.NEWS];
    
      // Check if user already has sidebar options
      const existingSidebarOptions = await db.userSidebar.findMany({
        where: {
          userId: dbUser.id
        },
      });
    
      if (existingSidebarOptions.length === 0) { // only create sidebar options if none exist yet
        for (const sidebarOption of defaultSidebarOptions) {
          await db.userSidebar.create({
            data: {
              user: { connect: { id: dbUser.id } },
              sidebar: sidebarOption,
            },
          });
        }
      }
    
      return {
        id: dbUser.id,
        name: dbUser.name,
        email: dbUser.email,
        picture: dbUser.image,
        username: dbUser.username,
        homeScreen: dbUser.homeScreen,
        sidebar: dbUser.sidebar.map(userSidebar => userSidebar.sidebar),
      } as JWT
    },
    
    redirect() {
      return '/'
    },
  },
}


export const getAuthSession = () => getServerSession(authOptions)
