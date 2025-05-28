 Campaign Management System

A simple and functional Campaign Management System built with **Node.js (Express)** for the backend and **HTML + JavaScript** for the frontend. 
The system allows users to create timed campaigns and issue unique coupon codes on a first-come, first-served basis.

---
 Features

 Create campaigns with name, total coupons, and start time
 Claim coupons after campaign start
 First-come, first-served coupon distribution
 Auto-generated unique 10-character coupon codes
 Simple and responsive frontend interface
 Prevents over-issuance of coupons and early claims

---

##  Tech Stack

 Backend   - Node.js + Express   
 Frontend  - HTML + JavaScript   
 Data Store - In-memory (Map)  

 ## How to Run the Project Locally

# Prerequisites:
- Node.js installed
- Git installed (for cloning)

# Backend Setup
cd backend
npm install
node index.js
Backend runs on: http://localhost:3000

# Frontend Setup
Open frontend/index.html in your browser
Use the form to create a campaign
Copy the campaign ID and claim a coupon

# Testing Instructions
Try claiming before the campaign's start time — it will be blocked.
Try claiming more than the total coupon count — it will be blocked.
Open multiple tabs to simulate multiple users.

# What I Learned
How to build RESTful APIs with Express
How to use HTML + JavaScript to interact with backend APIs
How to handle real-time, first-come-first-served logic
How to debug client-server interactions and use browser dev tools
How to structure a full-stack project
