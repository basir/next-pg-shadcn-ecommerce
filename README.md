# Build Full-ECommerce Website By Next.js, Drizzle, PostgreSQL ORM and Shadcn

|                |                                                          |
| -------------- | -------------------------------------------------------- |
| Tech           | Next.js, PostgreSQL, Drizzle Orm, Shadcn, PayPal, Stripe |
| UI             | Tailwind, Shadcn, recharts                               |
| Database       | PostgreSQL, Drizzle Orm                                  |
| Payment        | PayPal, Stripe                                           |
| Deployment     | Github, Vercel                                           |
| Authentication | Auth.js, Google Auth, Magic Link                         |
| Others         | uploadthing, resend, zod                                 |

[![next postgresql amazona](/public/assets/images/app.jpg)](https://next-pg-shadcn-ecommerce.vercel.app/)

## Watch Video Tutorial

[![next postgresql amazona](http://img.youtube.com/vi/M4DrCi8EuYE/0.jpg)](https://www.youtube.com/watch?v=sCFYd1pQBfk&list=PLeh2GWv22bmQhKLSG7DuwptE8BGy8y3lJ&index=1 'Build Ecommerce App By Next.js, Drizzle ORM, Postgres, Shadcn and Stripe')

## View Demo Website

https://next-pg-shadcn-ecommerce.vercel.app

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

## Run Locally

1. Clone repo

   ```shell
    $ git clone git@github.com:basir/next-pg-shadcn-ecommerce.git
    $ cd next-pg-shadcn-ecommerce
   ```

2. Create .env.local File

   - duplicate .env.example and rename it to .env.local

3. Setup PostgreSQL

   - Vercel PostgreSQL
     - Create database at https://vercel.com/docs/storage/vercel-postgres
     - In .env.local file update POSTGRES_URL to db url
   - OR Local PostgreSQL
     - Install it from https://www.postgresql.org/download
     - In .env.local file update POSTGRES_URL to db url

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

## Lessons

1. Introduction
2. Install tools
3. Create next app
4. create website layout
5. list products
6. setup drizzle orm and postgres database
7. load products from database
8. deploy on vercel
9. create product details page
10. implement authentication
11. create new user
12. implement add to cart
13. create shopping cart page
14. get shipping address
15. select payment method
16. place order
17. create order details page
18. pay order by PayPal
19. create orders history page
20. create user profile form
21. create admin dashboard page
22. list orders
23. mark orders to paid and delivered
24. list products
25. edit products
26. list users
27. edit users
28. add home page carousel and sidebar
29. create search page
30. rate and review products
31. add dark and light theme
32. pay order by Stripe
33. email order receipt by Resend
34. find shipping address on Google Map
35. signin with magic link
36. signin with google

## Contact Developer

Email: basir.jafarzadeh@gmail.com
