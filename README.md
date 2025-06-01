 Campaign Management System

A simple and functional Campaign Management System built with **Node.js (Express)** for the backend and **HTML + JavaScript** for the frontend. 
The system allows users to create timed campaigns and issue unique coupon codes on a first-come, first-served basis.

---
 ## Features

-  Create coupon campaigns with name, total coupons, and start time
-  Claim unique coupon codes (after campaign starts)
-  View campaign details including all issued coupons
-  Input validation and concurrency-safe logic
-  Redis Cloud used for persistent and high-speed storage
-  Load test simulation using Node.js script (100+ claims)
-  RESTful API with frontend + Postman support

---

##  Tech Stack

 Backend   - Node.js + Express   
 Frontend  - HTML + CSS + JavaScript   
 Database   - Redis (via Redis Cloud)       
 Testing   - Postman, Load Test Script     
 Config     - dotenv (`.env`)               
 CLI Access - Docker + redis-cli (optional)  

 ## How to Run the Project Locally

# Prerequisites:
- Node.js installed
- Git installed (for cloning)

# Backend Setup
cd backend
npm install

Create a .env file with this line
REDIS_URL=redis://default:<password>@<host>:<port>

node index.js

✅ Redis connected
🚀 Server running at http://localhost:3000


# Frontend Setup
Open frontend/index.html in your browser
Use the form to create a campaign
Copy the campaign ID and claim a coupon

# Testing Instructions
## Postman Requests

POST /campaigns → Create campaign

POST /campaigns/:id/claim → Claim coupon

GET /campaigns/:id → View campaign

## Load Test Script
To simulate 100 users claiming

cd backend
node claim-test.js


## Redis Data Format
-Campaign info stored in: campaign:<id> (as Hash)
-Coupon codes stored in: campaign:<id>:codes (as List)

# Access via redis-cli (using Docker):

docker run -it --rm redis redis-cli -u "<your_redis_url>"

# then run :
docker exec -it redis-server redis-cli
keys *
HGETALL campaign:<id>
LRANGE campaign:<id>:codes 0 -1




# What I Learned
-How to build a full-stack web app using HTML, JavaScript, Node.js, and Redis
-Created and tested RESTful APIs using Express and Postman
-Used Redis Cloud to store campaign and coupon data safely
-Handled input validation, errors, and concurrent coupon claims
-Learned to simulate 100+ users using a custom load test script
-Accessed Redis data using Docker + redis-cli
-Understood the flow of data from frontend → backend → database → response

