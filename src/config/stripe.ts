export const SubscriptionPlan = [
    {
        name: 'Free',
        slug: 'free',
        quota: 10,
        pagesPerPdf: 2,
        price: {
            amount: 0,
            priceIds: {
                test: '',
                production: ''
            }
        }
    },
    {
        name: 'Pro',
        slug: 'pro',
        quota: 20,
        pagesPerPdf: 10,
        price: {
            amount: 50,
            priceIds: {
                test: process.env.STRIPE_PRICE_API_ID,
                production: ''
            }
        }
    },
]