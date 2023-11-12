export const SubscriptionPlan = [
    {
        name: 'Free',
        slug: 'free',
        quota: 10,
        PagePerPdf: 2,
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
        PagePerPdf: 4,
        price: {
            amount: 50,
            priceIds: {
                test: process.env.STRIPE_PRICE_API_ID,
                production: ''
            }
        }
    },
    {
        name: 'Custom',
        slug: 'custom',
        quota: 'custom',
        PagePerPdf: 'custom',
        price: {
            amount: 'custom',
            priceIds: {
                test: process.env.STRIPE_PRICE_API_ID,
                production: ''
            }
        }
    }


]