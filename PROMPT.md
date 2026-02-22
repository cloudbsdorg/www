# CloudBSD Website Project Prompt

This document serves as a comprehensive record of the CloudBSD website project. It contains the technical rationale, accomplishments, and instructions necessary to recreate or extend the site using an LLM.

## Project Vision
CloudBSD is a next-generation cloud platform built on FreeBSD. The website aims to hype its capabilities—specifically its use of Bhyve, Jails, and OCI containers—while remaining mobile-friendly and professional.

## Technical Stack
- **Framework**: React 19 (via Vite)
- **Styling**: Tailwind CSS 3
- **Language**: TypeScript
- **Containerization**: OCI-compliant (Docker/Podman) with specific configurations for Linux and FreeBSD.
- **Build Tooling**: Portable Makefile designed for compatibility with both GNU Make and BSD Make, using shell-based conditionals for reliable cross-platform automation.

## Key Features & Accomplishments
1.  **Modern UI**: Responsive design using Tailwind CSS, featuring a sticky header, hero section with background optimization, and a feature grid.
2.  **Dynamic Theming**: Support for both Light and Dark modes with a theme toggle switch and local storage persistence.
3.  **Configurable Identity**: All project-specific strings (Project Name, Company Name, Owner) are centralized in `src/config.ts`.
4.  **GPU Management**: Integrated hardware discovery and PCI passthrough details, highlighting FreeBSD's ability to manage and share GPU resources.
5.  **Multi-OS Container Support**:
    - `Containerfile.linux`: Standard OCI container for Linux environments.
    - `Containerfile.freebsd`: Specialized container for FreeBSD-based runtimes.
6.  **Smart Makefile**: Automatically detects the host OS (Linux vs. FreeBSD) and provides commands for building, running development servers, building OCI images, and performing bare-metal installations.
7.  **Bare-Metal Deployment**: 
    - `cloudbsd-nginx.conf`: NGINX configuration configured as a reverse proxy to redirect port 80 to the Node.js application (port 3000).
    - `cloudbsd-website.freebsd.rc`: Init script for FreeBSD that runs the application via `npm start`.
    - `cloudbsd-website.ubuntu.service`: Systemd service unit for Ubuntu with `Restart=always` for auto-recovery.
    - `make install`: Cross-platform command to deploy the application, install production dependencies, and configure NGINX and services.
8.  **Application Architecture**: The site is built as a Single Page Application (SPA), served by a Node.js process (`serve` package) for consistent behavior, and proxied by NGINX for host sharing and SSL termination (managed externally).
9.  **Background Optimization**: The `cloudbsd-background.jpg` is served with a sophisticated CSS gradient overlay (`hero-bg` class in `index.css`) to ensure text legibility and high visual impact without needing complex SVG conversions.
10. **License**: Released under the 3-Clause BSD License.

## Project Structure
- `src/App.tsx`: Main application component and layout.
- `src/config.ts`: Configuration file for easy rebranding.
- `src/index.css`: Global styles and Tailwind directives.
- `Makefile`: Build and runtime automation.
- `Containerfile.linux` / `Containerfile.freebsd`: Container definitions.
- `what_is_cloudbsd.md`: The source of truth for features and project goals.

## Rationale
- **FreeBSD Focus**: The site emphasizes the stability and security of FreeBSD, positioning it as a viable and powerful alternative to Linux-centric cloud platforms.
- **Simplicity & Performance**: React + Vite was chosen for a fast developer experience and a lightweight production bundle.
- **Flexibility**: The configuration-driven approach allows the site to be adapted for different contributors or project forks easily.

## Re-creation Instructions for LLM
To recreate this site, provide the following to an LLM:
1.  Use React with Vite and TypeScript.
2.  Use Tailwind CSS for all styling, ensuring mobile responsiveness.
3.  Reference `what_is_cloudbsd.md` for the core feature set (Controller, Worker Nodes, Bhyve, Jails, OCI, GPU management).
4.  Implement a centralized `config.ts` for project names and owner details.
5.  Ensure a multi-OS Makefile is present to handle environment differences between Linux and FreeBSD.
6.  Include both Linux and FreeBSD Containerfiles for OCI deployment.
7.  Apply a 3-Clause BSD License to the codebase.
