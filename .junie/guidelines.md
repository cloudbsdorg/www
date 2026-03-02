# CloudBSD Website Project Guidelines

This document provides essential information for advanced developers working on the CloudBSD website project.

## 1. Build & Configuration

### Environment Requirements
- **Node.js**: Modern version (tested with 20+)
- **OS**: Linux (Ubuntu) or FreeBSD
- **Build Tool**: Portable `Makefile` compatible with both GNU Make and BSD Make.

### Core Commands
- `make build`: Installs dependencies and builds the production bundle in `dist/`.
- `make run`: Starts the Vite development server.
- `make install`: Performs a bare-metal installation. It automatically detects the host OS (Linux vs. FreeBSD) and configures the appropriate services (Systemd for Linux, RC for FreeBSD) and NGINX.
- `make clean`: Removes the `dist/` directory.
- `make distclean`: Removes both `dist/` and `node_modules/`.

### Configuration
- `src/config.ts`: Centralized configuration for project branding (Name, Owner, Company). Modify this file to rebrand the site.

## 2. Testing Information

### Setup & Tools
- **Framework**: [Vitest](https://vitest.dev/)
- **Environment**: [jsdom](https://github.com/jsdom/jsdom)
- **Library**: [React Testing Library](https://testing-library.com/docs/react-testing-library/intro/)

### Running Tests
Execute tests using npm:
```bash
npm test
```

### Adding New Tests
1. Place test files in `src/test/` or alongside components with the `.test.tsx` extension.
2. If the component uses browser APIs like `matchMedia`, ensure they are mocked in `src/test/setup.ts`.
3. Example test structure (`src/test/App.test.tsx`):
```tsx
import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import React from 'react';
import App from '../App';
import { CONFIG } from '../config';

describe('App Component', () => {
  it('renders the project name from config', () => {
    render(<App />);
    const projectNameElements = screen.getAllByText(CONFIG.projectName);
    expect(projectNameElements.length).toBeGreaterThan(0);
  });
});
```

## 3. Additional Development Information

### Code Style & Architecture
- **React 19 + Vite**: Modern SPA architecture.
- **Tailwind CSS 3**: All styling should be handled via Tailwind utility classes.
- **TypeScript**: Strict typing is encouraged for all new components.
- **Dark Mode**: Support is implemented using Tailwind's `dark` variant. Theme state is persisted in `localStorage`.

### Internationalization (i18n)
- **Framework**: `i18next` + `react-i18next`.
- **Locales**: Translation files are located in `src/locales/*.json`.
- **Language Selector**: The `LanguageSelector` component in `src/components/` displays available languages.
- **Sorting Requirement**: The language list must ALWAYS be sorted alphabetically by their English name, with **English at the very top** of the list.

### Containerization
The project includes multi-OS container support via:
- `Containerfile.linux`: Standard OCI container for Linux.
- `Containerfile.freebsd`: Specialized container for FreeBSD runtimes.
Use `make podman-linux` or `make podman-freebsd` to build the respective images.

### Deployment Details
- **FreeBSD**: Uses `daemon` in the RC script for background execution and logging to `/var/log/cloudbsd_website.log`. The script includes custom logic to clean up the PID file upon stopping and handles edge cases where a negative PID might be present in the PID file by treating the service as stopped and cleaning up the stale file.
- **Linux**: Uses Systemd with `Restart=always` for reliability.
- **Proxy**: NGINX is used as a reverse proxy (config in `cloudbsd-nginx.conf`) to the Node.js application running on port 3000.
