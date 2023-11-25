import { privateProcedure,publicProcedure,router } from './trpc';
import { TRPCError } from "@trpc/server"
import { db } from '@/db';
import { z } from 'zod';

export const contactRouter = router({
    /**
     * getting all contact us information
     */
    getAllContactInfo: privateProcedure.query(async ({ ctx }) => {
        const { userId } = ctx
        const admin = await db.user.findFirst({
            where: { id: userId }
        })
        if (!admin) throw new TRPCError({ code: 'UNAUTHORIZED' })
        return await db.contact.findMany()
    }),

    /**
    * creating contact us information
    */
    createContactInfo: publicProcedure.input(z.object({ name: z.string(),email: z.string(),phone: z.string(),message: z.string() })).mutation(async ({ input }) => {
        const { email,message,name,phone } = input
        const contactInfo = await db.contact.create({
            data: {
                email,
                name,
                phone,
                message
            }
        })
        if (contactInfo) throw new TRPCError({ code: 'BAD_REQUEST' })
        return contactInfo
    }),

    /**
    * deleting contact us information
    */
    deleteContactInfo: privateProcedure.input(z.object({ id: z.string() })).mutation(async ({ ctx,input }) => {
        const { userId } = ctx
        const admin = await db.user.findFirst({
            where: {
                id: userId
            }
        })
        if (!admin) throw new TRPCError({ code: 'UNAUTHORIZED' })
        return await db.contact.delete({
            where: { id: input.id }
        })
    }),
})