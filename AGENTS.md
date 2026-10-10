<!-- LOVABLE:BEGIN -->
> [!IMPORTANT]
> This project is connected to [Lovable](https://lovable.dev). Avoid rewriting
> published git history — force pushing, or rebasing/amending/squashing commits
> that are already pushed — as it rewrites history on Lovable's side and the
> user will likely lose their project history.
>
> Commits you push to the connected branch sync back to Lovable and show up in
> the editor, so keep the branch in a working state.
<!-- LOVABLE:END -->

## Application architecture
- Public pages live at top-level route files; private engine and administrator pages live under the authenticated layout so creator records never rely on a preview-state toggle for access.
- Keep public demo workspace data separate from authenticated account data; previews cannot change persisted approval status.
- Validate application submissions with shared Zod schemas and authenticated server functions; database grants and owner/admin policies enforce the same boundary.
- Persist signed-in application drafts in owner-scoped Cloud tables; create notification inbox entries transactionally on submission.
