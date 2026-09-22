-- Solar package catalog for the /admin dashboard.
-- Run once against the Neon DATABASE_URL before seeding:
--   psql "$DATABASE_URL" -f db/schema.sql

create table if not exists packages (
  id               serial primary key,
  title            text not null,
  tag              text,
  tag2             text,
  tag_color        text,
  image_url        text not null,
  features         text[] not null default '{}',
  price_cents      integer not null,
  old_price_cents  integer,
  categories       text[] not null default '{}',
  sort_order       integer not null default 0,
  is_active        boolean not null default true,
  created_at       timestamptz not null default now(),
  updated_at       timestamptz not null default now()
);

create index if not exists packages_active_sort_idx on packages (is_active, sort_order);
