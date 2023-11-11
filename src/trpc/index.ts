import { getKindeServerSession } from '@kinde-oss/kinde-auth-nextjs/server';
import { privateProcedure,publicProcedure,router } from './trpc';
import { TRPCError } from "@trpc/server"
import { db } from '@/db';
import { z } from 'zod';
import { INFINITE_QUERY_LIMIT } from '@/config/infinite-query';

export const appRouter = router({
    authCallback: publicProcedure.query(async () => {
        const { getUser } = getKindeServerSession()
        const user = getUser()
        console.log(user)
        console.log("here")

        console.log(user.id,user.email)

        if (!user.id || !user.email || !user) {
            console.log("dshgsdhjgfsdgfj")
            throw new TRPCError({ code: 'UNAUTHORIZED' })
        }

        // check if the user is in the database
        const dbUser = await db.user.findFirst({
            where: {
                id: user.id,
            },
        })

        console.log(dbUser)

        if (!dbUser) {
            // create user in db
            await db.user.create({
                data: {
                    id: user.id,
                    email: user.email,
                },
            })
        }

        return { success: true }
    }),
    getUserFiles: privateProcedure.query(async ({ ctx }) => {
        return await db.file.findMany({
            where: {
                userId: ctx.userId
            }
        })
    }),
    getFile: privateProcedure.input(z.object({ key: z.string() })).mutation(async ({ ctx,input }) => {
        const file = await db.file.findFirst({
            where: {
                key: input.key,
                userId: ctx.userId
            }
        })

        if (!file) throw new TRPCError({ code: 'NOT_FOUND' })

        return file
    }),
    getFileUploadStatus: privateProcedure.input(z.object({ fileId: z.string() })).query(async ({ ctx,input }) => {
        const file = await db.file.findFirst({
            where: {
                id: input.fileId,
                userId: ctx.userId
            }
        })
        if (!file) return { status: 'PENDING' as const }

        return { status: file.uploadStatus }
    }),
    deleteFile: privateProcedure.input(z.object({ id: z.string() })).mutation(async ({ ctx,input }) => {
        const { userId } = ctx

        const file = await db.file.findFirst({
            where: {
                id: input.id,
                userId,
            },
        })


        if (!file) throw new TRPCError({ code: 'NOT_FOUND' })

        await db.file.delete({
            where: {
                id: input.id,
            },
        })

        return file
    }),
    getMessage: privateProcedure.input(z.object({
        limit: z.number().min(1).max(100).nullish(),
        cursor: z.string().nullish(),
        fileId: z.string()
    })).query(async ({ ctx,input }) => {
        const { userId } = ctx
        const { cursor,fileId } = input

        const limit = input.limit ?? INFINITE_QUERY_LIMIT

        const file = db.file.findFirst({
            where: {
                id: fileId,
                userId
            }
        })

        if (!file) throw new TRPCError({ code: 'NOT_FOUND' })

        const messages = await db.message.findMany({
            take: limit + 1,
            where: {
                fileId
            },
            orderBy: {
                createdAt: 'desc'
            },
            select: {
                id: true,
                isUserMessage: true,
                text: true,
                createdAt: true
            }
        })

        let nextCursor: typeof cursor | undefined = undefined

        if (messages.length > limit) {
            nextCursor = messages.pop()?.id
        }



        return {
            messages,
            nextCursor
        }

    })
});


export type AppRouter = typeof appRouter;