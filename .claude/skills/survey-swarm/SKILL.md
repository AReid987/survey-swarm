```markdown
# survey-swarm Development Patterns

> Auto-generated skill from repository analysis

## Overview
This skill teaches the core development patterns and conventions used in the `survey-swarm` repository, a TypeScript project built with the Next.js framework. You will learn how to structure files, write and organize code, follow commit conventions, and write tests in alignment with the repository's standards.

## Coding Conventions

### File Naming
- Use **camelCase** for all file names.
  - Example: `userProfile.ts`, `surveyManager.tsx`

### Import Style
- Use **relative imports** for modules within the codebase.
  - Example:
    ```typescript
    import { fetchSurvey } from './surveyApi';
    ```

### Export Style
- Use **named exports** for all modules.
  - Example:
    ```typescript
    // surveyApi.ts
    export function fetchSurvey(id: string) { ... }
    export const SURVEY_STATUS = { ... };
    ```

### Commit Messages
- Follow the **Conventional Commits** specification.
- Use the `build` prefix for build-related changes.
- Keep commit messages concise (average: 77 characters).
  - Example:  
    ```
    build: update Next.js to v13.4.2 for improved performance
    ```

## Workflows

_No automated workflows detected in this repository._

## Testing Patterns

- **Test File Pattern:** All test files use the `*.test.*` naming convention.
  - Example: `surveyManager.test.ts`
- **Testing Framework:** Not explicitly detected. Check project dependencies for specifics.
- **Test Example:**
  ```typescript
  // surveyManager.test.ts
  import { fetchSurvey } from './surveyManager';

  describe('fetchSurvey', () => {
    it('returns survey data for a valid ID', async () => {
      const data = await fetchSurvey('123');
      expect(data).toHaveProperty('id', '123');
    });
  });
  ```

## Commands
| Command | Purpose |
|---------|---------|
| /commit-build | Format a build-related commit message following conventions |
| /test-file | Scaffold a new test file with the correct naming pattern |
```