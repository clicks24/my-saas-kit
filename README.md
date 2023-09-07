# Setup

## 1. Clone the repo

Clone the saas-kit repository to your local machine:

```git clone https://github.com/saasplanet/saas-kit.git```

## 2. Setup environment

After cloning the repository, you first need to configure the project's environment variables.

In the projects root directory, rename the .env.example file to .env.

### Database

Any database connection, you can get a free MySQL server by visiting https://www.planetscale.com

```
DATABASE_URL: 
```

### Stripe 

Get your stripe keys: https://stripe.com/docs/keys
```STRIPE_SECRET:```

### Email 

Create a free Resend account and paste in your API key: https://resend.com

```RESEND_SECRET:```

### File uploads

Create a free UploadThing account, and create an app and paste in your keys: https://www.uploadthing.com

```
UPLOADTHING_SECRET: 
UPLOADTHING_APP_ID: 
UPLOADTHING_URL: <can be http://localhost:3000 for development, then your production url on prod>
```

### NextAuth

Read more about the next-auth options: https://next-auth.js.org/configuration/options

```
NEXTAUTH_URL: <can be http://localhost:3000 for development, then your production url on prod>
NEXTAUTH_SECRET: <random hash>
```

## 3. Install

Next, to install the projects dependencies, run the following command in your console inside of the projects directory:

```npm install```

## 4. Generate Prisma 

In order to make sure your DB has the correct schema run:

```npx prisma db push```

Then, generate the prisma client using: 

```npx prisma generate```

## 5. Run

Run the local development server:

```npm run dev```

## 6. Notes

The first account created will have the admin role automatically assigned. 

When deploying to Vercel, make sure you update your environment variables.
