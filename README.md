# 🛒 Angular E-Commerce App

## 📝 Project Overview

This is a fully responsive e-commerce demo application built with **Angular 18**, **Tailwind CSS**, and powered by the [Fake Store API](https://fakestoreapi.com/). It includes complete features for product management, cart operations, user authentication, and checkout simulation.

### 🔑 Key Features

- 🔐 JWT Authentication with login/logout
- 🌙 Dark Mode Toggle (Tailwind + LocalStorage)
- 🌍 Internationalization (i18n) ready
- 🛍 Product listing with ratings, filtering & pagination
- 📦 Cart system with quantity control, persistent storage, and API sync
- 🧾 Product CRUD operations (Admin features)
- 👥 User management with modals (Add/Edit/Delete)
- 💳 Mock Checkout Form
- 🚀 Lazy-loaded feature modules
- 🛠 Angular Guards, Services, Observables & Reactive Forms

---

## 🖼 Screenshots

### 🏠 Home Page with Dark Mode & Cart Badge  
![Home with Cart](screenshots/home-dark-cart.png)

### 🛍 Products Grid with Ratings & Add to Cart  
![Product Cards](screenshots/products-grid.png)

### 🧺 Cart with Quantity Controls & Total Calculation  
![Cart View](screenshots/cart-quantity.png)

### 👤 User Management Modals (Admin)  
![Users Modal](screenshots/user-management.png)

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
│   ├── models/
│   ├── guards/
│   ├── modules/ (Lazy Loaded)
│   └── shared/
├── assets/
│   └── i18n/
├── environments/
├── styles/
└── index.html
🙋‍♀️ Author
Kholoud Elshami
🛠 Built for learning & demo purposes.

📜 License
This project is open-source and available under the MIT License.

---

### ✅ To Complete This README:


