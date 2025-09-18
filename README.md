# Digital Krishi Officer 🌾

**Digital Krishi Officer** is a web-based platform designed to assist farmers with agricultural decisions. It provides information about pesticides, farming machines, study resources, and AI-based chatbot support, with a full-featured shopping cart and authentication system.  

---

## Features

### General Features
- Responsive and mobile-friendly design using **React.js** and **Tailwind CSS**.
- Navigation bar with dynamic cart and user authentication status.
- Home landing page with Hero section and features overview.
- Multi-page SPA with smooth navigation.

### User Features
- **Authentication**: Signup, Login, and Logout.
- **Shopping Cart**: Add pesticides or machines to cart, update quantities, remove items.
- **AI ChatBot**: Ask questions related to agriculture (accessible after login).
- **Study & Learn Section**: Educational resources for farming practices.

---

## Tech Stack

- **Frontend**: React.js, Tailwind CSS, Lucide React Icons, React Hot Toast
- **Backend**: Node.js, Express.js
- **Database**: MongoDB (with Mongoose)
- **Authentication**: JWT + bcrypt
- **Others**: LocalStorage for cart persistence  

---

## Folder Structure
```client/
├─ src/
│ ├─ components/
│ │ ├─ Navbar.jsx
│ │ ├─ Hero.jsx
│ │ └─ Features.jsx
│ ├─ pages/
│ │ ├─ StudyLearn.jsx
│ │ ├─ Pesticides.jsx
│ │ ├─ FarmingMachines.jsx
│ │ ├─ Cart.jsx
│ │ ├─ Login.jsx
│ │ ├─ Signup.jsx
│ │ └─ Chatbot.jsx
│ └─ App.jsx
└─ index.js
server/
├─ routes/
│ └─ auth.js
├─ model/
│ └─ User.js
└─ server.js
```

---

## Setup & Installation

1. **Clone the repository**  
```bash
git clone <your-repo-url>
cd Digital-Krishi-Officer
```
2.**Install dependencies for frontend and backend**
```
# Frontend
cd client
npm install

# Backend
cd ../server
npm install
```
3.**Set up environment variables**
Create a .env file in server/ with:
```
PORT=5000
MONGODB_URI=<your-mongodb-uri>
JWT_SECRET=<your-secret-key>
```
4.**Run the project**
```
# Start backend
cd server
npm start

# Start frontend
cd ../client
npm run dev
```
---
##Usage

- Browse products under Pesticides and Farming Machines.
- Add items to your cart and manage quantities.
- Signup/Login to access the AI ChatBot and save cart data.
- Explore educational resources under Study & Learn.




