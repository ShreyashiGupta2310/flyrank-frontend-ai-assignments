# AI-Assisted Workflow

This document compares two iterative approaches to implementing a settings form with validation, demonstrating how prompt precision and explicit verification instructions affect implementation quality, accessibility, and reviewability.

## Round One

Round One began with a vague, open-ended prompt: "Build a small settings form with validation." The AI was given minimal constraints. It independently chose:
- A monolithic validation architecture (single `validateSettingsForm()` function validating all fields at once)
- A simple error-display approach using inline error objects
- No explicit error-focus behavior
- Validation tied to individual field touches

This approach produced a working form that built successfully. The implementation was quick and functional, achieving the basic goal without explicit guidance on architecture, validation patterns, or accessibility requirements.

## Round Two

Round Two started fresh on a new branch with a detailed, specification-driven prompt. The prompt explicitly defined:
- Exact form fields with names and types
- Precise validation rules and constraints
- Required accessibility attributes and behavior
- Specific error-display conditions
- Build verification step
- Focus management on submit

With these constraints, the AI produced a different implementation:
- Modular validators: individual functions for each field (`validateDisplayName`, `validateEmail`, etc.) plus a dispatcher (`validateSettingsField`)
- Explicit field ordering via a constant (`SETTINGS_FIELD_ORDER`)
- Submitted-state tracking for uniform error visibility across all fields
- First-invalid-field focus on form submit
- Complete accessibility coverage including blur and aria handling for all fields

## What the Diff Revealed

Comparing the two branches using `git diff fe-03-round-one fe-03-round-two` exposed several concrete differences:

1. **Validation Architecture**: Round One's monolithic `validateSettingsForm(data)` approach was replaced with seven individual validators and a dispatcher, making each validator independently testable and reusable.

2. **Submit State Bug in Round One**: Round One's submit handler marked only four fields as touched (`displayName`, `email`, `siteTitle`, `bio`), hardcoding a static set. This omitted `theme`, `language`, and `newsletter`, potentially preventing error messages from showing for those fields after submit. Round Two fixed this with a `submitted` state that applies uniformly to all seven fields via `SETTINGS_FIELD_ORDER`.

3. **Checkbox Accessibility**: Round One's newsletter checkbox lacked `onBlur`, `aria-invalid`, and `aria-describedby` attributes. Round Two added full validation support for the checkbox, including error messaging and accessibility attributes—making it consistent with other form fields.

4. **CSS Coverage**: Round One's CSS styled `input[aria-invalid]` and `textarea[aria-invalid]` but omitted `select[aria-invalid]`. Round Two added the missing selector, ensuring theme and language dropdowns visually indicate errors.

5. **Error-Focus Enhancement**: Round Two added `focusFirstInvalidField()`, automatically moving keyboard focus to the first invalid field on form submit, improving accessibility for keyboard users.

6. **Bio Field**: Round Two added `maxLength={200}` to the textarea and client-side length enforcement in the onChange handler, providing immediate visual feedback as users type.

7. **Language Options**: Round One supported four locales (en-US, en-GB, es-ES, fr-FR); Round Two changed to three (en-US, hi, fr), reflecting a product decision.

## Review and Lessons

**Correctness**: Round One's incomplete touched-state tracking is an edge-case bug. Fields omitted from the touched set would not display validation errors consistently. Round Two eliminates this class of error by using centralized state.

**Accessibility**: Round One left the checkbox and select fields without blur handlers or aria attributes. Round Two provides complete accessibility coverage for all interactive elements.

**Review Effort**: Round One required closer inspection to spot the incomplete field handling. Round Two's explicit field ordering and state management made validation behavior verifiable against the specification.

**Implementation Speed vs. Clarity**: Round One took approximately 30 minutes from prompt through initial review. Round Two took approximately 2–2.5 hours, including detailed prompt preparation, implementation, verification, and manual testing. Round One was faster, but its brevity came at the cost of omissions that required discovery during review. Round Two required more upfront effort but produced behavior that could be directly validated against explicit criteria.

## Key Lesson

Vague prompts enable rapid prototyping but often miss edge cases and accessibility requirements. Precise prompts—specifying exact fields, validation rules, accessibility constraints, and verification steps—guide the AI toward implementations that are easier to review against explicit criteria and expose inconsistencies earlier in the development cycle.
