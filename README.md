# 🔥 Fireshaw - Fire Safety & Protection Equipments (MERN Stack)

A modern, full-stack **MERN (MongoDB, Express, React, Node.js)** e-commerce and safety management platform built for **Fireshaw**, a specialized shop and distributor of certified fire safety and firefighting protection equipment.

---

## 🚒 Key Features

### 1. 🧯 Two-Sided Platform Architecture
- **Customer Storefront (`Customer View`)**:
  - Full product catalog with multi-dimensional filtering (Category, Fire Hazard Class A/B/C/D/K, Industry).
  - Safety Extinguisher Selection Wizard ("Help me choose").
  - Persistent cart, 18% GST statutory invoice breakdown, and checkout.
  - **"My Orders" Modal**: Live visual fulfillment progress bar (`Order Placed` ➔ `Processing` ➔ `Dispatched` ➔ `Delivered`).
  - **Store Location & Map**: Embedded map pinned to the showroom with nearby landmark directions.
- **Admin Portal (`Shop Owner / Admin Order Tracker`)**:
  - Protected access (accessible via Admin login or header switch).
  - **Real-Time Analytics KPIs**: Gross Revenue, Total Orders, Pending, Processing, Dispatched, Delivered counts.
  - **Interactive Order Management**: Real-time status updater dropdowns (immediately updates MongoDB via PATCH API), payment toggle (Paid / Pending), and printable tax invoices.

### 2. 📍 Store Location & Nearby Landmarks
- **Address**: Plot 42, Block D-II, MIDC Industrial Area, Chinchwad, Pune, Maharashtra 411019
- **Landmarks & Directions**:
  - 📍 **1.2 km** from Tata Motors Main Assembly Gate
  - 📍 Opposite **State Bank of India (SBI)** Industrial Branch
  - 📍 **2 mins** off Old Pune-Mumbai Highway (NH 48)
  - 📍 **2.5 km** from Chinchwad & Akurdi Railway Stations
- **Direct Phone Hotline**: `+91 98220 54321` / `+91 (020) 2456-7890`

### 3. 🔑 Integrated Authentication
- Discrete Customer Login / Registration and dedicated Admin Login.
- **Default Pre-Seeded Accounts**:
  - 👑 **Admin**: `admin@fireshaw.com` / `admin123`
  - 👤 **Customer**: `customer@fireshaw.com` / `customer123`

---

## 🛠️ Tech Stack

| Layer | Technology |
|---|---|
| **Frontend** | React 19, Vite, Tailwind CSS, Lucide React Icons |
| **Backend** | Node.js, Express.js (Serverless-compatible), CORS, Morgan |
| **Database** | MongoDB with Mongoose ODM (Auto-seeds catalog & users on startup) |
| **Authentication** | JWT (JSON Web Tokens) & bcryptjs password hashing |
| **Deployment** | Vercel (`vercel.json` configured for serverless `/api` and static frontend) |

---

## 🚀 Local Development

### 1. Prerequisites
- **Node.js** (v18 or newer)
- **MongoDB** (running locally on port `27017` or a MongoDB Atlas URI)

### 2. Run Servers
```bash
# Start backend API (Port 5000)
node backend/server.js

# Start frontend application (Port 5173)
npm run dev:frontend
```
- Open [http://localhost:5173](http://localhost:5173) in your browser.

---

## 🌐 Deploying to Vercel

The project is fully configured for Vercel deployment with `vercel.json` and serverless API functions (`/api/index.js`).

### Method A: Deploy via GitHub (Recommended)
1. Initialize a git repository and push to GitHub:
   ```bash
   git init
   git add .
   git commit -m "Initial commit for Fireshaw MERN app"
   git branch -M main
   git remote add origin https://github.com/<your-username>/fireshaw.git
   git push -u origin main
   ```
2. Go to [Vercel Dashboard](https://vercel.com/dashboard) and click **"Add New" ➔ "Project"**.
3. Import your `fireshaw` GitHub repository.
4. In **Environment Variables**, add:
   - `MONGO_URI`: Your MongoDB Atlas connection string (e.g. `mongodb+srv://<user>:<password>@cluster0.mongodb.net/fireshaw?retryWrites=true&w=majority`)
   - `JWT_SECRET`: A secure secret string (e.g. `fireshaw_secret_key_2026`)
5. Click **"Deploy"**. Vercel will automatically build the React frontend and deploy the Express API as serverless functions.

### Method B: Deploy via Vercel CLI
1. Log in to Vercel in your terminal:
   ```bash
   npx vercel login
   ```
2. Deploy to production:
   ```bash
   npx vercel --prod
   ```
3. Set your environment variables in Vercel project settings (`MONGO_URI` and `JWT_SECRET`).

---

## 📡 API Endpoints

| Method | Endpoint | Description |
|---|---|---|
| `GET` | `/api/health` | Service status check |
| `POST` | `/api/auth/login` | Authenticate user (Customer or Admin) |
| `POST` | `/api/auth/register` | Register new customer account |
| `GET` | `/api/products` | Query products with category, hazard class, industry filters |
| `GET` | `/api/products/:id` | Get single product specifications |
| `GET` | `/api/orders` | Fetch all orders (with status and search filters) |
| `GET` | `/api/orders/stats/summary` | Real-time analytics (Revenue, Pending, Dispatched, Delivered) |
| `GET` | `/api/orders/user/:userId` | Get orders for a specific logged-in customer |
| `POST` | `/api/orders` | Place new order with customer, address, and GST info |
| `PATCH` | `/api/orders/:id/status` | Update shipping status or payment status |
