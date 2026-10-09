# SHIFT 1.0

Responsive Next.js site for the SHIFT 1.0 event, with the landing page at `/`,
attendee registration at `/register`, and contact at `/contact`. The original
static HTML mockups are retained in their existing folders.

## Supabase registration setup

1. Create a Supabase project.
2. In the Supabase SQL Editor, run [`supabase/schema.sql`](./supabase/schema.sql)
   to create the private attendee registration table, then run
   [`supabase/contact_schema.sql`](./supabase/contact_schema.sql) to create the
   private contact message table.
3. Copy `.env.example` to `.env.local`, then set `SUPABASE_URL` and
   `SUPABASE_SERVICE_ROLE_KEY` using the project URL and service-role key from
   the Supabase dashboard. Keep the service-role key server-side and never use
   a `NEXT_PUBLIC_` prefix for it.
4. Restart the Next.js server after changing environment variables.

The registration form posts to `/api/register`; the route validates submissions
and inserts them into `public.shift_registrations`. The table has row-level
security enabled and does not grant table access to anonymous or authenticated
browser clients. Only the server route uses the service-role key.

The contact form posts to `/api/contact`; the route validates messages and
inserts them into `public.shift_contact_messages`, which also has row-level
security enabled and is writable only by the server route.

## Run locally

```bash
npm install
npm run dev
```

Then open `http://localhost:3000`. Use `npm run build` to make a production
build, `npm run start` to serve it, and `npm run lint` to check the app code.

Before collecting real attendee data or contact messages, configure the
environment variables, apply both Supabase schema files, and provide a privacy
notice describing how submitted information is used and retained.
