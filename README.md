# 💰 Finance Tracker

A **full-stack finance tracking app** built with **Next.js 15, Clerk authentication, Drizzle ORM, and Neon serverless Postgres**.
It provides **secure auth, income/expense tracking, rich data visualization, and real-time summaries** — helping you stay on top of your money.

---

## ✨ Features

* 🔐 **Authentication with Clerk** (sign in, sign up, user management)
* 🗄 **Database with Drizzle ORM + Neon Postgres** (schema-first, migrations, typesafe queries)
* ⚡ **API layer with Hono** for lightweight server routes & validation with Zod
* 📊 **Finance features**:

  * Add income & expenses
  * Auto-detect income vs. expense
  * Summaries (remaining balance, changes, categories, daily breakdowns)
  * Charts with **Recharts**
* 🎨 **Modern UI/UX**:

  * Radix UI components (tooltip, dialog, dropdown, popover)
  * TailwindCSS + class-variance-authority + tailwind-merge
  * Dark mode with `next-themes`
* 🧩 **State management with Zustand**
* 🔄 **React Query** for caching & server sync
* ✅ Form handling with `react-hook-form` + Zod validation

---

## 🛠️ Tech Stack

* **Frontend:** Next.js 15, React 19, TailwindCSS 4, Radix UI, Zustand
* **Backend / API:** Hono, Clerk, Drizzle ORM, Neon (serverless Postgres)
* **Data Layer:** React Query, React Table, Drizzle Zod
* **Utilities:** date-fns, react-currency-input-field, react-day-picker, react-countup, recharts
* **Dev Tools:** ESLint, TypeScript 5, Drizzle Kit, tsx

---

## 🚀 Getting Started

### 1. Clone the repo

```bash
git clone https://github.com/your-username/finance-tracker.git
cd finance-tracker
```

### 2. Install dependencies

```bash
npm install
# or
yarn install
```

### 3. Setup environment variables

Create a **.env.local** file with:

```env
DATABASE_URL="your_neon_postgres_connection_url"
CLERK_PUBLISHABLE_KEY="your_clerk_publishable_key"
CLERK_SECRET_KEY="your_clerk_secret_key"
```

### 4. Run database migrations

```bash
npm run db:generate
npm run db:migrate
```

### 5. Run the development server

```bash
npm run dev
```

App runs at **[http://localhost:3000](http://localhost:3000)**

---
