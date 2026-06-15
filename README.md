# EmployeeForm

A full-stack Angular 12 application for employee profile management, containerised with Docker and delivered via a multi-stage GitHub Actions CI pipeline pushing to GitHub Container Registry (GHCR).

---

## 🚀 CI/CD Pipeline

![CI Pipeline](https://github.com/Gamer337/EmployeeForm/actions/workflows/ci.yml/badge.svg)
![Docker](https://img.shields.io/badge/docker-ready-blue?logo=docker)
![Angular](https://img.shields.io/badge/angular-12-red?logo=angular)

Every push to `main` triggers a two-job GitHub Actions pipeline:

```
push to main
     │
     ▼
┌─────────────────────────────────────┐
│  Job 1 — Build & Test               │
│  ├── npm ci (reproducible install)  │
│  ├── ng lint                        │
│  ├── ng test --browsers=ChromeHeadless │
│  └── ng build --configuration production │
└─────────────────────┬───────────────┘
                      │ passes
                      ▼
┌─────────────────────────────────────┐
│  Job 2 — Docker Build & Push        │
│  ├── docker buildx (multi-platform) │
│  ├── tag: sha-<commit>              │
│  └── push → ghcr.io/Gamer337/EmployeeForm │
└─────────────────────────────────────┘
```

---

## 🐳 Docker — Multi-Stage Build

The application uses a two-stage Dockerfile to keep the final image lean and secure:

| Stage | Base Image | Purpose |
|-------|-----------|---------|
| `build` | `node:16-alpine` | Install dependencies, compile Angular production bundle |
| `serve` | `nginx:1.25-alpine` | Serve compiled static artefacts only |

The final image contains **no Node.js, no source code, and no devDependencies** — only the compiled bundle served by nginx.

### Run locally with Docker

```bash
# Build the image
docker build -t employee-form .

# Run the container
docker run -p 8080:80 employee-form

# App available at http://localhost:8080
```

### Pull from GHCR

```bash
docker pull ghcr.io/gamer337/employeeform:latest
```

---

## 🛠 Tech Stack

| Layer | Technology |
|-------|-----------|
| Frontend | Angular 12, TypeScript 4.3, Angular Material |
| Auth | IdentityServer4 (OAuth2 / OIDC via `angular-oauth2-oidc`) |
| Database | PostgreSQL |
| Containerisation | Docker (multi-stage), nginx 1.25 |
| CI/CD | GitHub Actions → GitHub Container Registry (GHCR) |
| Testing | Karma, Jasmine, Chrome Headless |
| API Testing | Postman |

---

## 📦 Project Structure

```
EmployeeForm/
├── src/                        # Angular application source
│   ├── app/                    # Components, services, modules
│   └── environments/           # Environment-specific config
├── .github/
│   └── workflows/
│       └── ci.yml              # GitHub Actions CI pipeline
├── Dockerfile                  # Multi-stage Docker build
├── nginx.conf                  # nginx config for SPA routing + caching
├── angular.json                # Angular CLI config
└── package.json                # Dependencies and scripts
```

---

## ⚙️ Local Development (without Docker)

### Prerequisites
- Node.js 16+
- Angular CLI 12
- PostgreSQL (for backend connectivity)

### Setup

```bash
# Clone the repository
git clone https://github.com/Gamer337/EmployeeForm.git
cd EmployeeForm

# Install dependencies (clean install from lock file)
npm ci

# Start development server
npm start

# App available at http://localhost:4200
```

### Available Scripts

| Command | Description |
|---------|-------------|
| `npm start` | Start dev server at localhost:4200 with hot reload |
| `npm run build` | Build for development |
| `npm run build -- --configuration production` | Build optimised production bundle |
| `npm test` | Run unit tests via Karma |
| `npm run ng -- lint` | Run linter |

---

## 🔐 Authentication

Authentication is handled via **IdentityServer4** using the OAuth2 Authorization Code flow with PKCE. The Angular client uses the `angular-oauth2-oidc` library to manage token acquisition, storage, and refresh.

Key auth features:
- OAuth2 / OIDC compliant
- JWT-based session management
- Secure token storage in browser local storage
- Auto-refresh on token expiry

---

## 🧪 Testing

Unit tests are written with **Karma + Jasmine** and run headlessly in CI via Chrome Headless. Coverage reports are uploaded as a GitHub Actions artifact on every pipeline run.

```bash
# Run tests with coverage
npm run ng -- test --watch=false --browsers=ChromeHeadless --code-coverage
```

---

## 📋 Features

- Create, view, edit, and delete employee profiles
- OAuth2/OIDC authentication via IdentityServer4
- PostgreSQL-backed persistent storage
- Angular Material UI components
- Responsive layout with Bootstrap 5
- Form validation with Angular Reactive Forms

---

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/your-feature`
3. Commit your changes: `git commit -m 'Add your feature'`
4. Push to the branch: `git push origin feature/your-feature`
5. Open a Pull Request against `main`

The CI pipeline will automatically run on your PR — all lint, test, and build checks must pass before merge.

*Built by [Gaurav Yadav](https://github.com/Gamer337) · [linkedin.com/in/gauravyadav337](https://linkedin.com/in/gauravyadav337)*
