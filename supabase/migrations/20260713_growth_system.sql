-- 90 PROJECT growth system, phase 1 foundation.
-- Local-first note: this migration is prepared for review only. It is not executed by the local Mock UI.
-- Money uses numeric(12,2); referral_relations is deliberately one level only.

create extension if not exists pgcrypto;

create table if not exists public.growth_member_levels (
  id uuid primary key default gen_random_uuid(),
  code text not null unique,
  name jsonb not null default '{}'::jsonb,
  spend_threshold numeric(12,2) not null default 0 check (spend_threshold >= 0),
  order_threshold integer not null default 0 check (order_threshold >= 0),
  discount_percent numeric(5,2) not null default 0 check (discount_percent between 0 and 100),
  points_multiplier numeric(8,3) not null default 1 check (points_multiplier >= 0),
  active boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.growth_member_level_rules (
  id uuid primary key default gen_random_uuid(),
  level_id uuid not null references public.growth_member_levels(id) on delete cascade,
  rule_type text not null check (rule_type in ('points', 'coupon', 'discount', 'access')),
  rule_value jsonb not null default '{}'::jsonb,
  active boolean not null default true,
  created_at timestamptz not null default now()
);

create table if not exists public.growth_points_ledgers (
  id uuid primary key default gen_random_uuid(),
  member_id uuid not null references auth.users(id) on delete cascade,
  transaction_type text not null check (transaction_type in ('registration', 'order_completed', 'campaign', 'manual_adjustment', 'refund_reversal', 'coupon_redeem', 'expiry')),
  points integer not null,
  balance_before integer not null default 0,
  balance_after integer not null default 0,
  related_order_id uuid,
  related_campaign_id uuid,
  reason text not null default '',
  created_by uuid references auth.users(id) on delete set null,
  created_at timestamptz not null default now()
);

create table if not exists public.growth_coupon_templates (
  id uuid primary key default gen_random_uuid(),
  code text not null unique,
  name jsonb not null default '{}'::jsonb,
  discount_type text not null check (discount_type in ('fixed', 'percent', 'free_delivery')),
  discount_value numeric(12,2) not null default 0 check (discount_value >= 0),
  minimum_spend numeric(12,2) not null default 0 check (minimum_spend >= 0),
  service_type text not null default '*',
  starts_at timestamptz,
  expires_at timestamptz,
  usage_limit integer check (usage_limit is null or usage_limit >= 0),
  active boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.growth_member_coupons (
  id uuid primary key default gen_random_uuid(),
  member_id uuid not null references auth.users(id) on delete cascade,
  template_id uuid not null references public.growth_coupon_templates(id),
  code text not null unique,
  status text not null default 'active' check (status in ('active', 'reserved', 'used', 'expired', 'cancelled')),
  issued_at timestamptz not null default now(),
  expires_at timestamptz,
  used_at timestamptz
);

create table if not exists public.growth_coupon_usages (
  id uuid primary key default gen_random_uuid(),
  coupon_id uuid not null references public.growth_member_coupons(id),
  member_id uuid not null references auth.users(id) on delete cascade,
  order_id uuid not null,
  discount_amount numeric(12,2) not null default 0 check (discount_amount >= 0),
  used_at timestamptz not null default now()
);

create table if not exists public.growth_promoter_applications (
  id uuid primary key default gen_random_uuid(),
  member_id uuid not null references auth.users(id) on delete cascade,
  social_platform text not null default '',
  social_account text not null default '',
  region text not null default '',
  promotion_method text not null default '',
  customer_type text not null default '',
  terms_accepted boolean not null default false,
  privacy_accepted boolean not null default false,
  status text not null default 'submitted' check (status in ('submitted', 'under_review', 'approved', 'rejected', 'suspended')),
  rejection_reason text not null default '',
  reviewed_by uuid references auth.users(id) on delete set null,
  reviewed_at timestamptz,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  check (terms_accepted and privacy_accepted)
);

create table if not exists public.growth_promoters (
  id uuid primary key default gen_random_uuid(),
  member_id uuid not null unique references auth.users(id) on delete cascade,
  status text not null default 'pending' check (status in ('pending', 'approved', 'suspended', 'rejected')),
  risk_status text not null default 'clear' check (risk_status in ('clear', 'watch', 'blocked')),
  approved_at timestamptz,
  commission_rule_id uuid,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.growth_referral_campaigns (
  id uuid primary key default gen_random_uuid(),
  name jsonb not null default '{}'::jsonb,
  starts_at timestamptz,
  ends_at timestamptz,
  active boolean not null default true,
  metadata jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now()
);

create table if not exists public.growth_referral_codes (
  id uuid primary key default gen_random_uuid(),
  promoter_id uuid not null references public.growth_promoters(id) on delete cascade,
  code text not null unique,
  campaign_id uuid references public.growth_referral_campaigns(id) on delete set null,
  active boolean not null default true,
  created_at timestamptz not null default now(),
  expires_at timestamptz
);

create table if not exists public.growth_referral_clicks (
  id uuid primary key default gen_random_uuid(),
  referral_code_id uuid not null references public.growth_referral_codes(id) on delete cascade,
  session_id text not null,
  landing_page text not null default '/',
  ip_hash text,
  device_hash text,
  user_agent text,
  campaign_id uuid references public.growth_referral_campaigns(id) on delete set null,
  clicked_at timestamptz not null default now()
);

create table if not exists public.growth_referral_relations (
  id uuid primary key default gen_random_uuid(),
  referred_member_id uuid not null unique references auth.users(id) on delete cascade,
  promoter_id uuid not null references public.growth_promoters(id) on delete restrict,
  referral_code_id uuid not null references public.growth_referral_codes(id) on delete restrict,
  click_id uuid references public.growth_referral_clicks(id) on delete set null,
  depth smallint not null default 1 check (depth = 1),
  status text not null default 'active' check (status in ('active', 'expired', 'blocked', 'reversed')),
  bound_at timestamptz not null default now(),
  bound_by text not null default 'first_valid_visit'
);

create table if not exists public.growth_commission_rules (
  id uuid primary key default gen_random_uuid(),
  name jsonb not null default '{}'::jsonb,
  service_type text not null default '*',
  commission_type text not null default 'percent' check (commission_type in ('percent', 'fixed')),
  commission_value numeric(12,2) not null default 0 check (commission_value >= 0),
  active boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

alter table public.growth_promoters
  drop constraint if exists growth_promoters_commission_rule_id_fkey;
alter table public.growth_promoters
  add constraint growth_promoters_commission_rule_id_fkey
  foreign key (commission_rule_id) references public.growth_commission_rules(id) on delete set null;

create table if not exists public.growth_orders (
  id uuid primary key default gen_random_uuid(),
  member_id uuid not null references auth.users(id) on delete restrict,
  referral_relation_id uuid references public.growth_referral_relations(id) on delete set null,
  service_type text not null default '',
  status text not null default 'new' check (status in ('new', 'quoted', 'confirmed', 'deposit_paid', 'service_completed', 'fully_paid', 'cancelled', 'refunded', 'partially_refunded')),
  subtotal numeric(12,2) not null default 0 check (subtotal >= 0),
  sst_amount numeric(12,2) not null default 0 check (sst_amount >= 0),
  delivery_fee numeric(12,2) not null default 0 check (delivery_fee >= 0),
  extra_labour_fee numeric(12,2) not null default 0 check (extra_labour_fee >= 0),
  third_party_fee numeric(12,2) not null default 0 check (third_party_fee >= 0),
  coupon_discount numeric(12,2) not null default 0 check (coupon_discount >= 0),
  total_amount numeric(12,2) not null default 0 check (total_amount >= 0),
  refunded_amount numeric(12,2) not null default 0 check (refunded_amount >= 0),
  created_at timestamptz not null default now(),
  completed_at timestamptz,
  updated_at timestamptz not null default now()
);

create table if not exists public.growth_order_items (
  id uuid primary key default gen_random_uuid(),
  order_id uuid not null references public.growth_orders(id) on delete cascade,
  category text not null default '',
  item_name text not null default '',
  quantity numeric(10,2) not null default 1 check (quantity > 0),
  unit_price numeric(12,2) not null default 0 check (unit_price >= 0),
  total_price numeric(12,2) not null default 0 check (total_price >= 0)
);

create table if not exists public.growth_payments (
  id uuid primary key default gen_random_uuid(),
  order_id uuid not null references public.growth_orders(id) on delete cascade,
  payment_method text not null default 'mock',
  status text not null default 'pending' check (status in ('pending', 'authorized', 'paid', 'failed', 'refunded')),
  amount numeric(12,2) not null default 0 check (amount >= 0),
  reference_number text,
  paid_at timestamptz,
  created_at timestamptz not null default now()
);

create table if not exists public.growth_refunds (
  id uuid primary key default gen_random_uuid(),
  order_id uuid not null references public.growth_orders(id) on delete cascade,
  payment_id uuid references public.growth_payments(id) on delete set null,
  amount numeric(12,2) not null check (amount > 0),
  reason text not null default '',
  status text not null default 'requested' check (status in ('requested', 'approved', 'processed', 'rejected')),
  processed_by uuid references auth.users(id) on delete set null,
  created_at timestamptz not null default now(),
  processed_at timestamptz
);

create table if not exists public.growth_commission_ledgers (
  id uuid primary key default gen_random_uuid(),
  promoter_id uuid not null references public.growth_promoters(id) on delete restrict,
  member_id uuid not null references auth.users(id) on delete restrict,
  order_id uuid not null unique references public.growth_orders(id) on delete restrict,
  rule_id uuid references public.growth_commission_rules(id) on delete set null,
  eligible_amount numeric(12,2) not null default 0 check (eligible_amount >= 0),
  commission_amount numeric(12,2) not null default 0 check (commission_amount >= 0),
  reversed_amount numeric(12,2) not null default 0 check (reversed_amount >= 0),
  status text not null default 'confirming' check (status in ('pending', 'confirming', 'available', 'frozen', 'paid', 'reversed', 'cancelled')),
  available_at timestamptz,
  reversal_reason text not null default '',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.growth_withdrawal_requests (
  id uuid primary key default gen_random_uuid(),
  promoter_id uuid not null references public.growth_promoters(id) on delete restrict,
  amount numeric(12,2) not null check (amount > 0),
  status text not null default 'submitted' check (status in ('submitted', 'under_review', 'approved', 'processing', 'paid', 'rejected', 'cancelled')),
  bank_name text,
  bank_account_encrypted text,
  account_name text,
  duitnow_type text,
  duitnow_number_encrypted text,
  note text not null default '',
  reviewed_by uuid references auth.users(id) on delete set null,
  reviewed_at timestamptz,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.growth_withdrawal_payments (
  id uuid primary key default gen_random_uuid(),
  withdrawal_request_id uuid not null references public.growth_withdrawal_requests(id) on delete restrict,
  method text not null default 'mock',
  reference_number text,
  proof_url text,
  processed_by uuid references auth.users(id) on delete set null,
  paid_at timestamptz not null default now()
);

create table if not exists public.growth_notifications (
  id uuid primary key default gen_random_uuid(),
  member_id uuid not null references auth.users(id) on delete cascade,
  notification_type text not null default 'system',
  title jsonb not null default '{}'::jsonb,
  body jsonb not null default '{}'::jsonb,
  read_at timestamptz,
  created_at timestamptz not null default now()
);

create table if not exists public.growth_audit_logs (
  id uuid primary key default gen_random_uuid(),
  actor_id uuid references auth.users(id) on delete set null,
  action text not null,
  entity_type text not null,
  entity_id uuid,
  reason text not null default '',
  metadata jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now()
);

create table if not exists public.growth_risk_flags (
  id uuid primary key default gen_random_uuid(),
  member_id uuid references auth.users(id) on delete set null,
  promoter_id uuid references public.growth_promoters(id) on delete set null,
  order_id uuid references public.growth_orders(id) on delete set null,
  risk_type text not null,
  severity text not null default 'medium' check (severity in ('low', 'medium', 'high', 'critical')),
  status text not null default 'open' check (status in ('open', 'reviewing', 'resolved', 'dismissed')),
  reason text not null default '',
  reviewed_by uuid references auth.users(id) on delete set null,
  created_at timestamptz not null default now(),
  resolved_at timestamptz
);

-- RLS is enabled for all growth tables. Member-facing access is intentionally narrow;
-- service-role/admin policies can be added when the real staff API is connected.
do $$
declare
  table_name text;
begin
  foreach table_name in array array[
    'growth_member_levels', 'growth_member_level_rules', 'growth_points_ledgers',
    'growth_coupon_templates', 'growth_member_coupons', 'growth_coupon_usages',
    'growth_promoter_applications', 'growth_promoters', 'growth_referral_campaigns',
    'growth_referral_codes', 'growth_referral_clicks', 'growth_referral_relations',
    'growth_commission_rules', 'growth_orders', 'growth_order_items', 'growth_payments',
    'growth_refunds', 'growth_commission_ledgers', 'growth_withdrawal_requests',
    'growth_withdrawal_payments', 'growth_notifications', 'growth_audit_logs', 'growth_risk_flags'
  ] loop
    execute format('alter table public.%I enable row level security', table_name);
  end loop;
end $$;

drop policy if exists growth_points_member_select on public.growth_points_ledgers;
create policy growth_points_member_select on public.growth_points_ledgers for select to authenticated using (member_id = auth.uid());
drop policy if exists growth_coupons_member_select on public.growth_member_coupons;
create policy growth_coupons_member_select on public.growth_member_coupons for select to authenticated using (member_id = auth.uid());
drop policy if exists growth_orders_member_select on public.growth_orders;
create policy growth_orders_member_select on public.growth_orders for select to authenticated using (member_id = auth.uid());
drop policy if exists growth_notifications_member_select on public.growth_notifications;
create policy growth_notifications_member_select on public.growth_notifications for select to authenticated using (member_id = auth.uid());
drop policy if exists growth_withdrawals_member_select on public.growth_withdrawal_requests;
create policy growth_withdrawals_member_select on public.growth_withdrawal_requests for select to authenticated using (promoter_id in (select id from public.growth_promoters where member_id = auth.uid()));

comment on table public.growth_referral_relations is 'One-level direct referral binding. referred_member_id is unique and depth must equal 1.';
comment on table public.growth_commission_ledgers is 'Commission is created after completed order and becomes available only after refund observation period.';
comment on column public.growth_withdrawal_requests.bank_account_encrypted is 'Store encrypted or tokenized value in production; never expose raw account data to general staff.';
