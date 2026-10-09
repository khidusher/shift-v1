create table if not exists public.shift_registrations (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  full_name text not null check (char_length(btrim(full_name)) between 2 and 120),
  phone text not null check (char_length(btrim(phone)) between 7 and 30),
  email text check (email is null or char_length(email) <= 254),
  academic_level text not null check (
    academic_level in ('100', '200', '300', '400', 'postgrad')
  ),
  department text check (
    department is null or char_length(department) <= 120
  )
);

alter table public.shift_registrations enable row level security;

revoke all on table public.shift_registrations from anon, authenticated;
grant all on table public.shift_registrations to service_role;

create index if not exists shift_registrations_created_at_idx
  on public.shift_registrations (created_at desc);
