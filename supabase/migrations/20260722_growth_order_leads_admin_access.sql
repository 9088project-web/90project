drop policy if exists growth_order_leads_admin_select on public.growth_order_leads;
create policy growth_order_leads_admin_select
  on public.growth_order_leads
  for select
  to authenticated
  using (
    exists (
      select 1
      from public.profiles
      where profiles.user_id = auth.uid()
        and profiles.status <> 'inactive'
        and profiles.role in ('admin', 'super_admin')
    )
  );
