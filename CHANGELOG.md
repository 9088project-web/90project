# Changelog

## 0.1.2

- Organized the project into one final static website entry and archived old static/Next.js work under `archive/`.
- Added editable admin media settings for styling case images and homepage video ad space.
- Added WhatsApp conversion source tracking for header, hero, package cards, catering calculator, styling, referral and footer CTAs.
- Added Supabase-ready fields for member preferences, inquiry lead source and `conversion_events`.
- Expanded referral reward terms with clearer multi-level, next-service credit and non-cash redemption rules.
- Optimized uploaded styling/case PNG artwork into WebP and AVIF assets and switched the website to WebP defaults.
- Added `vercel.json` and static build scripts so Vercel publishes the `public/` output instead of detecting the old Next.js archive.

## 0.1.1

- Upgraded the live static member centre with editable profile fields, member level cards, reward summary, referral link copy and a referral visual-code panel.
- Added admin-side member status, tier and note controls for local member follow-up.
- Synced admin inquiry status changes back to member inquiry records so members can see follow-up progress.

## 0.1.0

- Created a complete Next.js App Router project for 九零食刻 90 PROJECT.
- Added public website pages for Home, Services, Packages, Gallery, FAQ, and Contact.
- Added Supabase Auth registration and login flows.
- Added member dashboard, profile, inquiries, bookings, and quotations pages.
- Added admin dashboard and management pages for members, inquiries, bookings, quotations, services, packages, gallery, FAQ, and settings.
- Added WhatsApp helper functions for public leads and admin customer follow-up.
- Added Supabase schema with tables, indexes, triggers, RLS policies, storage bucket policies, and seed data.
- Added premium black-gold Tailwind theme and responsive layouts.
- Reused local placeholder images under `public/images/`.
