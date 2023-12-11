import { getKindeServerSession } from '@kinde-oss/kinde-auth-nextjs/server';
import { privateProcedure,publicProcedure,router } from './trpc';
import { TRPCError } from "@trpc/server"
import { db } from '@/db';
import { z } from 'zod';
import { INFINITE_QUERY_LIMIT } from '@/config/infinite-query';
import { getUserSubscriptionPlan,stripe } from '@/lib/stripe';
import { absoluteUrl } from '@/lib/utils';
import { SubscriptionPlan } from '@/config/stripe';
import { contactRouter } from './contact';
import { feedbackRouter } from './feedback';
import { faqRouter } from './faq';
import { userRouter } from './users';

export const appRouter = router({

    authCallback: publicProcedure.query(async () => {
        const { getUser } = getKindeServerSession()
        const user = getUser()

        if (!user?.id || !user?.email)
          throw new TRPCError({ code: 'UNAUTHORIZED' })

        // check if the user is in the database
        const dbUser = await db.user.findFirst({
          where: {
            id: user.id,
          },
        })

        if (!dbUser) {
          // create user in db
          await db.user.create({
            data: {
                name: user.given_name + ' ' + user.family_name,
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

        await db.message.deleteMany({
            where: {
                fileId:input.id
            }
        })

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

    }),
    createStripeSession: privateProcedure.mutation(
        async ({ ctx }) => {
            const { userId } = ctx

            const billingUrl = absoluteUrl('/dashboard/billing')

            if (!userId)
                throw new TRPCError({ code: 'UNAUTHORIZED' })

            const dbUser = await db.user.findFirst({
                where: {
                    id: userId,
                },
            })



            if (!dbUser)
                throw new TRPCError({ code: 'UNAUTHORIZED' })

            const subscriptionPlan =
                await getUserSubscriptionPlan()




            if (
                subscriptionPlan.isSubscribed &&
                dbUser.stripeCustomerId
            ) {
                const stripeSession =
                    await stripe.billingPortal.sessions.create({
                        customer: dbUser.stripeCustomerId,
                        return_url: billingUrl,
                    })

                return { url: stripeSession.url }
            }

            const stripeSession =
                await stripe.checkout.sessions.create({
                    success_url: billingUrl,
                    cancel_url: billingUrl,
                    payment_method_types: ['card','paypal'],
                    mode: 'subscription',
                    billing_address_collection: 'auto',
                    line_items: [
                        {
                            price: SubscriptionPlan.find(
                                (plan) => plan.name === 'Pro'
                            )?.price.priceIds.test,
                            quantity: 1,
                        },
                    ],
                    metadata: {
                        userId: userId,
                    },
                })

            return { url: stripeSession.url }
        }
    ),
    user: userRouter,
    faq: faqRouter,
    contactUs: contactRouter,
    feedbackInfo: feedbackRouter,
    getLatestMsg: privateProcedure.input(z.object({ id: z.string() })).query(async ({ ctx,input }) => {
        const { userId } = ctx;

        const messages = await db.message.findMany({
            where: {
                fileId: input.id,
                userId: userId
            },
            orderBy: {
                createdAt: 'desc'
            },

        })

        return messages
    })
});


export type AppRouter = typeof appRouter;