# SkillSwap 💡🔁

SkillSwap is a dynamic skill-bartering web application where users can **offer** and **request** skills in exchange — no money involved! Whether you're a coder, designer, artist, or language learner, SkillSwap creates a space where learning is mutual, accessible, and engaging.

> 🚀 Access the live application here: [SKillSwap Live Website](https://skillswap-471.web.app/)

---

> 🛠 [GitHub (Client Repository)](https://github.com/ranak8811/SkillSwap-Client.git)
> 🛠 [GitHub (Server Repository)](https://github.com/ranak8811/SkillSwap-Server.git)

---

## 📌 Project Purpose

SkillSwap was built to empower people to **learn new skills** and **share what they know** through a barter-based exchange system. Users can connect with others, offer help, request assistance, and grow together — all without monetary transactions. The platform also includes an **admin dashboard** for managing content, users, and platform improvements.

---

## ✨ Key Features

### 👤 User Features

- User Registration & Login (Firebase Authentication)
- Update Profile (bio, location)
- Offer a Skill (title, description, category)
- Request a Skill (title, description, category)
- Send/Accept/Reject Exchange Requests
- Share Skills via Facebook & WhatsApp
- Rate & Review Users After Skill Exchange
- Save Skill Offers or Requests for Later
- Set Skill Availability Status (Available / Unavailable)
- View Trending Skills

### 🛠 Admin Features

- Manage User Accounts (change role, delete)
- Manage Reported Users & Content
- Add/Edit/Delete Skill Categories
- View & Update User Suggestions (Asked, Maybe Later, Done)

---

## 🔗 Live URL

🌐 [https://skillswap-471.web.app/](https://skillswap-471.web.app/)

---

## 🧰 Tech Stack & Dependencies

### 🌐 Frontend

Built with **React + Tailwind CSS + DaisyUI**:

| Package                   | Description                                |
| ------------------------- | ------------------------------------------ |
| `react`                   | Frontend framework                         |
| `react-router-dom`        | Client-side routing                        |
| `@tailwindcss/vite`       | Tailwind + Vite integration                |
| `tailwindcss`             | Utility-first CSS framework                |
| `daisyui`                 | Tailwind CSS components                    |
| `@tanstack/react-query`   | Data fetching and caching                  |
| `axios`                   | HTTP requests                              |
| `firebase`                | Authentication & hosting                   |
| `react-hot-toast`         | Notification system                        |
| `framer-motion`           | Animations                                 |
| `lottie-react`            | Lottie animations                          |
| `react-icons`             | Icon support                               |
| `react-tooltip`           | Tooltips                                   |
| `animate.css`             | CSS animations                             |
| `date-fns`                | Date formatting                            |
| `recharts`                | Charting library                           |
| `react-simple-typewriter` | Typewriter animation                       |
| `react-share`             | Social media sharing                       |
| `@headlessui/react`       | UI components (used internally by daisyUI) |
| `sweetalert2`             | Custom alert modals                        |

### 🌐 Backend

Built with **Express.js + MongoDB**:

| Package        | Description                     |
| -------------- | ------------------------------- |
| `express`      | Server framework                |
| `mongodb`      | MongoDB driver                  |
| `cors`         | Cross-origin resource sharing   |
| `dotenv`       | Environment variable management |
| `jsonwebtoken` | JWT-based authentication        |
| `morgan`       | Logging middleware              |

---

## 🛠 How to Run Locally

## Installation Instructions

1. Clone the repository:

   **Frontend**

   ```bash
   git clone https://github.com/ranak8811/SkillSwap-Client.git
   cd SkillSwap-Client
   npm install
   ```

   **Backend**

   ```bash
   git clone https://github.com/ranak8811/SkillSwap-Server.git
   cd SkillSwap-Server
   npm install
   ```

2. Set up environment variables:

   - Create a `.env.local` file in the frontend directory.
   - Add the following varibales

     ```env
     VITE_apiKey=Collect this from firebase for your project
     VITE_authDomain=Collect this from firebase for your project
     VITE_projectId=Collect this from firebase for your project
     VITE_storageBucket=Collect this from firebase for your project
     VITE_messagingSenderId=Collect this from firebase for your project
     VITE_appId=Collect this from firebase for your project

     # VITE_API_URL=http://localhost:4000

     VITE_IMGBB_API_KEY=Collect this from https://imgbb.com/ for your project
     ```

   - Create a `.env` file in the backend directory.
   - Add the following variables:
     ```env
     DB_USER=Collect this from MONGODB database for your project
     DB_PASS=Collect this from MONGODB database for your project
     ```

3. Start the application:

   - Backend:
     ```bash
     nodemon index.js
     ```
   - Frontend:
     ```bash
     npm run dev
     ```

4. Open your browser and navigate to `http://localhost:4000`.

5. Open your browser and navigate to `http://localhost:5173`.

---

## Backend Repository

Backend code link: https://github.com/ranak8811/SkillSwap-Server.git

---

## Contribution

Contributions are welcome! Feel free to fork the repository and submit pull requests.

---

Thank you for visiting SkillSwap. Join the community and start sharing your skills today!
