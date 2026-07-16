# 🏦 LoanFlow Enterprise

A secure, enterprise-style Loan Management System built with **Java
21**, **Spring Boot 3**, **React**, **TypeScript**, **JWT
Authentication**, **Spring Security**, and **PostgreSQL**.

LoanFlow Enterprise is an enterprise-style full-stack application that demonstrates modern software engineering practices including layered architecture, secure authentication, RESTful APIs, containerization, CI/CD, and cloud deployment.

---

## 🌐 Live Demo

-   **Frontend:** https://loanflow-enterprise.vercel.app
-   **Backend API:** https://loanflow-api-gdf7.onrender.com
-   **Swagger UI:**
    https://loanflow-api-gdf7.onrender.com/swagger-ui/index.html
-   **GitHub:** https://github.com/lalithaaluri/loanflow-enterprise

> **Note:** The Render backend may take 30--60 seconds to wake up if it
> has been idle.

---

# 📑 Table of Contents

-   Project Overview
-   Features
-   Technology Stack
-   Architecture
-   Project Structure
-   Installation Guide
-   Docker
-   API Endpoints
-   JWT Authentication Flow
-   Screenshots
-   Future Enhancements
-   Author

---

# 📖 Project Overview

LoanFlow Enterprise is a modern full-stack Loan Management System that
allows administrators and loan officers to manage customers, process
loan applications, approve or reject loans, and monitor business KPIs
through a responsive dashboard.

The project was designed to demonstrate enterprise Java Full Stack
development using Spring Boot, React, JWT authentication, layered
architecture, JPA/Hibernate, Docker, GitHub Actions, and cloud
deployment.

---
## ⭐ Project Highlights

- Enterprise layered architecture
- Secure JWT Authentication
- Role-based authorization
- Spring Boot REST APIs
- PostgreSQL with Hibernate/JPA
- Responsive React + TypeScript frontend
- Docker & Docker Compose
- GitHub Actions CI
- Render backend deployment
- Vercel frontend deployment

---

# ✨ Features

## Backend

-   Java 21
-   Spring Boot 3
-   Spring Security
-   JWT Authentication
-   Role-Based Authorization (ADMIN / LOAN_OFFICER)
-   Customer CRUD
-   Loan CRUD
-   Loan Approval & Rejection
-   REST APIs
-   Spring Data JPA
-   Hibernate ORM
-   PostgreSQL
-   Global Exception Handling
-   Swagger / OpenAPI
-   Demo data initialization
-   CORS configuration

## Frontend

-   React + TypeScript + Vite
-   Protected Routes
-   Login / Logout
-   Dashboard
-   KPI Cards
-   Loan Status Charts
-   Recent Loans
-   Customer Management
-   Loan Management
-   Search
-   Filtering
-   Pagination
-   Shared API Configuration
-   Responsive UI

## DevOps

-   Docker
-   Docker Compose
-   GitHub Actions
-   Render Deployment
-   Vercel Deployment

---

# 💻 Technology Stack

## Backend

Technology        Purpose
  ----------------- ----------------------
Java 21           Programming Language
Spring Boot 3     Backend Framework
Spring Security   Security
JWT               Authentication
Spring Data JPA   Persistence
Hibernate         ORM
PostgreSQL        Database
Maven             Build Tool
Swagger           API Documentation

## Frontend

Technology     Purpose
  -------------- --------------------
React          UI
TypeScript     Type Safety
Vite           Build Tool
React Router   Routing
Fetch API      REST Communication
Recharts       Charts

## DevOps

Technology       Purpose
  ---------------- ---------------------
Docker           Containerization
Docker Compose   Local orchestration
GitHub Actions   CI
Render           Backend Hosting
Vercel           Frontend Hosting

---

# 🏗️ Architecture

```text
React + TypeScript + Vite
          │
          │ HTTPS + JWT
          ▼
Spring Security Filter Chain
          ▼
REST Controllers
          ▼
Service Layer
          ▼
Repository Layer
          ▼
Hibernate / JPA
          ▼
PostgreSQL
```

## 🚀 Deployment Architecture

```text
Developer
     │
     ▼
GitHub Repository
     │
     ▼
GitHub Actions
     │
     ├──────────────┐
     ▼              ▼
 Render          Vercel
(Spring Boot)   (React)
     │
     ▼
 PostgreSQL
```
---

# 📁 Project Structure

``` text
loanflow
├── src/main/java/com/lalitha/loanflow
│   ├── config
│   ├── controller
│   ├── dto
│   ├── exception
│   ├── model
│   ├── repository
│   ├── security
│   └── service
├── loanflow-frontend
│   └── src
│       ├── components
│       ├── config
│       ├── layouts
│       ├── pages
│       ├── services
│       └── types
├── Dockerfile
├── docker-compose.yml
└── README.md
```

---
# ⚙️ Installation Guide

## Backend

``` bash
mvn clean install
mvn spring-boot:run
```

Backend: http://localhost:8080

Swagger: http://localhost:8080/swagger-ui/index.html

## Frontend

Create `.env`

``` env
VITE_API_BASE_URL=http://localhost:8080
```

Run:

``` bash
cd loanflow-frontend
pnpm install
pnpm dev
```

Frontend: http://localhost:5173

---

# 🐳 Docker

Run the complete application using Docker Compose:

```bash
docker compose up --build
```

This starts:

- PostgreSQL
- Spring Boot Backend
- React Frontend

Backend:
http://localhost:8080

Frontend:
http://localhost:3000

---

# 🔗 API Endpoints

## Authentication

POST `/api/auth/login`

## Customers

GET, POST `/api/customers`

PUT, DELETE `/api/customers/{id}`

## Loans

GET, POST `/api/loans`

PUT, DELETE `/api/loans/{id}`

PUT `/api/loans/{id}/approve`

PUT `/api/loans/{id}/reject`

---

# 🔐 JWT Authentication Flow

``` text
Login
 ↓
React Login Page
 ↓
POST /api/auth/login
 ↓
Spring Boot Authentication
 ↓
JWT Generated
 ↓
Stored in localStorage
 ↓
Authorization: Bearer <JWT>
 ↓
JWT Filter
 ↓
Controller
 ↓
Service
 ↓
Repository
 ↓
PostgreSQL
```

---

## 🔑 Demo Credentials

| Role | Username | Password |
|------|----------|----------|
| Administrator | admin | admin123 |

---
# 📸 Screenshots

## 📸 Application Screenshots

### Login

![Login](screenshots/login.png)

---

### Dashboard

![Dashboard](screenshots/dashboard.png)

---

### Customers

![Customers](screenshots/customers.png)

---

### Loans

![Loans](screenshots/loans.png)

---

### Swagger

![Swagger](screenshots/swagger.png)

---

# 🚀 Future Enhancements

- Unit and Integration Testing (JUnit & Mockito)
- Refresh Token Authentication
- Audit Logging
- Email Notifications
- CSV/PDF Export
- Advanced Dashboard Analytics
- AWS / Azure Deployment

---

# 👨‍💻 Author

**Lalitha Kumari**

Java Full Stack Developer

Technologies:

-   Java
-   Spring Boot
-   Spring Security
-   React
-   TypeScript
-   PostgreSQL
-   Docker
-   JWT
-   REST APIs

---

# 📄 License

This project is intended for learning, portfolio demonstration, and
professional showcase purposes.
