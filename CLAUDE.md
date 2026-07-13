# CLAUDE.md

Guidance for AI assistants working in the **flyrank-ai-capstone** repository.

## Tech Stack

- **Runtime:** Node.js (v18+)
- **Language:** TypeScript preferred; JavaScript acceptable where appropriate
- **Package Manager:** npm
- **AI:** LLM APIs and related SDKs
- **Testing:** Jest (or the project's configured test runner)
- **Linting & Formatting:** ESLint, Prettier

## Coding Conventions

### General

- Prefer TypeScript with strict typing where the project uses TypeScript
- Use `async/await` over raw Promise chains
- Keep functions small and focused on a single responsibility
- Match existing patterns in the codebase before introducing new abstractions

### Naming

- **Files:** `kebab-case` for modules (e.g. `ranking-service.ts`)
- **Variables & functions:** `camelCase`
- **Classes & types:** `PascalCase`
- **Constants:** `UPPER_SNAKE_CASE` for true constants

### Structure

- Place shared utilities in a `src/utils` or equivalent directory
- Keep API routes, services, and data access in separate layers
- Co-locate tests with source files or under a `__tests__` directory, following project convention once established

### Style

- Run ESLint and Prettier before committing
- Do not commit secrets, API keys, or `.env` files
- Add comments only for non-obvious business logic or complex algorithms

## AI Assistant Rules

1. **Minimize scope** — Change only what is needed for the task. Avoid unrelated refactors.
2. **Read before writing** — Inspect surrounding code and follow existing conventions.
3. **No over-engineering** — Prefer simple, direct solutions over premature abstraction.
4. **No unnecessary files** — Do not add docs, configs, or helpers unless requested or clearly required.
5. **Preserve behavior** — Do not change existing behavior unless the task requires it.
6. **Security** — Never hardcode credentials. Use environment variables.
7. **Tests** — Add or update tests when changing behavior; skip trivial or redundant tests.
8. **Commits** — Do not create git commits unless explicitly asked.

## Conventional Commit Guidelines

Follow [Conventional Commits](https://www.conventionalcommits.org/) for all commit messages.

### Format

```
<type>(<optional scope>): <short description>

<optional body>

<optional footer>
```

### Types

| Type       | Use for                                      |
|------------|----------------------------------------------|
| `feat`     | New feature                                  |
| `fix`      | Bug fix                                      |
| `docs`     | Documentation only                           |
| `style`    | Formatting, no logic change                  |
| `refactor` | Code change that is neither feat nor fix     |
| `test`     | Adding or updating tests                     |
| `chore`    | Build, tooling, dependencies                 |
| `perf`     | Performance improvement                      |
| `ci`       | CI/CD configuration                          |

### Examples

```
feat(ranking): add semantic similarity scoring
fix(api): handle empty query strings gracefully
docs: update installation steps in README
chore: bump eslint to latest minor version
```

### Rules

- Use imperative mood in the subject line (e.g. "add feature" not "added feature")
- Keep the subject line under 72 characters
- Do not end the subject with a period
- Reference issues in the footer when applicable: `Closes #42`
