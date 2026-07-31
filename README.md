# 🚚 ZapShift - Parcel Delivery Management System (Frontend)

ZapShift is a modern parcel delivery management web application where users can send parcels, manage their deliveries, and track their parcel information easily.

The application provides a smooth user experience with authentication, protected routes, dynamic forms, API integration, and server state management.

---

## 🌐 Live Website

(Add your live website link here)

---

# ✨ Features

## 🔐 Authentication System

- User Registration
- Email & Password Login
- Firebase Authentication
- User Profile Update
- Protected Dashboard Routes

---

## 📦 Parcel Management

- Send Parcel functionality
- Dynamic parcel form
- Document / Non-document parcel selection
- Parcel weight calculation
- Automatic delivery cost calculation
- Sender and Receiver information handling
- Region and District dependent selection
- Covered area selection

---

## 📋 User Dashboard

- View personal parcel list
- Fetch only logged-in user's parcels
- Manage user's parcel information

---

## 🖼️ Image Upload

- User profile image upload
- Cloudinary image hosting integration

---

## 💰 Parcel Pricing System

Delivery cost is calculated dynamically based on:

- Parcel type
- Parcel weight
- Same district delivery
- Different district delivery

---

# 🛠️ Technologies Used

## Frontend Technologies

- React.js
- Vite
- React Router
- Tailwind CSS
- DaisyUI

## State & Data Management

- TanStack Query (React Query)
- Axios

## Form Handling

- React Hook Form

## Authentication

- Firebase Authentication

## Image Hosting

- Cloudinary

## UI & Alerts

- SweetAlert2

## Development Tools

- Git
- GitHub
- VS Code

---

# ⚡ TanStack Query Usage

TanStack Query is used for managing server-side data and API state.

In this project, it is used for:

### Fetching User Parcel Data

After login, the user's email is used to fetch only their own parcels.

Flow:
Firebase User
|
|
user.email
|
|
TanStack Query (useQuery)
|
|
Axios API Request
|
|
Express Server
|
|
MongoDB

Example:

```javascript
useQuery({
  queryKey: ["my-parcel", user?.email],

  queryFn: async () => {
    const res = await axiosSecure.get(
      `/parcel?email=${user.email}`
    );

    return res.data;
  },

  enabled: !!user?.email,
});

Benefits:

Automatic caching
Avoid unnecessary API calls
Loading state management
Server state synchronization
Better user experience
📡 API Communication

Axios is used for communicating with the backend server.

Example:

GET /parcel?email=user@gmail.com

This API returns only the authenticated user's parcel information.

🔑 Environment Variables

Create a .env.local file:

VITE_apiKey=your_firebase_api_key
VITE_authDomain=your_auth_domain
VITE_projectId=your_project_id
VITE_storageBucket=your_storage_bucket
VITE_messagingSenderId=your_sender_id
VITE_appId=your_app_id

VITE_CLOUDINARY_CLOUD_NAME=your_cloud_name
VITE_CLOUDINARY_UPLOAD_PRESET=your_upload_preset
📂 Project Structure
src
│
├── assets
│
├── components
│
├── firebase
│
├── hooks
│   ├── useAuth.jsx
│   └── useAxiosSecure.jsx
│
├── layouts
│
├── pages
│   ├── Home
│   ├── Authentication
│   ├── Dashboard
│   └── SendParcel
│
├── routes
│
├── App.jsx
└── main.jsx
⚙️ Installation

Clone the repository:

git clone your-client-repository-link

Go to project directory:

cd zap-shift-client

Install dependencies:

npm install

Run the project:

npm run dev
🔄 Application Workflow
User
 |
 |
Firebase Authentication
 |
 |
Protected Route
 |
 |
Dashboard
 |
 |
Send Parcel Form
 |
 |
Axios Request
 |
 |
Backend API
 |
 |
MongoDB Database
🚀 Future Improvements
Online payment integration
Parcel tracking system
Admin dashboard
Delivery agent management
Real-time parcel status
Notification system
👨‍💻 Developer
Anik Ghosh

MERN Stack Developer

⭐ If you like this project, please give it a star.



```
