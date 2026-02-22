# CloudBSD Website

This repository contains the source code for the [CloudBSD](https://cloudbsd.org) project website. It is a modern, responsive landing page built using React, Vite, and Tailwind CSS.

## Project Overview

CloudBSD is a comprehensive distribution built upon FreeBSD, designed to provide a robust environment for hosting Jails, Virtual Machines (Bhyve), and OCI containers. This website serves as the primary landing page to introduce the project, its features, and eventually provide download links.

### Key Features of CloudBSD
- **Unified Controller**: Central configuration for Jails, VMs, and Containers.
- **Smart Worker Nodes**: Effortless deployment with PXE boot support.
- **Native Virtualization**: High-performance Bhyve VMM integration.
- **Secure Isolation**: FreeBSD-native Jails and Bhyve for strong security boundaries.
- **ZFS-Native Security**: Industry-leading storage reliability and data integrity.
- **OCI Support**: Run and manage Linux OCI containers on FreeBSD.

## Tech Stack

- **Framework**: [React 19](https://react.dev/)
- **Build Tool**: [Vite 5](https://vitejs.dev/)
- **Styling**: [Tailwind CSS 3](https://tailwindcss.com/)
- **Language**: [TypeScript](https://www.typescriptlang.org/)
- **Deployment**: Serve, Nginx

## Getting Started

### Prerequisites

- Node.js (v18 or higher recommended)
- npm or yarn

### Installation

1. Clone the repository:
   ```bash
   git clone <repository-url>
   cd www-js
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

### Development

Start the development server:
```bash
npm run dev
```
The site will be available at `http://localhost:5173`.

### Building for Production

Build the static files for production:
```bash
npm run build
```
The optimized build will be located in the `dist/` directory.

### Previewing the Build

Preview the production build locally:
```bash
npm run preview
```

## Deployment

The project includes several configuration files for different deployment environments:

### Local Hosting
To serve the `dist` directory locally on port 3000:
```bash
npm start
```

### FreeBSD Deployment
- **RC Script**: `cloudbsd-website.freebsd.rc`
- **Container**: `Containerfile.freebsd`
- **Nginx Config**: `cloudbsd-nginx.conf`

### Ubuntu/Linux Deployment
- **Systemd Service**: `cloudbsd-website.ubuntu.service`
- **Container**: `Containerfile.linux`

### Makefile
A `Makefile` is provided to simplify common tasks:
- `make all`: Build the project.
- `make clean`: Remove the `dist` directory.

## License

This project is released under the **3-Clause BSD License**. See the `LICENSE` file for details.

---
© 2026 CloudBSD · Built on FreeBSD
