import { serverEnv } from '@/env/server';
import { Plan } from '@prisma/client';
import Stripe from 'stripe';
import { prisma } from './database';

export const stripe = new Stripe(serverEnv.STRIPE_SECRET, {
    apiVersion: "2023-10-16"
});

export type CompletedPlan = {
    plan: Plan,
    stripe_price_monthly: Stripe.Price,
    stripe_price_yearly: Stripe.Price
}

export async function isUserSubscribed(user_id: string) {
    const user = await prisma.user.findFirst({ where: { id: user_id } })
    const subscriptions = await getSubscriptions(String(user?.customer_id))

    return {
        subscribed: subscriptions.length > 0,
        subscriptions: subscriptions
    }
}

export async function getCustomerPortalLink(customer_id: string) {
    const portal = await stripe.billingPortal.sessions.create({
        customer: customer_id,
        return_url: serverEnv.NEXTAUTH_URL + "/dashboard/settings",
    })
    return portal.url;
}

export async function getSubscriptions(customer_id: string): Promise<CompletedPlan[]> {
    const subs = (await stripe.subscriptions.list()).data;
    const plans = await prisma.plan.findMany();

    let results: CompletedPlan[] = [];

    for (var sub of subs) {
        if (sub.customer == customer_id) {
            for (var item of sub.items.data) {
                for (var plan of plans) {
                    if (item.price.id == plan.stripe_price_monthly_id || item.price.id == plan.stripe_price_yearly_id) {

                        const monthPrice = await stripe.prices.retrieve(plan.stripe_price_monthly_id)
                        const yearPrice = await stripe.prices.retrieve(plan.stripe_price_yearly_id)

                        results.push({
                            plan: plan,
                            stripe_price_monthly: monthPrice,
                            stripe_price_yearly: yearPrice
                        })
                    }
                }
            }
        }
    }

    return results;
}

export async function getCompletedPlans() {
    const plans = await prisma.plan.findMany();
    let result: CompletedPlan[] = [];

    for (var plan of plans) {
        const month = await stripe.prices.retrieve(plan.stripe_price_monthly_id);
        const year = await stripe.prices.retrieve(plan.stripe_price_yearly_id);


        result.push(
            {
                plan: plan,
                stripe_price_monthly: month,
                stripe_price_yearly: year
            }
        )
    }

    result.sort((a, b)=>((a.stripe_price_monthly.unit_amount ?? 0) > (b.stripe_price_monthly.unit_amount ?? 0) ? 1 : 0))
    return result;
}