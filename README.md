# Build Full-ECommerce By Next.js, PostgreSQL, Drizzle Orm and Shadcn

|                |                                                          |
| -------------- | -------------------------------------------------------- |
| Tech           | Next.js, PostgreSQL, Drizzle Orm, Shadcn, PayPal, Stripe |
| UI             | Tailwind, Shadcn, recharts                               |
| Database       | PostgreSQL, Drizzle Orm                                  |
| Payment        | PayPal, Stripe                                           |
| Deployment     | Github, Vercel                                           |
| Authentication | Auth.js, Google Auth, Magic Link                         |
| Others         | uploadthing, resend, zod                                 |

![next postgresql amazona](/public/assets/images/app.jpg)

## Resources

|               |                                                               |
| ------------- | ------------------------------------------------------------- |
| Youtube Video | https://youtu.be/M4DrCi8EuYE                                  |
| Demo Website  | https://github.com/basir/next-pg-shadcn-ecommerce             |
| Source Code   | https://next-pg-shadcn-ecommerce.vercel.app                   |
| Full Course   | https://www.youtube.com/channel/UC2xRE4hUCQ3xO3ymEtMh1Hw/join |
| Contact Basir | basir.jafarzadeh@gmail.com                                    |

## What you will learn

- creating e-commerce website pages by next.js server components
- designing header, footer, sidebar, menu and search box by shadcn and tailwind
- quick view products in modals using nextjs parallel routes with intercepting routes
- create database models by drizzle orm and postgres database
- handling form inputs by react-hook-forms and zod data validator
- updating data by server actions without using any api
- managing shopping cart using http cookies on server side
- handling authentication and authorization by next-auth
- creating customer dashboard to update profile and track orders
- and implement a fully-functional admin dashboard with beautiful charts and handling products, orders and users

## Full Course

🔥 Get Complete Course for $9.99 By Joining My YouTube Channel Pro Membership Here:

https://www.youtube.com/watch?v=MM1qMu-sLqw&list=PLeh2GWv22bmQhKLSG7DuwptE8BGy8y3lJ&index=23

👉 You'll get Admin Dashboard, Search Products, Product Carousel and much more features in Pro Membership.

## Run Locally

1. Clone repo

   ```shell
    $ git clone git@github.com:basir/next-pg-shadcn-ecommerce.git
    $ cd next-pg-shadcn-ecommerce
   ```

2. Create .env.local File

   - duplicate .env.example and rename it to .env.local

3. Setup PostgreSQL

   - Vercel PostgreSQL MongoDB
     - Create database at https://vercel.com/docs/storage/vercel-postgres
     - In .env.local file update POSTGRES_URL to db url
   - OR Local PostgreSQL
     - Install it from https://www.postgresql.org/download
     - In .env.local file update MONGODB_URI to db url

4. Install and Run

   ```shell
     npm install
     npm run dev
   ```

5. Seed Data

   ```shell
     npx tsx ./db/seed
   ```

6. Admin Login

   - Open http://localhost:3000
   - Click Sign In button
   - Enter admin email "admin@example.com" and password "123456" and click Sign In
