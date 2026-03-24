# 🚀 Golf Charity Subscription Platform

> 🚀 Built for Digital Heroes Full Stack Developer Assignment

A full-stack web application that combines subscription-based access, golf score tracking, monthly draw rewards, and charity contributions into one interactive platform.

---

## 🌐 Live Links

* ⚙️ Backend API (Render): https://subscription-site-r12p.onrender.com
* 🚀 Frontend (Vercel): https://subscription-site-r12p.onrender.com

---

## 🧪 API Test

* Check server:
  https://subscription-site-r12p.onrender.com/

* Example endpoints:

  * POST /api/auth/signup
  * POST /api/auth/login
  * POST /api/score
  * GET /api/score
  * POST /api/draw

---

## 🔥 Features

* 🔐 User Authentication (Signup/Login)
* 💳 Subscription System (Monthly / Yearly)
* ⛳ Score Management (Last 5 scores logic)
* 🎯 Draw System (Random number matching)
* ❤️ Charity Selection
* 📊 User Dashboard
* 🛠️ Admin Panel (Draw + User Management)

---

## 🛠️ Tech Stack

* Frontend: React
* Backend: Node.js + Express
* Database: Supabase (PostgreSQL)
* Authentication: JWT

---

## 🧪 How to Test

1. Open frontend link
2. Signup a new user
3. Subscribe to a plan
4. Add golf scores (1–45)
5. Check dashboard
6. View draw results

---

## 📁 Project Structure

client/ → Frontend
server/ → Backend

---

## 🔑 Test Credentials

Admin Login:

* Email: [admin@golfcharity.com](mailto:admin@golfcharity.com)
* Password: admin123

---

## ⚙️ Key Functionalities

### ✅ Score System

* Stores only last 5 scores
* Automatically removes oldest score
* Displays latest scores first

### 🎯 Draw System

* Generates 5 random numbers (1–45)
* Matches with user scores
* Prize logic:

  * 5 match → Jackpot
  * 4 match → Medium prize
  * 3 match → Small prize

### ❤️ Charity System

* User selects charity
* Contribution percentage stored
* Supports donation-based engagement

---

## 📌 Note

This project demonstrates:

* Full Stack Development
* API Design
* Database Management
* Real-world business logic implementation

---

## 🚀 Future Improvements

* Stripe payment integration
* Email notifications
* Advanced draw algorithms
* Better analytics dashboard

---
