# The Meme Engine

This project was built with [Lovable](https://lovable.dev).

## Creator application setup

The app uses TanStack Start, React, Tailwind v4 and Lovable Cloud. Cloud manages account, database and runtime credentials. Do not add private keys to browser code.

- `/`: creator-access landing page with original generated content previews.
- `/apply`: four-step application; signed-in drafts persist in Cloud.
- `/auth` and `/reset-password`: email/password and managed Google access, email confirmation and recovery.
- `/status`: signed-in applicant status.
- `/preview`: public, explicitly labeled sample workspace and pending/approved states; no real approval mutations.
- `/engine`: authenticated workspace, displaying real account data only when approved.
- `/admin`: authenticated administrator review inbox with server-validated authorization.

### Database and administration

Applied schema lives in `drizzle/migrations`. Profiles are auto-created on signup. Applications are limited to one per authenticated account (a durable submission cap); a transaction creates an administrator notification inbox entry. Owners can read their records; only authorized administrators can change approval status. No public application reads are granted.

To authorize a reviewer, first create and confirm their real account, then have an authorized Cloud operator add its UUID with `role = 'admin'` to `public.user_roles`. Never derive administrator permissions from editable profile data. No administrator account has been invented or granted access.

### Environment and OAuth

Lovable provisions `VITE_SUPABASE_URL`, `VITE_SUPABASE_PUBLISHABLE_KEY`, `VITE_SUPABASE_PROJECT_ID` for browser configuration and server-only Cloud environment variables. Email and Google sign-in are enabled; email confirmation remains enabled. Do not change generated integration files or expose server credentials.

X account connection is **not configured**: the visible control reports this honestly and offers email instead. For future per-user X access, link an X App User Connector with offline access, use its gateway callback `https://connector-gateway.lovable.dev/api/v1/app-users/oauth2/callback`, and encrypt per-user connection handles on the server. Never fake a connected X account.

### Before public launch

- Supply the official X and Telegram community URLs; no destinations have been invented.
- Finalize draft legal terms, operator identity, retention period, and privacy contact.
- Provide an administrator account to activate reviewer access.
- Configure an external email notification recipient/service if email alerts are wanted; current notifications are durable review-inbox entries, not sent emails.
- Content-generation services and live analytics are not connected. The demo workspace is illustrative; real workspaces show empty content and metrics.
- Publish using Lovable’s Publish action after reviewing these requirements. This app is not yet published.

### Validation

Run `bunx vitest run` for schema and route tests. Desktop/mobile browser checks cover the landing page, X fallback, application-state switching, workspace navigation and signed-out access rejection. Email confirmation and external Google round-trips require a real account; do not claim those end-to-end checks from configuration alone.

## Build with Lovable

Open your project in the [Lovable editor](https://lovable.dev) and keep building.

- **Ship faster**: describe what you want to build and Lovable handles the code.
- **Stay in sync**: connect the project to GitHub and every change made in Lovable is committed straight to your repository.
- **Full ownership**: this code is yours. Push to your repository and your changes sync back into Lovable, ready for your next prompt.

## Development

Prefer working locally? You need Node.js and npm — [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating).

```sh
git clone <this-repository-url>
cd <repository-name>
npm i
npm run dev
```

## Built with

- TanStack Start
- TypeScript
- React
- Tailwind CSS
