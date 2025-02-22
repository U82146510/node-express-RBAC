# Node.js Backend API

This repository contains a **Node.js backend** built using **Express.js, MongoDB, and TypeScript**. The API includes authentication, role-based access control, and CRUD operations for user management.

---

## 📌 Features
- **Authentication**: JWT-based authentication
- **Role-Based Access Control (RBAC)**: Admin, Editor, User
- **User Management**: Register, Login, Delete, View Users
- **MongoDB Integration**: Using Mongoose ORM
- **Data Validation**: Joi schema validation
- **Middleware**: Authentication and authorization layers
- **Error Handling**: Centralized error management
- **TypeScript Support**: Fully typed API

---

## 🚀 Getting Started

### 1️⃣ Clone the Repository
[https://github.com/U82146510/node-express-RBAC](https://github.com/U82146510/node-express-RBAC.git)
### 2️⃣ Install Dependencies
npm install
### 3️⃣ Setup Environment Variables
Create a `.env` file and configure:
MONGO_URI=mongodb+srv://<your-mongo-url> JWT_SECRET=your-secret-key PORT=5000

### 4️⃣ Start the Server


---

## 🛠 API Endpoints

### 🔹 Authentication Routes
| Method | Endpoint        | Description         |
|--------|----------------|---------------------|
| POST   | `/register`    | Register a new user |
| POST   | `/login`       | Login and get JWT  |

### 🔹 User Management
| Method | Endpoint       | Description        | Authorization |
|--------|---------------|--------------------|--------------|
| GET    | `/users`      | Fetch all users   | Admin, Editor, User |
| DELETE | `/users/:id`  | Delete a user     | Admin |

---

## 📂 Project Structure

/src ├── controllers/ │ ├── user_controller.ts ├── middlewares/ │ ├── auth.ts │ ├── rbac.ts ├── models/ │ ├── user_model.ts ├── routes/ │ ├── user_routes.ts ├── utils/ │ ├── error_handler.ts │ ├── connect_to_mongodb.ts ├── index.ts ├── types.d.ts

---

## ⚡ Built With
- **Node.js 23** (with experimental TypeScript support)
- **Express.js** (API framework)
- **MongoDB** + Mongoose (NoSQL database)
- **TypeScript** (Strict typing)
- **Joi** (Validation)
- **JWT** (Authentication)
- **Docker** (Containerization)

---

## 📌 Contributing
1. Fork the repository
2. Create a new branch (`git checkout -b feature-name`)
3. Commit your changes (`git commit -m "Added new feature"`)
4. Push to the branch (`git push origin feature-name`)
5. Open a **Pull Request**

---

## 📝 License
This project is licensed under the **MIT License**.

---

## 📧 Contact
- **Author**: Sandu Diaconu
- **GitHub**: [https://github.com/U82146510](https://github.com/U82146510)
- **Email**: diaconu.sandu@protonmail.com


