-- 90 PROJECT: three-generation referral commission support.
-- Gen 1 = 3%, Gen 2 = 1%, Gen 3 = 1%. Rewards are tied to completed real orders only.

alter table public.growth_commission_rules
  add column if not exists generation smallint check (generation between 1 and 3);

alter table public.growth_commission_ledgers
  drop constraint if exists growth_commission_ledgers_order_id_key;

alter table public.growth_commission_ledgers
  add column if not exists generation smallint not null default 1 check (generation between 1 and 3),
  add column if not exists referral_relation_id uuid references public.growth_referral_relations(id) on delete set null;

create unique index if not exists growth_commission_ledgers_order_promoter_generation_key
  on public.growth_commission_ledgers(order_id, promoter_id, generation);

insert into public.growth_commission_rules (name, service_type, commission_type, commission_value, generation, active)
values
  ('{"zh":"第一代推荐佣金","en":"Generation 1 referral commission"}'::jsonb, '*', 'percent', 3, 1, true),
  ('{"zh":"第二代推荐佣金","en":"Generation 2 referral commission"}'::jsonb, '*', 'percent', 1, 2, true),
  ('{"zh":"第三代推荐佣金","en":"Generation 3 referral commission"}'::jsonb, '*', 'percent', 1, 3, true)
on conflict do nothing;

comment on column public.growth_commission_ledgers.generation is 'Referral generation for commission payout: 1=direct 3%, 2=upstream 1%, 3=upstream 1%.';
