# AGENTS.md — health-data-analysis

## Project Overview
A direct and simple way to analyze health data from various sources
(currently Samsung Health). Provides advanced data visualizations,
metrics, and anonymous AI insights.

## Architecture
Full-stack monorepo with three top-level areas:

- `backend/` — Java 21 / Spring Boot REST API (Maven)
  - Package root: `com.health_data_analysis.backend`
  - Layers: `controller` → `service` → `repository` (JPA)
  - DTOs in `dto/`, domain entity in `model/`
  - Custom errors in `exception/` with a `GlobalExceptionHandler`
  - Flyway migrations in `src/main/resources/db/migration/`
  - Config: `src/main/resources/application.yaml`
- `frontend/` — React + TypeScript SPA (Vite)
  - API layer in `src/api/` (typed client)
  - Reusable components in `src/components/`
  - Route-level pages in `src/pages/` (home, dashboard, upload, about, 404)
  - Linting: ESLint + Prettier; Husky pre-commit hooks
- `scripts/` — cross-platform dev startup helpers (`dev.sh`, `dev.ps1`)

## Directory Map
```text
health-data-analysis/
├── backend/                          # Spring Boot API (Maven wrapper included)
│   ├── pom.xml
│   ├── mvnw / mvnw.cmd
│   └── src/
│       ├── main/java/com/health_data_analysis/backend/
│       │   ├── BackendApplication.java
│       │   ├── controller/UserController.java
│       │   ├── dto/UserRequest.java, UserResponse.java
│       │   ├── exception/ (GlobalExceptionHandler, DuplicateResourceException, NotFoundException)
│       │   ├── model/User.java
│       │   ├── repository/UserRepository.java
│       │   └── service/UserService.java
│       ├── main/resources/
│       │   ├── application.yaml
│       │   └── db/migration/V1__create_users.sql   # Flyway
│       └── test/java/...            # BackendApplicationTests, UserControllerTest
├── frontend/                         # React + TS (Vite)
│   ├── package.json
│   ├── vite.config.ts
│   ├── eslint.config.js
│   └── src/
│       ├── App.tsx, main.tsx, index.html, index.css
│       ├── api/          # client.ts, types.ts, users.ts
│       ├── components/   # footer.tsx, navbar/navbar.tsx
│       └── pages/        # home, dashboard, upload, about, notFound
├── scripts/                          # dev.sh (bash), dev.ps1 (PowerShell)
├── docker-compose.yml                # Local service orchestration (e.g., DB)
├── README.md
└── LICENSE
