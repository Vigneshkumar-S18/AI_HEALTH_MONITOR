# MedFlow AI - Phase 1: Smart Hospital Management Platform

MedFlow AI Phase 1 is an enterprise-grade, multi-tenant Hospital Management System (HMS) designed to digitize end-to-end multi-specialty hospital operations.

---

## 🏛️ System Architecture

MedFlow AI uses a clean, modular architecture designed for operational speed, strict multi-tenant data isolation, role-based access control, and seamless future integration with Phase 3 AI plugins (Ambient Clinical Intelligence, LLM documentation, and voice processing).

```
  +-----------------------------------------------------------------------+
  |                             React 19 Frontend                         |
  | (Vite, TypeScript, TailwindCSS, Lucide Icons, Recharts, Context API)  |
  +-----------------------------------+-----------------------------------+
                                      |
                     REST API / JSON  | Bearer JWT + X-Hospital-ID
                                      v
  +-----------------------------------------------------------------------+
  |                           Node 22 Express Backend                     |
  |  (TypeScript, Prisma ORM, Helmet, Rate Limiter, Zod Validation)       |
  +-----------------------------------+-----------------------------------+
                                      |
                  +-------------------+-------------------+
                  |                                       |
                  v                                       v
  +-------------------------------+       +-------------------------------+
  |       PostgreSQL Database     |       |          Redis Cache          |
  | (Multi-Tenant Row Isolation)  |       | (Session & Rate Limiting State)|
  +-------------------------------+       +-------------------------------+
```

---

## 🚀 Key Modules & Capabilities

1. **Multi-Tenancy**: All database models are scoped by `hospital_id`.
2. **7 Tailored Role Perspectives**:
   - 👔 **Hospital Administrator**: Executive analytics, revenue charts, bed occupancy, audit logs.
   - 🩺 **Doctor Workspace**: OPD patient queue, clinical consultation modal, SOAP notes logger, prescription generation.
   - 📋 **Reception Console**: Walk-in registration, token dispenser, appointment scheduler.
   - 💉 **Nurse Station**: Ward bed grid, patient vitals recording modal.
   - 🔬 **Diagnostic Laboratory**: Pending test worklist, result entry, verified PDF report publishing.
   - 💊 **Central Pharmacy**: Medicine inventory, stock reorder alerts, prescription validation & barcode dispensing.
   - 👤 **Patient Portal**: Vitals history, active prescriptions, lab report downloads, upcoming visits.
3. **Phase 3 AI Compatibility**: Event-driven hooks (`onPrescriptionCreated`, `onLabReportReady`, `onVitalAlert`) are built into the services for non-disruptive AI integration in Phase 3.

---

## 🔑 Quick Test Credentials

All demo accounts use password: `Password123!`

- **Admin**: `admin@medflow.com`
- **Doctor**: `doctor@medflow.com`
- **Reception**: `receptionist@medflow.com`
- **Nurse**: `nurse@medflow.com`
- **Lab Tech**: `labtech@medflow.com`
- **Pharmacist**: `pharmacist@medflow.com`
- **Patient**: `patient@medflow.com`

*Note: The frontend includes a one-click Quick Role Switcher on the Login page and Top Header bar for instant perspective switching.*

---

## 🛠️ Local Development Setup

### 1. Install Dependencies
```bash
npm run setup
```

### 2. Configure Environment
Copy `.env.example` to `.env` in the backend folder:
```bash
cp .env.example backend/.env
```

### 3. Initialize & Seed Database
```bash
cd backend
npx prisma db push
npx ts-node prisma/seed.ts
```

### 4. Run Servers
```bash
# Terminal 1 - Backend API (Port 5000)
npm run dev:backend

# Terminal 2 - Frontend App (Port 5173)
npm run dev:frontend
```

---

## 🐳 Docker Deployment

To launch the full production environment (PostgreSQL, Redis, Express Backend, Nginx Frontend):

```bash
docker-compose up --build -d
```

- **Web Application**: `http://localhost` (or `http://localhost:5173` in dev)
- **Backend API**: `http://localhost:5000/api/v1`
- **API Healthcheck**: `http://localhost:5000/health`
