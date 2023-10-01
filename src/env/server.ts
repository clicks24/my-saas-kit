
type serverSchema = {
    STRIPE_SECRET: string,
    DATABASE_URL: string,
    NODE_ENV: string,
    RESEND_SECRET: string,
    UPLOADTHING_SECRET: string,
    UPLOADTHING_APP_ID: string,
    NEXTAUTH_URL: string,
    UPLOADTHING_URL: string,
    NEXTAUTH_SECRET: string,
    RESEND_DOMAIN: string
}

export const serverEnv = {
    STRIPE_SECRET: String(process.env.STRIPE_SECRET),
    DATABASE_URL: String(process.env.DATABASE_URL),
    NODE_ENV: String(process.env.NODE_ENV),
    RESEND_SECRET: String(process.env.RESEND_SECRET),
    UPLOADTHING_SECRET: String(process.env.UPLOADTHING_SECRET),
    UPLOADTHING_APP_ID: String(process.env.UPLOADTHING_APP_ID),
    NEXTAUTH_URL: String(process.env.NEXTAUTH_URL),
    UPLOADTHING_URL: String(process.env.UPLOADTHING_URL),
    NEXTAUTH_SECRET: String(process.env.NEXTAUTH_SECRET),
    RESEND_DOMAIN: String(process.env.RESEND_DOMAIN)
} satisfies serverSchema