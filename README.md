# eTuitionBd - Tuition Management System (Client)

A comprehensive front-end platform for managing tuition activities, connecting students, tutors, and administrators. This project is built according to the specified requirements for the B12-A11 job task.

## 🔗 Live Demo

The application is deployed and accessible at:
[eTuitionBd Live Site](https://etuitionbd-12154.web.app/)

## 🌟 Features

The application is a fully functional, role-based platform with the following core features as outlined in the requirements:

### 🔐 Authentication & Security

- **Role-Based Access:** Separate dashboards and protected routes for Student, Tutor, and Admin roles.
- **Multiple Login Options:** Traditional Email & Password login, and mandatory Google Social Login (default role: Student).
- **Secure Routing:** JWT token generation and verification for Role, Access Level, and Token Expiration to protect routes from unauthorized access or redirects on reload.
- **User Registration:** Allows registration as either a Student or a Tutor, capturing Name, Email, Password, Role, and Phone number, with data stored in MongoDB and authenticated via Firebase.

### 🔄 Core Workflows

#### 1. Student Functionalities

- **Tuition Posting:** Create, Update, and Delete tuition requests (posts are initially set to **Pending** for Admin approval).
- **Tutor Approval:** Review tutor applications and approve a tutor, which triggers a mandatory redirect to a **Stripe Checkout/Payment page** to complete the hiring. The tutor is only marked as **Approved** upon successful payment.
- **Tracking:** View My Tuitions, Applied Tutors, and Payment History.

#### 2. Tutor Functionalities

- **Application Process:** Apply to tuition posts via a modal form, providing Qualifications, Experience, and Expected Salary.
- **Tracking:** View **My Applications** status and **Tutor Ongoing Tuitions** (approved by a student).
- **Financials:** View **Revenue History** for total earnings and transactions.

#### 3. Admin Functionalities

- **User Management:** View, Update, Delete user accounts, and Modify user roles (Student, Tutor, Admin).
- **Tuition Management:** Review and manually Approve/Reject newly submitted tuition posts.
- **Analytics:** View **Reports & Analytics** for total platform earnings and successful transaction history.

### 🖥️ UI/UX & Advanced Features

- **Design:** Full-width, responsive layout with a consistent color theme, heading styles, and button designs.
- **Animation:** Minimum of two required animations using **Framer Motion** on the Home Page.
- **Dynamic Sections:** Home page displays dynamic sections for **Latest Tuition Posts** and **Latest Tutors**.
- **Challenge Features:**
  - Search tuitions by subject/location.
  - Sort tuitions by budget/date.
  - Implement **Pagination** on the Tuition Listing page.
  - Advanced Filter options (class, subject, location).

## 🛠️ Technologies Used

This project's front-end (`eTuitionBD`) is built using the following technologies and packages:

| Category             | Technology/Package                                                   | Description                                                                     |
| :------------------- | :------------------------------------------------------------------- | :------------------------------------------------------------------------------ |
| **Core Framework**   | `react`, `react-dom`, `vite`                                         | Building the user interface with React and a fast development setup with Vite.  |
| **Styling & UI**     | `tailwindcss`, `daisyui`, `styled-components`                        | Utility-first CSS framework with a component library and CSS-in-JS for styling. |
| **Routing**          | `react-router`                                                       | Client-side routing for the application.                                        |
| **State Management** | `@tanstack/react-query`                                              | Data fetching, caching, and state management for asynchronous data.             |
| **Authentication**   | `firebase`                                                           | Handling user authentication (Email/Password, Google).                          |
| **Animation**        | `framer-motion`                                                      | Declarative library for motion and animation.                                   |
| **HTTP Client**      | `axios`                                                              | Promise-based HTTP client for making API requests.                              |
| **Forms & Utils**    | `react-hook-form`, `sweetalert2`, `date-fns`                         | Efficient form management, custom alerts, and date utility functions.           |
| **UI Components**    | `lucide-react`, `react-icons`, `swiper`, `react-responsive-carousel` | Icons, carousels, and other UI building blocks.                                 |
| **Data Viz**         | `recharts`                                                           | Composable charting library for analytics (Admin Dashboard).                    |

## 🚀 Setup & Installation

To run this project locally, follow these steps:

### Prerequisites

- Node.js (LTS version recommended)
- The corresponding backend server for the Tuition Management System must be running.

### Steps

1.  **Clone the repository:**

    ```bash
    git clone [Your-GitHub-Client-Repository-Link-Here]
    cd etuitionbd-client
    ```

2.  **Install dependencies:**

    ```bash
    npm install
    ```

3.  **Configure Environment Variables:**
    Create a file named `.env` in the root of the project to store your Firebase configuration and backend API URL.
    **_(Note: Firebase keys must be stored in environment variables.)_**

    ```
    # Example .env file content
    VITE_FIREBASE_API_KEY=YOUR_FIREBASE_API_KEY
    VITE_FIREBASE_AUTH_DOMAIN=YOUR_FIREBASE_AUTH_DOMAIN
    VITE_API_URL=YOUR_BACKEND_API_URL
    # ... include all other necessary Firebase keys
    ```

4.  **Run the development server:**
    ```bash
    npm run dev
    ```
    The application will typically start at `http://localhost:5173`.
