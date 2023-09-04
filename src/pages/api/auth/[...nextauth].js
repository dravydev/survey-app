import NextAuth from 'next-auth/next'
import GithubProvider from 'next-auth/providers/github'

import { MongoDBAdapter } from '@auth/mongodb-adapter'

import mongoClient from '@/lib/mongoClient'

export default NextAuth({
    adapter: MongoDBAdapter(mongoClient),
    session: {
        strategy: 'database',
        maxAge: 7 * 24 * 60 * 60, // 7d
    },
    providers: [
        GithubProvider({
            clientId: process.env.NEXT_PUBLIC_GITHUB_CLIENT_ID,
            clientSecret: process.env.GITHUB_CLIENT_SECRET
        })
    ]
})