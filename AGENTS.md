# Personal Website — Codex Instructions

## Project

This is an Astro personal website at deanweston.co.uk.
The site includes a journal called Thinking Cap.

## Git branch workflow

- The default branch is main.
- Never commit directly to main.
- Never create a branch without explicit approval.
- Before proposing a branch, check the current
  branch and working tree.
- Never discard or overwrite uncommitted changes.
- Propose a short, descriptive branch name.
- Wait for approval before creating it.

Branch prefixes:

- feature/ — new functionality
- fix/ — bug fixes
- style/ — visual and CSS changes
- refactor/ — code restructuring
- chore/ — maintenance and dependencies
- content/ — journal and content updates

Use lowercase kebab-case for branch names.

## Commit conventions

Use Conventional Commits:

type(scope): description

Allowed types:
feat, fix, style, refactor, perf, docs, chore

Rules:

- Use imperative language.
- Keep the subject under 72 characters.
- Use a scope when helpful.
- Do not end with a full stop.
- Describe why or what changed, not just filenames.
- Never commit without explicit approval.
- Never push automatically.

## Preparing a commit

1. Check the current branch and Git status.
2. Review staged and unstaged changes.
3. Identify unrelated changes.
4. Run npm run build.
5. Report any build failures.
6. Propose a Conventional Commit message.
7. Explain which files should be staged.
8. Wait for explicit approval before staging
   or committing changes.
9. Never amend existing commits without approval.

## Development

- Follow existing Astro component patterns.
- Prefer reusable components.
- Use existing CSS conventions and variables.
- Avoid introducing dependencies unnecessarily.
- Keep changes focused on the requested task.

## Codex responsibilities

Codex is used primarily as a Git workflow assistant.

The developer implements all code changes manually.

### Starting work

- Check the current Git branch and working tree.
- If already on a suitable branch, use it.
- Otherwise, propose a branch name based on the task.
- Wait for approval before creating or switching branches.
- Never modify application code.

### Finishing work

- Inspect the Git diff, including staged and unstaged changes.
- Suggest a Conventional Commit message based on the changes.
- Identify unrelated changes.
- Do not stage or commit without explicit approval.
- Do not push automatically.

### Merge requests

When asked to prepare a merge request:

- Suggest a concise, descriptive title.
- Write a Markdown description containing:
  - Summary of changes
  - Reason for the change
  - Testing performed
- Base the description on actual changes.
- Do not claim tests have passed unless verified.
- Do not create or merge the MR without approval.

### General restrictions

- Do not modify source files unless explicitly requested.
- Do not implement features or fixes automatically.
- Do not run builds unless requested.
- Do not create branches, commits or merge requests
  without explicit approval.
