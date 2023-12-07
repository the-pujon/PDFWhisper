import { privateProcedure,publicProcedure,router } from './trpc';
import { TRPCError } from "@trpc/server"
import { db } from '@/db';
import { z } from 'zod';


export const faqRouter = router({
    /**
     * Create Faq
     */
    createFAQs: privateProcedure.input(z.object({ question: z.string(),answer: z.string() })).mutation(async ({ ctx,input }) => {
        const { userId } = ctx;
        const admin = await db.user.findFirst({ where: { id: userId } });

        if (!admin || admin.role !== 'admin') throw new TRPCError({ code: 'UNAUTHORIZED' });

        return db.fAQs.create({
            data: {
                question: input.question,
                answer: input.answer
            }
        });
    }),

    /**
     * update faq
     */
    updateFAQs: privateProcedure.input(z.object({ id: z.string(),question: z.string(),answer: z.string() })).mutation(async ({ ctx,input }) => {
        const { userId } = ctx;
        const { id,question,answer } = input;

        const data = question
            ? { question }
            : answer
                ? { answer }
                : { question,answer };

        const admin = await db.user.findFirst({ where: { id: userId } });

        if (!admin || admin.role !== 'admin') throw new TRPCError({ code: 'UNAUTHORIZED' });

        return db.fAQs.update({
            where: { id: id },
            data
        });
    }),

    /**
     * delete faq
     */
    deleteFAQs: privateProcedure.input(z.object({ id: z.string() })).mutation(async ({ ctx,input }) => {
        const { userId } = ctx;
        const admin = await db.user.findFirst({ where: { id: userId } });

        if (!admin || admin.role !== 'admin') throw new TRPCError({ code: 'UNAUTHORIZED' });

        return db.fAQs.delete({ where: { id: input.id } });
    }),

    /**
    * get all faq
    */
    getFAQs: publicProcedure.query(async () => db.fAQs.findMany())
});
