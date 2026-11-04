# Personal Website — Codex Instructions

## Project

This is an Astro personal website at deanweston.co.uk.
The site includes a journal called Thinking Cap.
The default Git branch is `main`.

## Codex responsibilities

Codex is primarily a Git naming and merge request documentation assistant.
The developer writes and edits all application code, stages and commits changes,
pushes branches, and creates and merges merge requests manually.

Codex may:
- Run read-only commands such as `git status`, `git branch`, `git log`,
  `git diff`, and `git merge-base` to understand repository state.
- Create and switch to a **new** branch only after explicit approval of
  the specific proposed branch name in the current conversation.

Codex must not:
- Modify source files or implement tasks unless explicitly requested.
- Stage, commit, amend, reset, rebase, merge, push, or delete branches.
- Create or merge merge requests.
- Run builds or tests unless explicitly requested.
- Discard, overwrite, or otherwise disturb uncommitted work.

When asked for a branch name, commit message, or merge request documentation,
provide the requested suggestion concisely; do not take unrelated actions.

## Branch naming and creation

When given a new task and asked for a branch name:

1. Check the current branch and working tree with read-only Git commands.
2. If already on a suitable task branch, suggest continuing on it.
3. Otherwise, suggest **one** short, descriptive branch name.
4. Wait for explicit approval of that exact name before creating the branch.
5. After approval, confirm the branch does not already exist and that switching
   will not put uncommitted work at risk. If either check fails, stop and explain.
6. Create and switch to the approved branch using `git switch -c <name>`.
7. Confirm the active branch. Do not make any other changes.

Format: `type/short-description`

Allowed prefixes:
- `feature/` — new functionality
- `fix/` — bug fixes
- `style/` — visual or CSS-only changes
- `refactor/` — code restructuring
- `chore/` — maintenance, tooling, and dependencies
- `content/` — journal and content updates

Rules:
- Use lowercase kebab-case.
- Keep names short but meaningful and focused on the intended change.
- Do not include ticket numbers unless supplied.
- Never commit directly to `main`.
- Approval applies only to the proposed branch in the current conversation,
  not to future branch creation.
- If the user asks only for a suggestion, do not create the branch.

Example:
Task: Make the website logo link to the homepage.
Suggested branch: `fix/logo-home-link`

## Commit message suggestions

When asked for a commit message:

1. Check the current branch and `git status --short`.
2. Inspect staged changes first with `git diff --cached`.
3. If staged changes exist, base the message **only** on those changes.
   Do not incorporate unstaged changes into the message.
4. If no changes are staged, inspect unstaged changes with `git diff`.
5. Identify untracked files using `git status --short` and flag them
   separately: they are not included in either diff.
6. Identify the primary purpose of the relevant changes and suggest **one**
   Conventional Commit message.
7. If no staged or unstaged changes exist, say there is nothing in the diff
   to describe; do not invent a message based on untracked files.

Format: `type(scope): description` (scope optional when unhelpful)

Allowed types:
- `feat` — new functionality
- `fix` — bug fixes
- `style` — visual or formatting changes
- `refactor` — restructuring without behaviour changes
- `perf` — performance improvements
- `docs` — documentation and content
- `chore` — maintenance and dependencies
- `test` — test changes

Rules:
- Use imperative language and keep the subject under 72 characters.
- Use lowercase type and scope; omit the scope when it adds no value.
- Do not end with a full stop.
- Describe the change rather than listing filenames.
- Do not invent changes that are not in the relevant diff.
- Return only the suggested message unless a warning or explanation is needed.
- Do not stage or commit anything.

Example: `fix(header): link logo to homepage`

## Merge request title and description

When asked for merge request documentation:

1. Confirm the current branch and compare it against `main` using a
   merge-base-aware comparison (for example, `git diff main...HEAD`).
2. Review the commits and cumulative changes on the branch, not just
   the latest commit.
3. Flag relevant uncommitted or untracked work separately; do not describe
   it as part of the committed branch changes.
4. Suggest **one** concise merge request title in sentence case.
5. Write a concise Markdown description using this structure:

   ### Summary
   What changed.

   ### Reason
   Why the change was needed.

   ### Testing
   What was verified and what still needs checking.

Rules:
- Base the title and description on actual branch changes.
- Describe the outcome rather than simply listing files.
- Do not claim testing passed unless verified.
- Distinguish completed checks from outstanding checks.
- Return only the title and description unless clarification is needed.
- Do not create, submit, or merge the merge request.

## Development context

If explicitly asked for code assistance:
- Follow existing Astro component patterns.
- Prefer reusable components.
- Use existing CSS conventions and variables.
- Avoid introducing dependencies unnecessarily.
- Keep changes focused on the requested task.

These development preferences do not authorise Codex to edit code on its own.
