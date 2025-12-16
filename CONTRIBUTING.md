# Contributing to Tennis Coordinator

Thank you for your interest in contributing to Tennis Coordinator! This document provides guidelines and instructions for contributing to the project.

---

## Table of Contents

- [Code of Conduct](#code-of-conduct)
- [Getting Started](#getting-started)
- [Development Setup](#development-setup)
- [Development Workflow](#development-workflow)
- [Code Style Guidelines](#code-style-guidelines)
- [Testing Requirements](#testing-requirements)
- [Commit Message Format](#commit-message-format)
- [Pull Request Process](#pull-request-process)
- [Project Structure](#project-structure)

---

## Code of Conduct

This project is for tennis enthusiasts who want to collaborate and improve the coordination experience. Be respectful, constructive, and helpful.

---

## Getting Started

### Prerequisites

- Node.js 20.11.0 or higher (see `.nvmrc`)
- npm 10.x or higher
- Git
- A Firebase account (for database setup)

### Quick Start

```bash
# Clone the repository
git clone https://github.com/sashana/tennis-coordinator.git
cd tennis-coordinator

# Install dependencies
npm install

# Copy environment template
cp .env.example .env.local
# Edit .env.local with your Firebase credentials

# Start development server
npm run dev

# Run tests
npm test

# Run tests in watch mode
npm run test:watch
```

---

## Development Setup

### 1. Firebase Setup

1. Create a Firebase project at [firebase.google.com](https://firebase.google.com)
2. Enable Realtime Database
3. Copy your Firebase configuration
4. Update `.env.local` with your credentials

### 2. Editor Setup

We recommend using **VS Code** with these extensions:
- ESLint
- Prettier - Code formatter
- TypeScript and JavaScript Language Features

**VS Code Settings** (`.vscode/settings.json`):
```json
{
  "editor.formatOnSave": true,
  "editor.defaultFormatter": "esbenp.prettier-vscode",
  "editor.codeActionsOnSave": {
    "source.fixAll.eslint": true
  }
}
```

### 3. Node Version

Use the correct Node version:
```bash
# If using nvm
nvm use

# Or install the version specified in .nvmrc
nvm install
```

---

## Development Workflow

### Branch Naming

- **Features**: `feature/description` (e.g., `feature/add-weather-widget`)
- **Bugs**: `fix/description` (e.g., `fix/check-in-validation`)
- **Refactoring**: `refactor/description` (e.g., `refactor/split-firebase-hooks`)
- **Documentation**: `docs/description` (e.g., `docs/update-readme`)

### Typical Workflow

```bash
# 1. Create a new branch from main
git checkout main
git pull origin main
git checkout -b feature/my-feature

# 2. Make your changes

# 3. Run tests and linting
npm test
npm run lint

# 4. Commit your changes (see commit format below)
git add .
git commit -m "feat: add new feature"

# 5. Push to your fork
git push origin feature/my-feature

# 6. Open a Pull Request on GitHub
```

---

## Code Style Guidelines

### TypeScript

- **Always use TypeScript** - no plain JavaScript files in `src/`
- **Enable strict mode** - all code must pass TypeScript strict checks
- **Avoid `any`** - use proper types or `unknown` if truly necessary
- **Use interfaces for objects** - prefer interfaces over types for object shapes

**Example:**
```typescript
// ✅ Good
interface CheckinData {
  name: string;
  playStyle?: PlayStyle;
  timestamp: number;
}

// ❌ Bad
type CheckinData = {
  name: any;
  playStyle: any;
};
```

### Preact Components

- **Functional components only** - no class components
- **Use signals for state** - prefer `@preact/signals` over `useState`
- **Props destructuring** - destructure props in function signature
- **Type your props** - always define prop interfaces

**Example:**
```typescript
// ✅ Good
interface CheckInFormProps {
  onSubmit: (data: CheckinData) => void;
  initialName?: string;
}

export function CheckInForm({ onSubmit, initialName }: CheckInFormProps) {
  const selectedName = signal(initialName || '');
  // ...
}

// ❌ Bad
export function CheckInForm(props: any) {
  const [name, setName] = useState('');
  // ...
}
```

### Naming Conventions

- **Components**: PascalCase (e.g., `CheckInForm.tsx`)
- **Utilities**: camelCase (e.g., `formatDate.ts`)
- **Constants**: UPPER_SNAKE_CASE (e.g., `MAX_PLAYERS`)
- **Interfaces**: PascalCase with descriptive names (e.g., `CheckinData`)
- **Signals**: camelCase (e.g., `selectedDate`)

### File Organization

```
src/
├── components/
│   ├── tabs/           # Top-level tab components
│   ├── features/       # Feature components (reusable widgets)
│   ├── modals/         # Modal dialogs
│   ├── ui/             # Generic UI components
│   ├── layout/         # Layout components
│   ├── navigation/     # Navigation components
│   └── pages/          # Page-level components
├── utils/              # Pure utility functions
├── hooks/              # Custom Preact hooks
├── types/              # TypeScript type definitions
├── styles/             # Global CSS and themes
├── config/             # Configuration files
└── __tests__/          # Test files
```

### CSS

- **Use CSS variables** - defined in `src/styles/themes.css`
- **Mobile-first** - start with mobile styles, add desktop with `@media (min-width: ...)`
- **Avoid inline styles** - prefer CSS classes
- **Use BEM naming** - for complex components (e.g., `.check-in-form__submit-button`)

**Example:**
```css
/* ✅ Good - using CSS variables */
.button-primary {
  background: var(--color-primary);
  color: var(--color-text-inverse);
  padding: var(--spacing-md);
}

/* ❌ Bad - hardcoded values */
.button-primary {
  background: #2C6E49;
  color: white;
  padding: 12px;
}
```

---

## Testing Requirements

### Test Coverage

All **new code** should include tests:
- **Utility functions**: Unit tests required
- **Complex components**: Component tests encouraged
- **Critical user flows**: E2E tests (future)

### Running Tests

```bash
# Run all tests
npm test

# Run tests in watch mode
npm run test:watch

# Run tests with coverage
npm run test -- --coverage
```

### Writing Tests

**Utility Function Test Example:**
```typescript
import { describe, test, expect } from 'vitest';
import { formatDate } from './datetime';

describe('formatDate', () => {
  test('formats date correctly', () => {
    expect(formatDate('2025-12-14')).toBe('December 14, 2025');
  });

  test('handles invalid date', () => {
    expect(formatDate('invalid')).toBe('Invalid Date');
  });
});
```

**Component Test Example (future):**
```typescript
import { render, fireEvent } from '@testing-library/preact';
import { CheckInForm } from './CheckInForm';

test('submits form with selected name', async () => {
  const onSubmit = vi.fn();
  const { getByText } = render(<CheckInForm onSubmit={onSubmit} />);

  fireEvent.click(getByText('Check In'));

  expect(onSubmit).toHaveBeenCalled();
});
```

---

## Commit Message Format

We follow **Conventional Commits** format:

```
<type>(<scope>): <subject>

<body>

<footer>
```

### Types

- **feat**: New feature
- **fix**: Bug fix
- **docs**: Documentation changes
- **style**: Code style changes (formatting, no logic changes)
- **refactor**: Code refactoring (no feature changes)
- **perf**: Performance improvements
- **test**: Adding or updating tests
- **chore**: Maintenance tasks (dependencies, build, etc.)

### Examples

```bash
# Feature
git commit -m "feat(checkin): add time range selection"

# Bug fix
git commit -m "fix(matching): handle 3-player rotation correctly"

# Documentation
git commit -m "docs: update README with deployment instructions"

# Refactoring
git commit -m "refactor(firebase): split useFirebase into smaller hooks"
```

### Breaking Changes

If your change breaks existing functionality:

```bash
git commit -m "feat(auth)!: implement Firebase Authentication

BREAKING CHANGE: Group PIN authentication replaced with Firebase Auth.
Users will need to create accounts to access groups."
```

---

## Pull Request Process

### Before Opening a PR

1. ✅ All tests pass (`npm test`)
2. ✅ Code follows style guidelines
3. ✅ No console.log statements (use proper logging)
4. ✅ TypeScript compiles without errors
5. ✅ Changes are documented (code comments, README updates)

### PR Title

Use the same format as commit messages:
```
feat(checkin): add time range selection
```

### PR Description Template

```markdown
## Description
Brief description of changes

## Type of Change
- [ ] Bug fix
- [ ] New feature
- [ ] Breaking change
- [ ] Documentation update

## How to Test
1. Step 1
2. Step 2
3. Expected result

## Screenshots (if applicable)
[Add screenshots here]

## Checklist
- [ ] Tests added/updated
- [ ] Documentation updated
- [ ] No console.logs
- [ ] TypeScript types added
- [ ] Follows code style guidelines
```

### Review Process

1. Open PR against `main` branch
2. Automated checks must pass (tests, linting)
3. At least one approval required
4. Address review comments
5. Squash and merge when approved

---

## Project Structure

### Key Directories

```
tennis-coordinator/
├── src/
│   ├── components/       # React/Preact components
│   ├── utils/            # Pure utility functions
│   ├── hooks/            # Custom hooks
│   ├── types/            # TypeScript definitions
│   ├── styles/           # Global styles and themes
│   ├── config/           # Configuration
│   └── __tests__/        # Test files
├── public/               # Static assets
├── dist/                 # Build output (not in git)
├── .github/              # GitHub templates and workflows
└── [config files]
```

### Key Files

- **`src/main.tsx`** - Application entry point
- **`src/components/App.tsx`** - Root component with routing
- **`src/hooks/useFirebase.ts`** - Firebase integration
- **`src/utils/matching.ts`** - Match organization algorithm
- **`src/types/index.ts`** - Core type definitions
- **`vite.config.ts`** - Build configuration
- **`firebase.json`** - Firebase hosting configuration

---

## Common Tasks

### Adding a New Component

```bash
# 1. Create component file
touch src/components/features/NewFeature.tsx

# 2. Create component with types
# src/components/features/NewFeature.tsx
interface NewFeatureProps {
  onAction: () => void;
}

export function NewFeature({ onAction }: NewFeatureProps) {
  return <div>...</div>;
}

# 3. Add tests
touch src/__tests__/newFeature.test.ts

# 4. Export from index if needed
# Add to src/index.ts
```

### Adding a New Utility

```bash
# 1. Create utility file
touch src/utils/myUtil.ts

# 2. Write function with JSDoc
/**
 * Description of what this does
 * @param input - Description of parameter
 * @returns Description of return value
 */
export function myUtil(input: string): string {
  return input.toUpperCase();
}

# 3. Add tests
touch src/__tests__/myUtil.test.ts

# 4. Add to src/index.ts if public API
```

### Debugging

```typescript
// Use development guards for debug logging
if (import.meta.env.DEV) {
  console.log('[debug]', data);
}

// Or use console.error for errors (allowed by ESLint)
console.error('Error:', error);
```

---

## Getting Help

- **Issues**: Open an issue on GitHub
- **Discussions**: Use GitHub Discussions for questions
- **Documentation**: Check existing docs in the repo

---

## License

By contributing, you agree that your contributions will be licensed under the same license as the project (ISC).

---

Thank you for contributing! 🎾
