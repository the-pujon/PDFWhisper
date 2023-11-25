import { privateProcedure,publicProcedure,router } from './trpc';
import { TRPCError } from "@trpc/server"
import { db } from '@/db';
import { z } from 'zod';

export const feedbackRouter = router({
    /**
     * getting all feedback
     */
    getAllFeedback: privateProcedure.query(async ({ ctx }) => {
        const { userId } = ctx
        const admin = await db.user.findFirst({
            where: { id: userId }
        })
        if (!admin) throw new TRPCError({ code: 'UNAUTHORIZED' })
        return await db.feedback.findMany()
    }),

    /**
    * creating feedback
    */
    createFeedback: publicProcedure.input(z.object({ message: z.string() })).mutation(async ({ input }) => {
        const { message } = input
        const feedback = await db.feedback.create({
            data: { message }
        })
        if (feedback) throw new TRPCError({ code: 'BAD_REQUEST' })
        return feedback
    }),

    /**
    * deleting feedback
    */
    deleteFeedback: privateProcedure.input(z.object({ id: z.string() })).mutation(async ({ ctx,input }) => {
        const { userId } = ctx
        const admin = await db.user.findFirst({
            where: {
                id: userId
            }
        })
        if (!admin) throw new TRPCError({ code: 'UNAUTHORIZED' })
        return await db.feedback.delete({
            where: { id: input.id }
        })
    }),
})