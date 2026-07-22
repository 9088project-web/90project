-- Supabase schema for 九零食刻 90 PROJECT
-- Run this in the Supabase SQL editor after creating the project.

create extension if not exists pgcrypto;

create or replace function public.set_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

create table if not exists public.profiles (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null unique references auth.users(id) on delete cascade,
  full_name text,
  phone text,
  address text,
  city text,
  role text not null default 'member' check (role in ('member', 'admin', 'super_admin')),
  status text not null default 'active' check (status in ('active', 'inactive')),
  referral_code text,
  referred_by_code text,
  notes text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

alter table public.profiles add column if not exists referral_code text;
alter table public.profiles add column if not exists referred_by_code text;
alter table public.profiles add column if not exists member_tier text not null default 'Classic';
alter table public.profiles add column if not exists default_area text;
alter table public.profiles add column if not exists default_package text;
alter table public.profiles add column if not exists taste_preference text;

create table if not exists public.services (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  slug text not null unique,
  description text,
  icon text,
  is_active boolean not null default true,
  sort_order int not null default 0,
  created_at timestamptz not null default now()
);

create table if not exists public.packages (
  id uuid primary key default gen_random_uuid(),
  service_id uuid references public.services(id) on delete set null,
  title text not null,
  price_label text not null,
  description text,
  is_active boolean not null default true,
  sort_order int not null default 0,
  created_at timestamptz not null default now()
);

create table if not exists public.inquiries (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references auth.users(id) on delete set null,
  customer_name text not null,
  phone text not null,
  event_date date,
  event_location text,
  guest_count int,
  service_type text,
  budget text,
  message text,
  status text not null default 'new' check (status in ('new', 'contacted', 'quoted', 'confirmed', 'completed', 'cancelled')),
  admin_notes text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

alter table public.inquiries add column if not exists lead_source text;

create table if not exists public.quotations (
  id uuid primary key default gen_random_uuid(),
  inquiry_id uuid references public.inquiries(id) on delete cascade,
  user_id uuid references auth.users(id) on delete set null,
  quote_number text not null unique,
  amount numeric(12,2),
  description text,
  status text not null default 'draft' check (status in ('draft', 'sent', 'accepted', 'rejected', 'expired')),
  valid_until date,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.bookings (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references auth.users(id) on delete set null,
  inquiry_id uuid references public.inquiries(id) on delete set null,
  quotation_id uuid references public.quotations(id) on delete set null,
  event_date date,
  event_location text,
  guest_count int,
  service_type text,
  status text not null default 'pending' check (status in ('pending', 'confirmed', 'completed', 'cancelled')),
  deposit_amount numeric(12,2),
  total_amount numeric(12,2),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.gallery (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  image_url text not null,
  category text,
  alt_text text,
  is_featured boolean not null default false,
  sort_order int not null default 0,
  created_at timestamptz not null default now()
);

create table if not exists public.faqs (
  id uuid primary key default gen_random_uuid(),
  question text not null,
  answer text not null,
  is_active boolean not null default true,
  sort_order int not null default 0,
  created_at timestamptz not null default now()
);

create table if not exists public.site_settings (
  id uuid primary key default gen_random_uuid(),
  key text not null unique,
  value text,
  updated_at timestamptz not null default now()
);

create table if not exists public.referral_rewards (
  id uuid primary key default gen_random_uuid(),
  referrer_user_id uuid not null references auth.users(id) on delete cascade,
  referred_user_id uuid references auth.users(id) on delete set null,
  inquiry_id uuid references public.inquiries(id) on delete set null,
  referred_name text,
  referred_phone text,
  package_label text,
  level int not null default 1 check (level between 1 and 10),
  fixed_credit numeric(12,2) not null default 0,
  rate_percent numeric(5,2) not null default 0,
  estimated_amount numeric(12,2),
  status text not null default 'pending' check (status in ('pending', 'approved', 'redeemed', 'cancelled')),
  source text not null default 'website',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.conversion_events (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references auth.users(id) on delete set null,
  event_type text not null default 'whatsapp_click',
  lead_source text,
  label text,
  page_path text,
  metadata jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now()
);

create index if not exists profiles_user_id_idx on public.profiles(user_id);
create unique index if not exists profiles_referral_code_uidx on public.profiles(referral_code) where referral_code is not null;
create index if not exists profiles_referred_by_code_idx on public.profiles(referred_by_code);
create index if not exists inquiries_user_id_idx on public.inquiries(user_id);
create index if not exists inquiries_status_idx on public.inquiries(status);
create index if not exists quotations_user_id_idx on public.quotations(user_id);
create index if not exists bookings_user_id_idx on public.bookings(user_id);
create index if not exists referral_rewards_referrer_idx on public.referral_rewards(referrer_user_id);
create index if not exists referral_rewards_inquiry_idx on public.referral_rewards(inquiry_id);
create index if not exists referral_rewards_status_idx on public.referral_rewards(status);
create unique index if not exists referral_rewards_unique_chain_idx on public.referral_rewards(inquiry_id, referrer_user_id, level) where inquiry_id is not null;
create index if not exists conversion_events_source_idx on public.conversion_events(lead_source);
create index if not exists conversion_events_created_at_idx on public.conversion_events(created_at desc);

create or replace trigger profiles_updated_at before update on public.profiles for each row execute function public.set_updated_at();
create or replace trigger inquiries_updated_at before update on public.inquiries for each row execute function public.set_updated_at();
create or replace trigger quotations_updated_at before update on public.quotations for each row execute function public.set_updated_at();
create or replace trigger bookings_updated_at before update on public.bookings for each row execute function public.set_updated_at();
create or replace trigger site_settings_updated_at before update on public.site_settings for each row execute function public.set_updated_at();
create or replace trigger referral_rewards_updated_at before update on public.referral_rewards for each row execute function public.set_updated_at();

create or replace function public.current_user_role()
returns text
language sql
stable
security definer
set search_path = public
as $$
  select coalesce((select role from public.profiles where user_id = auth.uid()), 'guest');
$$;

create or replace function public.is_admin()
returns boolean
language sql
stable
security definer
set search_path = public
as $$
  select public.current_user_role() in ('admin', 'super_admin');
$$;

create or replace function public.is_super_admin()
returns boolean
language sql
stable
security definer
set search_path = public
as $$
  select public.current_user_role() = 'super_admin';
$$;

create or replace function public.protect_profile_role_changes()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
begin
  if new.role is distinct from old.role then
    if not public.is_super_admin() then
      raise exception 'Only super_admin can change roles';
    end if;
  end if;

  if old.role in ('admin', 'super_admin') and not public.is_super_admin() then
    raise exception 'Only super_admin can manage admin profiles';
  end if;

  return new;
end;
$$;

create or replace trigger protect_profile_role_changes
before update on public.profiles
for each row execute function public.protect_profile_role_changes();

create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
begin
  insert into public.profiles (user_id, full_name, phone, role, status, referral_code, referred_by_code)
  values (
    new.id,
    coalesce(new.raw_user_meta_data->>'full_name', ''),
    coalesce(new.raw_user_meta_data->>'phone', ''),
    'member',
    'active',
    coalesce(
      nullif(upper(new.raw_user_meta_data->>'referral_code'), ''),
      upper('NP90-' || substr(replace(new.id::text, '-', ''), 1, 8))
    ),
    nullif(upper(new.raw_user_meta_data->>'referred_by_code'), '')
  )
  on conflict (user_id) do nothing;
  return new;
end;
$$;

drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
after insert on auth.users
for each row execute function public.handle_new_user();

update public.profiles
set referral_code = upper('NP90-' || substr(replace(user_id::text, '-', ''), 1, 8))
where referral_code is null or referral_code = '';

create or replace function public.create_referral_rewards_for_inquiry(
  p_inquiry_id uuid,
  p_referral_code text
)
returns void
language plpgsql
security definer
set search_path = public
as $$
declare
  v_inquiry public.inquiries%rowtype;
  v_referrer public.profiles%rowtype;
  v_current_code text := nullif(upper(trim(p_referral_code)), '');
  v_rates numeric[] := array[1.00, 0.50, 0.30, 0.20, 0.10];
  v_level int := 1;
  v_visited uuid[] := array[]::uuid[];
begin
  if v_current_code is null then
    return;
  end if;

  select *
  into v_inquiry
  from public.inquiries
  where id = p_inquiry_id
    and (user_id = auth.uid() or public.is_admin());

  if not found then
    return;
  end if;

  while v_level <= array_length(v_rates, 1) loop
    select *
    into v_referrer
    from public.profiles
    where referral_code = v_current_code
      and status = 'active'
    limit 1;

    if not found then
      exit;
    end if;

    if v_referrer.user_id = auth.uid() or v_referrer.user_id = any(v_visited) then
      exit;
    end if;

    v_visited := array_append(v_visited, v_referrer.user_id);

    insert into public.referral_rewards (
      referrer_user_id,
      referred_user_id,
      inquiry_id,
      referred_name,
      referred_phone,
      package_label,
      level,
      fixed_credit,
      rate_percent,
      status,
      source
    )
    values (
      v_referrer.user_id,
      v_inquiry.user_id,
      v_inquiry.id,
      v_inquiry.customer_name,
      v_inquiry.phone,
      v_inquiry.service_type,
      v_level,
      case when v_level = 1 then 20 else 0 end,
      v_rates[v_level],
      'pending',
      'website_order'
    )
    on conflict do nothing;

    v_current_code := nullif(upper(trim(v_referrer.referred_by_code)), '');
    if v_current_code is null then
      exit;
    end if;

    v_level := v_level + 1;
  end loop;
end;
$$;

grant execute on function public.create_referral_rewards_for_inquiry(uuid, text) to authenticated;

alter table public.profiles enable row level security;
alter table public.services enable row level security;
alter table public.packages enable row level security;
alter table public.inquiries enable row level security;
alter table public.quotations enable row level security;
alter table public.bookings enable row level security;
alter table public.gallery enable row level security;
alter table public.faqs enable row level security;
alter table public.site_settings enable row level security;
alter table public.referral_rewards enable row level security;
alter table public.conversion_events enable row level security;

-- Drop policies before recreating them so this file can be rerun during setup.
drop policy if exists "profiles select own or admin" on public.profiles;
drop policy if exists "profiles insert own" on public.profiles;
drop policy if exists "profiles update own" on public.profiles;
drop policy if exists "profiles admin all" on public.profiles;
drop policy if exists "services public active read" on public.services;
drop policy if exists "services admin all" on public.services;
drop policy if exists "packages public active read" on public.packages;
drop policy if exists "packages admin all" on public.packages;
drop policy if exists "gallery public read" on public.gallery;
drop policy if exists "gallery admin all" on public.gallery;
drop policy if exists "faqs public active read" on public.faqs;
drop policy if exists "faqs admin all" on public.faqs;
drop policy if exists "site settings public read" on public.site_settings;
drop policy if exists "site settings admin all" on public.site_settings;
drop policy if exists "referral rewards select own or admin" on public.referral_rewards;
drop policy if exists "referral rewards admin all" on public.referral_rewards;
drop policy if exists "conversion events public insert" on public.conversion_events;
drop policy if exists "conversion events admin read" on public.conversion_events;
drop policy if exists "conversion events admin all" on public.conversion_events;
drop policy if exists "inquiries insert public or own" on public.inquiries;
drop policy if exists "inquiries select own or admin" on public.inquiries;
drop policy if exists "inquiries admin all" on public.inquiries;
drop policy if exists "quotations select own or admin" on public.quotations;
drop policy if exists "quotations admin all" on public.quotations;
drop policy if exists "bookings select own or admin" on public.bookings;
drop policy if exists "bookings admin all" on public.bookings;
drop policy if exists "gallery images public read" on storage.objects;
drop policy if exists "gallery images admin insert" on storage.objects;
drop policy if exists "gallery images admin update" on storage.objects;
drop policy if exists "gallery images admin delete" on storage.objects;
-- Profiles
create policy "profiles select own or admin" on public.profiles for select using (user_id = auth.uid() or public.is_admin());
create policy "profiles insert own" on public.profiles for insert with check (user_id = auth.uid());
create policy "profiles update own" on public.profiles for update using (user_id = auth.uid()) with check (user_id = auth.uid());
create policy "profiles admin all" on public.profiles for all using (public.is_admin()) with check (public.is_admin());

-- Public content
create policy "services public active read" on public.services for select using (is_active = true or public.is_admin());
create policy "services admin all" on public.services for all using (public.is_admin()) with check (public.is_admin());

create policy "packages public active read" on public.packages for select using (is_active = true or public.is_admin());
create policy "packages admin all" on public.packages for all using (public.is_admin()) with check (public.is_admin());

create policy "gallery public read" on public.gallery for select using (true);
create policy "gallery admin all" on public.gallery for all using (public.is_admin()) with check (public.is_admin());

create policy "faqs public active read" on public.faqs for select using (is_active = true or public.is_admin());
create policy "faqs admin all" on public.faqs for all using (public.is_admin()) with check (public.is_admin());

create policy "site settings public read" on public.site_settings for select using (true);
create policy "site settings admin all" on public.site_settings for all using (public.is_admin()) with check (public.is_admin());

-- Referral rewards
create policy "referral rewards select own or admin" on public.referral_rewards for select using (referrer_user_id = auth.uid() or public.is_admin());
create policy "referral rewards admin all" on public.referral_rewards for all using (public.is_admin()) with check (public.is_admin());

-- Conversion events
create policy "conversion events public insert" on public.conversion_events for insert with check (true);
create policy "conversion events admin read" on public.conversion_events for select using (public.is_admin());
create policy "conversion events admin all" on public.conversion_events for all using (public.is_admin()) with check (public.is_admin());

-- Inquiries
create policy "inquiries insert public or own" on public.inquiries for insert with check (user_id is null or user_id = auth.uid() or public.is_admin());
create policy "inquiries select own or admin" on public.inquiries for select using (user_id = auth.uid() or public.is_admin());
create policy "inquiries admin all" on public.inquiries for all using (public.is_admin()) with check (public.is_admin());

-- Quotations
create policy "quotations select own or admin" on public.quotations for select using (user_id = auth.uid() or public.is_admin());
create policy "quotations admin all" on public.quotations for all using (public.is_admin()) with check (public.is_admin());

-- Bookings
create policy "bookings select own or admin" on public.bookings for select using (user_id = auth.uid() or public.is_admin());
create policy "bookings admin all" on public.bookings for all using (public.is_admin()) with check (public.is_admin());

-- Supabase Storage for gallery images
insert into storage.buckets (id, name, public)
values ('gallery', 'gallery', true)
on conflict (id) do nothing;

create policy "gallery images public read" on storage.objects for select using (bucket_id = 'gallery');
create policy "gallery images admin insert" on storage.objects for insert with check (bucket_id = 'gallery' and public.is_admin());
create policy "gallery images admin update" on storage.objects for update using (bucket_id = 'gallery' and public.is_admin()) with check (bucket_id = 'gallery' and public.is_admin());
create policy "gallery images admin delete" on storage.objects for delete using (bucket_id = 'gallery' and public.is_admin());

-- Seed services
insert into public.services (title, slug, description, icon, sort_order)
values
  ('每日包伙食', 'daily-meal', '适合长期固定餐饮安排，可根据人数、餐数、地点与菜单调整。', '餐', 1),
  ('活动餐饮 Catering', 'event-catering', '适合公司活动、生日派对、开张仪式、婚礼与私人聚会。', '宴', 2),
  ('场地布置 Event Styling', 'event-styling', '餐桌摆设、背景布置与活动风格设计。', '布', 3),
  ('鸡尾酒 / Mocktail Bar', 'mocktail-bar', '适合派对、晚宴、开张和品牌活动的饮料吧服务。', '饮', 4)
on conflict (slug) do update set
  title = excluded.title,
  description = excluded.description,
  icon = excluded.icon,
  sort_order = excluded.sort_order;

insert into public.packages (service_id, title, price_label, description, sort_order)
values
  ((select id from public.services where slug = 'daily-meal'), '包伙食配套', 'RM300 起 / 月', '适合长期固定餐饮安排。实际价格根据人数、餐数、地点与菜单调整。', 1),
  ((select id from public.services where slug = 'event-catering'), '活动餐饮报价', '根据人数、菜单、地点与服务内容报价', 'WhatsApp 提供日期、人数、地点，即可获取初步报价。', 2),
  ((select id from public.services where slug = 'event-styling'), '场地布置配套', '根据主题与规模报价', '适合生日、开张、婚礼、公司活动与私人聚会。', 3),
  ((select id from public.services where slug = 'mocktail-bar'), 'Mocktail / Cocktail Bar', '根据人数与饮料选择报价', '适合需要现场饮料吧、派对氛围或品牌活动体验的客户。', 4)
on conflict do nothing;

insert into public.faqs (question, answer, sort_order)
values
  ('活动餐饮需要提前多久预订？', '建议提前 3-7 天联系，特殊大型活动建议更早安排。', 1),
  ('可以根据预算安排菜单吗？', '可以，我们可以根据人数、预算和活动类型建议合适菜单。', 2),
  ('有提供场地布置吗？', '有，可搭配餐饮、餐桌摆设、背景布置和活动风格设计。', 3),
  ('如何获得报价？', 'WhatsApp 提供日期、地点、人数和服务需求，我们会给你初步报价。', 4)
on conflict do nothing;

insert into public.site_settings (key, value)
values
  ('brand_name', '九零食刻 90 PROJECT'),
  ('whatsapp_number', '60189490909'),
  ('whatsapp_display', '018-949 0909')
on conflict (key) do update set value = excluded.value, updated_at = now();

