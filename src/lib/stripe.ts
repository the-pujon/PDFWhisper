import { SubscriptionPlan } from '@/config/stripe'
import { db } from '@/db'
import { getKindeServerSession } from '@kinde-oss/kinde-auth-nextjs/server'
import Stripe from 'stripe'

export const stripe = new Stripe(process.env.STRIPE_SECRET_KEY ?? '',{
    apiVersion: "2023-10-16",
    typescript: true,
})

export async function getUserSubscriptionPlan() {
    const { getUser } = getKindeServerSession()
    const user = getUser()

    if (!user.id) {
        return {
            ...SubscriptionPlan[0],
            isSubscribed: false,
            isCanceled: false,
            stripeCurrentPeriodEnd: null,
        }
    }

    const dbUser = await db.user.findFirst({
        where: {
            id: user.id,
        },
    })

    if (!dbUser) {
        return {
            ...SubscriptionPlan[0],
            isSubscribed: false,
            isCanceled: false,
            stripeCurrentPeriodEnd: null,
        }
    }

    const isSubscribed = Boolean(
        dbUser.stripePriceId &&
        dbUser.stripeCurrentPeriodEnd && // 86400000 = 1 day
        dbUser.stripeCurrentPeriodEnd.getTime() + 86_400_000 > Date.now()
    )

    const plan = isSubscribed
        ? SubscriptionPlan.find((plan) => plan.price.priceIds.test === dbUser.stripePriceId)
        : null

    let isCanceled = false
    if (isSubscribed && dbUser.stripeSubscriptionId) {
        const stripePlan = await stripe.subscriptions.retrieve(
            dbUser.stripeSubscriptionId
        )
        isCanceled = stripePlan.cancel_at_period_end
    }

console.log(plan)

    return {
        ...plan,
        stripeSubscriptionId: dbUser.stripeSubscriptionId,
        stripeCurrentPeriodEnd: dbUser.stripeCurrentPeriodEnd,
        stripeCustomerId: dbUser.stripeCustomerId,
        isSubscribed,
        isCanceled,
    }
}