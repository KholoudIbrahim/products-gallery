# 🛒 Angular E-Commerce App

## 📝 Project Overview

This is a fully responsive e-commerce demo application built with **Angular 18**, **Tailwind CSS**, and powered by the [Fake Store API](https://fakestoreapi.com/). It includes complete features for product management, cart operations, user authentication, and checkout simulation.

### 🔑 Key Features

- 🔐 JWT Authentication with login/logout
- 🌙 Dark Mode Toggle (Tailwind + LocalStorage)
- 🛍 Product listing with CRUD operations, ratings, filtering, and searching
- 📦 Cart system with quantity control, persistent storage, and API sync, CRUD operations 
- 🧾 Product CRUD operations (Admin features)
- 👥 User management with modals (Add/Edit/Delete)
- 💳 Mock Checkout Form (in progress..)
- 🚀 Lazy-loaded feature modules
- 🛠 Angular Guards, Services, Observables & Reactive Forms

---

## 🖼 Screenshots

### 🛍 Products Grid with Ratings & Add to Cart, And add new product modal (light and dark mode)
![1](https://github.com/user-attachments/assets/f02209d4-ba90-4130-91b3-592b9f87c48d)
![5](https://github.com/user-attachments/assets/7d45cb8f-4f0a-46bd-a97e-5c2b72197f1f)
![2](https://github.com/user-attachments/assets/49e527f9-c67c-48b0-83ac-1880c72920b0)

### 🧺 Cart with Quantity Controls & Total Calculation  
![3](https://github.com/user-attachments/assets/3fe82b8e-d6db-43c0-aacd-db8a2e6710ad)

### 👤 User Management Modals (Admin)  
![4](https://github.com/user-attachments/assets/22507f7a-a5f8-408a-a04e-4abd3cd33203)

---

## 🧱 Tech Stack Used

| Layer             | Technology                     |
|------------------|--------------------------------|
| **Frontend**     | Angular 18.2.x (NgModules)     |
| **Styling**      | Tailwind CSS + SCSS            |
| **API**          | [Fake Store API](https://fakestoreapi.com/) |
| **Routing**      | Angular Router with Guards     |
| **Forms**        | Reactive Forms                 |
| **State**        | Services + RxJS + localStorage |
| **i18n**         | Angular i18n                   |
| **Build & Serve**| Angular CLI                    |
| **Deployment**   | Firebase / (Vercel) / Netli

---

## 🚀 How to Run

1. **Install dependencies:**

```bash
npm install
Run the development server:

ng serve
Navigate to:

http://localhost:4200
📁 Folder Structure
css

src/
├── app/
│   ├── components/
│   ├── services/
│   └── shared/
│        └── guards/
│        └── interceptors/
│        └── modules/
├── assets/
│   └── images/
├── environments/
├── styles/
└── index.html
🙋‍♀️ Author
Kholoud Elshami
🛠 Built for learning & demo purposes.

📜 License
This project is open-source and available under the MIT License.

