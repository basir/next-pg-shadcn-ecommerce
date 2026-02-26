# Jules Frontend Handoff (Next.js Repo)

## Repo Scope
- Work only in this repository: `next-pg-shadcn-ecommerce`.
- Local path: `bkm-zishop-frontend`.
- Do not perform Spring Boot backend changes from this repo.

## Frontend Contract Targets
1. Keep auth routes:
- `/sign-in`
- `/sign-up`

2. Root redirect:
- File: `app/(root)/page.tsx`
- Required behavior: redirect to `/home`.

3. Navbar auth behavior:
- Unauthenticated: show `Login` and `Become a Seller`.
- Authenticated: show avatar dropdown with `Profile`, `Settings`, `Sign Out`.
- Display `session.user.name` (fallback `User`), not email.

4. NextAuth wiring:
- Use Credentials flow to Java backend API.
- No Prisma/Vercel Postgres adapter usage.
- JWT session strategy.

5. Signup payload contract:
- `{ firstName, lastName, email, password, confirmPassword }`

6. UI modernization scope:
- Premium glassmorphism for `/sign-in` and `/sign-up`.
- Scope restriction: background swap is auth-only.
  - Apply auth background image only on `/sign-in` and `/sign-up`.
  - Do not apply auth background to `/home`, listing pages, category pages, or any non-auth route.
- Preserve existing sign-in/sign-up submit logic.
- Clone the auth UI from reference image while keeping functional behavior unchanged.
- Reference file for layout cloning:
  - `public/images/references/auth-phone-reference.png`
- Important design instruction:
  - Remove the hand from the reference composition.
  - Keep phone mockup centered.
  - Match logo placement and field hierarchy from the reference.
- Branding:
  - Use `public/logo.png` as primary brand logo in auth pages.

## Static Asset Paths
- Background image (auth routes only): `public/farm-bg.jpg`
- Alternate background: `public/farm-bg2.jpg` (optional; may be absent in some branches)
- Logo: `public/logo.png`
- Auth reference: `public/images/references/auth-phone-reference.png`
- Home hero/category PNG assets:
  - `public/images/home/*.png`
  - `public/images/products/*.png`

Use these in code as:
- `src="/farm-bg.jpg"`
- `src="/images/home/hero-machinery.png"`

## Validation Before PR
1. `npm install`
2. `npm run build`
3. `npm run dev`
4. Smoke test:
- `/home`
- `/sign-in`
- `/sign-up`
- `/settings`

## PR Rules
- Create a dedicated feature branch for each major task.
- Open PR to `main`.
- Include screenshots for UI tasks and mention contract changes explicitly.
