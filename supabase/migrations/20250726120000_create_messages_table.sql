/*
# [Create Messages Table]
This migration creates a `messages` table to store chat history for the CineBuddy application. It includes columns for the message content, the sender (user or AI), and timestamps.

## Query Description: [This operation creates a new table named `messages` for storing chat conversations. It is a non-destructive operation and will not affect any existing data as the table is new. Row Level Security (RLS) is enabled to prepare for future multi-user support, with initial policies allowing public read and insert access.]

## Metadata:
- Schema-Category: "Structural"
- Impact-Level: "Low"
- Requires-Backup: false
- Reversible: true

## Structure Details:
- Table: `public.messages`
- Columns: `id` (uuid, pk), `created_at` (timestamptz), `text` (text), `sender` (text)

## Security Implications:
- RLS Status: Enabled
- Policy Changes: Yes
- Auth Requirements: None for initial policies (public access)

## Performance Impact:
- Indexes: A primary key index is added on the `id` column.
- Triggers: None
- Estimated Impact: Low, as this is a new table with basic indexing.
*/

-- Create the messages table
create table public.messages (
  id uuid not null default gen_random_uuid() primary key,
  created_at timestamp with time zone not null default now(),
  text text not null,
  sender text not null check (sender in ('user', 'ai'))
);

-- Add comments to the table and columns
comment on table public.messages is 'Stores chat messages for the CineBuddy application.';
comment on column public.messages.id is 'Unique identifier for the message.';
comment on column public.messages.created_at is 'Timestamp of when the message was created.';
comment on column public.messages.text is 'The content of the message.';
comment on column public.messages.sender is 'Indicates if the message is from the ''user'' or the ''ai''.';

-- Enable Row Level Security
alter table public.messages enable row level security;

-- Create policies for RLS
-- 1. Allow public read access to all messages
create policy "Allow public read access" on public.messages
  for select using (true);

-- 2. Allow public insert access
create policy "Allow public insert access" on public.messages
  for insert with check (true);
