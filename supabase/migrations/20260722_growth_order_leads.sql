create table if not exists public.growth_order_leads (
  id uuid primary key default gen_random_uuid(),
  source_inquiry_id text not null unique,
  local_inquiry_id text,
  customer_name text,
  phone text,
  email text,
  service_type text,
  package_name text,
  event_date text,
  event_time text,
  event_location text,
  pax integer,
  notes text,
  referral_code text,
  estimated_amount numeric(12,2) not null default 0 check (estimated_amount >= 0),
  status text not null default 'confirmed' check (status in ('new', 'confirmed', 'quoted', 'cancelled', 'completed')),
  raw_payload jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

alter table public.growth_order_leads enable row level security;

drop policy if exists growth_order_leads_public_insert on public.growth_order_leads;
create policy growth_order_leads_public_insert
  on public.growth_order_leads
  for insert
  to anon, authenticated
  with check (true);

drop policy if exists growth_order_leads_public_upsert on public.growth_order_leads;
create policy growth_order_leads_public_upsert
  on public.growth_order_leads
  for update
  to anon, authenticated
  using (true)
  with check (true);

drop policy if exists growth_order_leads_member_select_own on public.growth_order_leads;
create policy growth_order_leads_member_select_own
  on public.growth_order_leads
  for select
  to authenticated
  using (
    email = auth.jwt() ->> 'email'
    or phone in (
      select phone
      from public.profiles
      where user_id = auth.uid()
    )
  );

drop policy if exists growth_order_leads_member_update_own on public.growth_order_leads;
create policy growth_order_leads_member_update_own
  on public.growth_order_leads
  for update
  to authenticated
  using (
    email = auth.jwt() ->> 'email'
    or phone in (
      select phone
      from public.profiles
      where user_id = auth.uid()
    )
  )
  with check (true);
