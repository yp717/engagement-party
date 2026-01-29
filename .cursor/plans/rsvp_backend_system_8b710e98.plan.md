---
name: RSVP Backend System
overview: Set up a Neon PostgreSQL database with Resend email integration to handle RSVPs for households via unique links, with name lookup as fallback.
todos:
  - id: setup-neon
    content: Set up Neon database via Vercel integration and configure env vars
    status: completed
  - id: setup-drizzle
    content: Install dependencies and create Drizzle schema + connection
    status: completed
  - id: create-api-routes
    content: "Create API routes: /api/rsvp/[token], /api/rsvp/lookup"
    status: completed
  - id: create-rsvp-page
    content: Build /rsvp page with form for household members
    status: completed
  - id: setup-resend
    content: Set up Resend and create email templates
    status: completed
  - id: create-email-routes
    content: Create API routes for sending invites and updates
    status: completed
  - id: create-seed-script
    content: Create seed script to import src/data/raw_guest_list.csv, grouping guests by email into households
    status: completed
  - id: update-rsvp-component
    content: Update RSVP component to link to new /rsvp page
    status: completed
isProject: false
---

# RSVP Backend System with Email Integration

## Architecture Overview

```mermaid
flowchart TD
    subgraph frontend [Frontend]
        RSVPPage["/rsvp page"]
        RSVPForm["RSVP Form Component"]
    end
    
    subgraph api [API Routes]
        ValidateToken["GET /api/rsvp/[token]"]
        SubmitRSVP["POST /api/rsvp/[token]"]
        NameLookup["GET /api/rsvp/lookup"]
        SendInvites["POST /api/email/send-invites"]
        SendUpdate["POST /api/email/send-update"]
    end
    
    subgraph external [External Services]
        Neon["Neon PostgreSQL"]
        Resend["Resend Email"]
    end
    
    RSVPPage -->|"?token=xxx"| ValidateToken
    RSVPPage -->|"fallback"| NameLookup
    RSVPForm --> SubmitRSVP
    ValidateToken --> Neon
    SubmitRSVP --> Neon
    NameLookup --> Neon
    SendInvites --> Neon
    SendInvites --> Resend
    SendUpdate --> Neon
    SendUpdate --> Resend
```



## Database Schema

Two tables in Neon PostgreSQL:

**households**

- `id` (uuid, primary key)
- `email` (text, unique, **nullable**) - shared email for the household (some guests don't have emails yet)
- `unique_token` (text, unique) - for RSVP links
- `invite_status` (text) - "Yes", "Maybe", "Yes - Unlikely to Come" for batch invite management
- `invite_sent_at` (timestamp, nullable)
- `last_update_sent_at` (timestamp, nullable)
- `created_at` (timestamp)

**guests**

- `id` (uuid, primary key)
- `household_id` (uuid, foreign key)
- `first_name` (text)
- `last_name` (text)
- `invited_by` (text) - "Bride" or "Groom"
- `role` (text) - "B&G", "Family", "Extended Family", "Family Friend", "Friend", "Work"
- `is_attending` (boolean, nullable) - null until RSVP submitted
- `dietary_requirements` (text, nullable)
- `notes` (text, nullable) - admin notes from spreadsheet
- `rsvp_completed_at` (timestamp, nullable)

**Note**: Households are grouped by shared email address. ~30 guests currently have no email - they can still RSVP via name lookup but won't receive email invitations until their email is added.

## Tech Stack

- **Database**: Neon PostgreSQL via `@neondatabase/serverless`
- **ORM**: Drizzle ORM (lightweight, type-safe, works great with Neon)
- **Email**: Resend with React email templates
- **Auth for admin endpoints**: Simple API key check (env var)

## Implementation Files

### New files to create:

- `[src/db/schema.ts](src/db/schema.ts)` - Drizzle schema definitions
- `[src/db/index.ts](src/db/index.ts)` - Database connection setup
- `[src/app/api/rsvp/[token]/route.ts](src/app/api/rsvp/[token]/route.ts)` - GET (validate) + POST (submit)
- `[src/app/api/rsvp/lookup/route.ts](src/app/api/rsvp/lookup/route.ts)` - Name lookup fallback
- `[src/app/api/email/send-invites/route.ts](src/app/api/email/send-invites/route.ts)` - Batch send invites
- `[src/app/api/email/send-update/route.ts](src/app/api/email/send-update/route.ts)` - Send updates
- `[src/emails/invitation.tsx](src/emails/invitation.tsx)` - Invitation email template
- `[src/emails/update.tsx](src/emails/update.tsx)` - Update email template
- `[src/app/rsvp/page.tsx](src/app/rsvp/page.tsx)` - RSVP page with form
- `[scripts/seed.ts](scripts/seed.ts)` - Script to import CSV data into database

### Files to modify:

- `[src/app/components/RSVP.tsx](src/app/components/RSVP.tsx)` - Update link to point to `/rsvp`
- `[package.json](package.json)` - Add dependencies

## RSVP Flow

1. Guest receives email with unique link: `yoursite.com/rsvp?token=abc123`
2. Page validates token, fetches household + all guests
3. Form displays all guest names with:
  - Attendance toggle (Yes/No) per guest
  - Dietary requirements text field per guest
4. Submit saves responses for all household members
5. **Fallback**: If no token or invalid, show name lookup form (searches by first + last name, returns household token if found)

## Email Flow

1. Admin calls `POST /api/email/send-invites` with API key and optional `invite_status` filter
2. System fetches households where:
  - `email` is not null (can't send to guests without email)
  - `invite_sent_at` is null (haven't sent yet)
  - `invite_status` matches filter (e.g., "Yes" for first batch, "Maybe" for second batch)
3. For each household: send email via Resend, update `invite_sent_at`
4. Updates work similarly via `POST /api/email/send-update`

**Batching strategy**: Use `invite_status` to control invitation waves:

- First batch: `invite_status = "Yes"` (priority guests)
- Second batch: `invite_status = "Maybe"` (if space available)
- Third batch: `invite_status = "Yes - Unlikely to Come"` (if needed)

## Data Import

The seed script will import data from `[src/data/raw_guest_list.csv](src/data/raw_guest_list.csv)`:

- Group guests into households by shared email address
- Guests without email get their own "household" (can RSVP via name lookup)
- Generate unique tokens for each household
- Preserve all metadata: `invited_by`, `role`, `invite_status`, `notes`

**Data cleanup needed**: One email has a typo (`nehirekopuz@hotmail .com` has a space) - the seed script will handle trimming.

## Environment Variables Needed

```
DATABASE_URL=          # From Neon dashboard
RESEND_API_KEY=        # From Resend dashboard
ADMIN_API_KEY=         # Generate a random string for protecting email endpoints
NEXT_PUBLIC_BASE_URL=  # Your site URL for email links

```

Please note: I have already pulled all the environment variables for NEON locally to the project

## Dependencies to Install

```bash
npm install @neondatabase/serverless drizzle-orm resend react-email @react-email/components
npm install -D drizzle-kit
```

