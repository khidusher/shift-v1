create table if not exists public.shift_contact_messages (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  full_name text not null check (char_length(btrim(full_name)) between 2 and 120),
  email text not null check (char_length(email) between 3 and 254),
  topic text not null check (
    topic in ('attendee', 'partnership', 'speaker', 'general')
  ),
  message text not null check (
    char_length(btrim(message)) between 10 and 5000
  )
);

alter table public.shift_contact_messages enable row level security;

revoke all on table public.shift_contact_messages from anon, authenticated;
grant all on table public.shift_contact_messages to service_role;

create index if not exists shift_contact_messages_created_at_idx
  on public.shift_contact_messages (created_at desc);
