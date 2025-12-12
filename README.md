***

# 🔐 Clerk Auth Custom Flow

![Project Status](https://img.shields.io/badge/status-active-success.svg)
![License](https://img.shields.io/badge/license-MIT-blue.svg)
![Frontend](https://img.shields.io/badge/frontend-React_%7C_Vite-61DAFB.svg)
![Backend](https://img.shields.io/badge/backend-Node.js_%7C_Express-339933.svg)
![Auth](https://img.shields.io/badge/auth-Clerk-6C47FF.svg)
![Database](https://img.shields.io/badge/database-Supabase-3ECF8E.svg)

> **A robust full-stack authentication starter kit bridging Clerk Authentication with a custom Node.js backend and Supabase database.**

---

## 📖 Description

**Clerk Auth Custom Flow** is a comprehensive full-stack template designed to demonstrate how to implement a custom authentication flow using **Clerk** as the identity provider, while maintaining your own user data in **Supabase** via a **Node.js/Express** backend.

Many developers struggle with synchronizing external auth providers (like Clerk) with their own database logic. This project solves that problem by implementing **Webhooks** to sync user data, **Role-Based Access Control (RBAC)** via middleware, and a protected frontend using **React** and **Shadcn UI**.

### 🚀 Why is this useful?
*   **Decoupled Logic:** Keeps authentication logic separate from business logic.
*   **Data Sync:** Automatically creates/updates users in your database when they sign up via Clerk.
*   **Security:** Demonstrates how to verify Clerk tokens on your own backend API.
*   **UI/UX:** Provides a clean, modern login and dashboard interface.

---

## ✨ Features

Based on the repository structure, this project includes:

*   **🔐 Custom Authentication:** Full Login and Sign-up flows using Clerk's SDK.
*   **🛡️ Role-Based Access Control:** Backend middleware (`adminMiddleware.js`, `userMiddleware.js`) to secure routes based on user roles.
*   **🪝 Webhook Synchronization:** A dedicated webhook endpoint to listen for Clerk events and sync user data to Supabase.
*   **🔒 Protected Routes:**
    *   **Frontend:** React components (`ProtectedRoutes.jsx`) that redirect unauthenticated users.
    *   **Backend:** JWT verification middleware.
*   **💅 Modern UI:** Built with **Tailwind CSS** and **Shadcn UI** components (Button, Card, Input, etc.).
*   **🗄️ Database Integration:** Schema and connection setup for Supabase.
*   **🧪 JWT Testing:** A dedicated page (`JwtTest.jsx`) to debug and inspect tokens.

---


## 🛠️ Technologies Used

### Frontend (`/FE`)
*   **React:** UI Library.
*   **Vite:** Build tool and development server.
*   **Clerk React SDK:** Authentication management.
*   **Tailwind CSS:** Utility-first styling.
*   **Shadcn UI:** Reusable UI components (inferred from `components/ui`).
*   **React Router Dom:** Client-side routing.

### Backend (`/BE`)
*   **Node.js & Express:** API Server.
*   **Supabase:** PostgreSQL Database.
*   **Svix:** Webhook signature verification (standard for Clerk webhooks).
*   **Clerk SDK:** Backend token verification.

---

## 📂 Project Structure

```bash
clerk-auth-custom-flow/
├── BE/                         # Backend (Node.js/Express)
│   ├── config.js               # Environment configuration
│   ├── db/                     # Database connection logic
│   ├── middleware/             # Auth & Role middleware (Admin/User)
│   ├── router/                 # API Routes (Admin, User, Webhooks)
│   ├── supabase/               # SQL Schemas
│   └── index.js                # Server entry point
├── FE/                         # Frontend (React/Vite)
│   ├── src/
│   │   ├── components/ui/      # Shadcn UI components
│   │   ├── pages/              # Login, Signup, Dashboard, Root
│   │   ├── routes/             # Protected route wrappers
│   │   └── lib/                # Utilities
│   └── vite.config.js          # Vite configuration
└── README.md
```

---

## ⚙️ Configuration

To run this project, you need to configure environment variables for both the Backend and Frontend.

### 1. Backend Setup (`/BE/.env`)
Create a `.env` file in the `BE` folder:

```env
PORT=3000
DATABASE_URL=your_supabase_connection_string
CLERK_PUBLISHABLE_KEY=pk_test_...
CLERK_SECRET_KEY=sk_test_...
WEBHOOK_SECRET=whsec_...  # From Clerk Dashboard > Webhooks
```

### 2. Frontend Setup (`/FE/.env`)
Create a `.env` file in the `FE` folder:

```env
VITE_CLERK_PUBLISHABLE_KEY=pk_test_...
VITE_API_URL=http://localhost:3000
```

---

## 📥 Installation

Follow these steps to get the project running locally.

### Prerequisites
*   Node.js (v18+)
*   npm or yarn
*   A Clerk Account
*   A Supabase Project

### Step 1: Clone the Repository
```bash
git clone https://github.com/aradhyacp/clerk-auth-custom-flow.git
cd clerk-auth-custom-flow
```

### Step 2: Backend Installation
```bash
cd BE
npm install
# Ensure you have set up the .env file as shown above
npm start
```
*The backend server typically runs on `http://localhost:3000`.*

### Step 3: Frontend Installation
Open a new terminal:
```bash
cd FE
npm install
# Ensure you have set up the .env file as shown above
npm run dev
```
*The frontend will typically run on `http://localhost:5173`.*

---

## 🚦 Usage

1.  **Database Setup:** Copy the contents of `BE/supabase/schema.txt` and run it in your Supabase SQL Editor to create the necessary tables.
2.  **Webhook Setup:**
    *   Go to your Clerk Dashboard.
    *   Create a Webhook pointing to your backend (e.g., `ngrok` URL if local + `/api/webhook`).
    *   Subscribe to `user.created` and `user.updated` events.
3.  **Run the App:**
    *   Navigate to the Frontend URL.
    *   Sign up using the Clerk UI.
    *   Check your Supabase database; the user should appear in your custom table.
    *   Try accessing the `Dashboard`; it should only work if you are logged in.

---

## 🤝 Contributing

Contributions are welcome! If you'd like to improve the authorization flow or add new UI components:

1.  Fork the repository.
2.  Create a new branch (`git checkout -b feature/AmazingFeature`).
3.  Commit your changes (`git commit -m 'Add some AmazingFeature'`).
4.  Push to the branch (`git push origin feature/AmazingFeature`).
5.  Open a Pull Request.

---

## 📄 License

This project is licensed under the **MIT License**.

---

## 📞 Contact & Support

If you encounter any issues or have questions regarding the custom auth flow:

*   **Open an Issue:** [GitHub Issues](https://github.com/aradhyacp/clerk-auth-custom-flow/issues)
*   **Contact:** Aradhya - [GitHub Profile](https://github.com/aradhyacp)

---

## 🙏 Acknowledgements

*   [Clerk.com](https://clerk.com/) for the amazing Auth SDK.
*   [Supabase](https://supabase.com/) for the database infrastructure.
*   [Shadcn UI](https://ui.shadcn.com/) for the beautiful component library.
