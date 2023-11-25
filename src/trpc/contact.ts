import { getKindeServerSession } from '@kinde-oss/kinde-auth-nextjs/server';
import { privateProcedure,publicProcedure,router } from './trpc';
import { TRPCError } from "@trpc/server"
import { db } from '@/db';
import { z } from 'zod';
import { INFINITE_QUERY_LIMIT } from '@/config/infinite-query';
import { getUserSubscriptionPlan,stripe } from '@/lib/stripe';
import { absoluteUrl } from '@/lib/utils';
import { SubscriptionPlan } from '@/config/stripe';

export const contactRouter = router({
    getAllContactInfo: privateProcedure.query(async ({ ctx }) => {
        const { userId } = ctx

        const admin = await db.user.findFirst({
            where: {
                id: userId
            }
        })
        if (!admin) throw new TRPCError({ code: 'UNAUTHORIZED' })

        return await db.contact.findMany()

    }),

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

    deleteContactInfo: privateProcedure.input(z.object({ id: z.string() })).mutation(async ({ ctx,input }) => {
        const { userId } = ctx

        const admin = await db.user.findFirst({
            where: {
                id: userId
            }
        })
        if (!admin) throw new TRPCError({ code: 'UNAUTHORIZED' })

        return await db.contact.delete({
            where: {
                id: input.id
            }
        })

    }),
})