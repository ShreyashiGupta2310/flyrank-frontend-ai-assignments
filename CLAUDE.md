# CLAUDE.md

Guidance for AI assistants working in the **flyrank-ai-capstone** repository.

## Tech Stack

- Frontend: HTML, CSS, JavaScript
- Framework: React (planned)
- Runtime: Node.js
- Version Control: Git & GitHub
- AI IDE: Cursor

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

- Follow existing project structure and coding conventions.
- Prefer simple, readable, and maintainable solutions.
- Do not modify unrelated files.
- Explain major changes when requested.
- Never expose secrets or API keys.
- Use Conventional Commits for all commit messages.

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

## Form & Validation Rules

These rules are specific to the FlyRank settings form and validation patterns, learned from FE-03 Round 1 vs Round 2 comparison.

### Rule 1: Handle All Form Fields Uniformly in Validation

When implementing form submission validation, use a centralized state mechanism (e.g., `submitted` state or an explicit field-order constant) to make error visibility apply consistently to **all** defined form fields. Do not hardcode a subset of fields to validate on submit.

**Why:** Round 1 marked only 4 of 7 fields as touched during submit (`displayName`, `email`, `siteTitle`, `bio`), omitting `theme`, `language`, and `newsletter`. This could prevent error messages from displaying for the omitted fields.

**How to verify:** Code review should check that either:
- All fields in the form data type are included in submit-time state updates (no hardcoded lists), OR
- A field-order constant (e.g., `SETTINGS_FIELD_ORDER`) is defined and used to ensure all fields are processed uniformly.

### Rule 2: Apply Accessibility Attributes Consistently to All Input Types

Every form input element—including `<input>`, `<select>`, and `<input type="checkbox">`—must have all three of these for proper accessibility:
- `onBlur` handler that triggers validation
- `aria-invalid` attribute set based on error state
- `aria-describedby` attribute pointing to the error message or hint text ID

**Why:** Round 1's newsletter checkbox lacked these attributes and the onBlur handler, making it impossible to validate or provide error feedback. Round 2 added complete accessibility coverage, ensuring all form elements behave consistently.

**How to verify:** Code review should scan the form JSX and confirm that all `<input>`, `<select>`, and `<textarea>` elements have these three attributes/handlers.

### Rule 3: CSS Must Cover All Form Input Types Used

CSS selectors for form error styling must include all input element types that use `aria-invalid`. If a form uses `<input>`, `<select>`, and `<textarea>`, the error styling rule must be:
```css
.form-group input[aria-invalid="true"],
.form-group select[aria-invalid="true"],
.form-group textarea[aria-invalid="true"] {
  border-color: var(--color-error);
}
```

**Why:** Round 1's CSS covered `input` and `textarea` but omitted `select[aria-invalid]`, so theme and language dropdowns did not visually indicate errors.

**How to verify:** Code review should check that for each input type in the form JSX, a corresponding selector exists in `src/styles/global.css`.

### Rule 4: Verify Form Features with `npm run build` and Manual Testing

Before marking AI-assisted form or validation features as complete, run `npm run build` to confirm TypeScript type checking and bundling succeed. Follow with manual browser testing to verify the specified validation and error-display behavior works end-to-end.

**Why:** Compilation-only verification may miss runtime behavior issues (e.g., error visibility logic not triggering correctly, accessibility attributes missing from DOM). Vague prompts are more likely to miss edge cases; explicit verification helps catch them early.

**How to verify:** Confirm that `npm run build` passes successfully and that the feature has been manually tested in the browser to verify the specified validation and error-display behavior works end-to-end.
