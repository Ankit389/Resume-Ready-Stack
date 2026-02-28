# 🚀 Backend Development Guide
## Resume Ready Stack - Complete Backend Setup Guide

---

## 📋 **BACKEND MEIN KYA KYA ZARURAT HAI?**

### **1. CORE FEATURES (Must Have)**

#### ✅ **Contact Form Handling**
- User se form data receive karna
- Email send karna (nodemailer/sendgrid)
- Database me store karna
- Admin ko notification

#### ✅ **User Management**
- Client registration (optional)
- Admin login
- JWT authentication
- Password reset

#### ✅ **Service Requests Management**
- Service booking (Resume Writing, LinkedIn, etc.)
- Package selection (Basic/Standard/Premium)
- Status tracking (Pending, In Progress, Completed)
- File upload (resume, job description)

#### ✅ **Payment Integration**
- Razorpay / Stripe integration
- Payment verification
- Invoice generation
- Payment history

#### ✅ **Admin Dashboard**
- View all requests
- Update service status
- Download client files
- Analytics (requests, revenue, etc.)

#### ✅ **Email Notifications**
- Client ko confirmation email
- Admin ko new request notification
- Status update emails
- Payment confirmation

#### ✅ **File Management**
- Resume upload/download
- Job description storage
- Generated resume storage
- Cloud storage (AWS S3 / Cloudinary)

---

## 🛠️ **TECH STACK OPTIONS**

### **Option 1: Node.js + Express (Recommended - Easy)**
```json
{
  "backend": "Node.js + Express",
  "database": "MongoDB (Mongoose) or PostgreSQL",
  "authentication": "JWT",
  "file-upload": "Multer + Cloudinary",
  "email": "Nodemailer / SendGrid",
  "payment": "Razorpay SDK",
  "deployment": "Vercel / Railway / Render"
}
```

**Pros:**
- JavaScript/TypeScript (same language as frontend)
- Easy to learn
- Fast development
- Good for beginners

**Cons:**
- Less performant than Go/Rust (but enough for this project)

---

### **Option 2: Python + FastAPI / Django**
```json
{
  "backend": "Python FastAPI or Django",
  "database": "PostgreSQL",
  "authentication": "JWT",
  "file-upload": "FastAPI Upload",
  "email": "SMTP / SendGrid",
  "payment": "Razorpay Python SDK",
  "deployment": "Railway / Render / Heroku"
}
```

**Pros:**
- Easy syntax
- Great for data processing
- Good libraries

**Cons:**
- Slower than Node.js for APIs
- Different language from frontend

---

### **Option 3: Next.js API Routes (Easiest - Same Codebase)**
```json
{
  "backend": "Next.js API Routes",
  "database": "MongoDB / PostgreSQL",
  "authentication": "NextAuth.js",
  "file-upload": "Next.js API + Cloudinary",
  "email": "Resend / SendGrid",
  "payment": "Razorpay",
  "deployment": "Vercel (automatic)"
}
```

**Pros:**
- Same codebase as frontend
- No separate backend server
- Easy deployment
- Built-in API routes

**Cons:**
- Serverless functions (cold start)
- Less control

---

## 📊 **DATABASE DESIGN**

### **MongoDB Schema (Mongoose)**

```javascript
// User Schema (Clients)
const UserSchema = {
  name: String,
  email: String (unique),
  phone: String,
  createdAt: Date,
  requests: [ObjectId] // Reference to ServiceRequest
}

// Service Request Schema
const ServiceRequestSchema = {
  userId: ObjectId (ref: User),
  serviceType: String, // "Resume Writing", "LinkedIn", etc.
  packageType: String, // "Basic", "Standard", "Premium"
  status: String, // "Pending", "In Progress", "Completed", "Cancelled"
  jobDescription: String,
  uploadedFiles: [String], // URLs from Cloudinary
  generatedFiles: [String], // Final resume URLs
  paymentStatus: String, // "Pending", "Paid", "Failed"
  paymentId: String, // Razorpay payment ID
  amount: Number,
  createdAt: Date,
  updatedAt: Date,
  completedAt: Date
}

// Admin Schema
const AdminSchema = {
  email: String (unique),
  password: String (hashed),
  name: String,
  role: String, // "admin", "superadmin"
  createdAt: Date
}

// Payment Schema
const PaymentSchema = {
  requestId: ObjectId (ref: ServiceRequest),
  userId: ObjectId (ref: User),
  amount: Number,
  currency: String, // "INR"
  razorpayOrderId: String,
  razorpayPaymentId: String,
  razorpaySignature: String,
  status: String, // "pending", "success", "failed"
  createdAt: Date
}

// Contact Form Schema
const ContactSchema = {
  name: String,
  email: String,
  phone: String,
  message: String,
  serviceInterest: String,
  status: String, // "new", "replied", "archived"
  createdAt: Date
}
```

---

## 🔌 **API ENDPOINTS (REST API)**

### **Public Endpoints (No Auth)**

```
POST   /api/contact          - Contact form submission
POST   /api/service-request  - Create service request
GET    /api/packages         - Get pricing packages
POST   /api/payment/create   - Create payment order
POST   /api/payment/verify   - Verify payment
```

### **Client Endpoints (JWT Auth)**

```
GET    /api/user/profile     - Get user profile
PUT    /api/user/profile     - Update profile
GET    /api/user/requests    - Get user's service requests
GET    /api/user/request/:id - Get specific request
POST   /api/user/upload      - Upload files
```

### **Admin Endpoints (Admin JWT Auth)**

```
POST   /api/admin/login      - Admin login
GET    /api/admin/dashboard  - Dashboard stats
GET    /api/admin/requests   - Get all requests
PUT    /api/admin/request/:id - Update request status
GET    /api/admin/users      - Get all users
GET    /api/admin/payments   - Get payment history
POST   /api/admin/upload     - Upload generated resume
```

---

## 🔒 **SECURITY FEATURES**

### **Must Have:**
- ✅ **JWT Authentication** (tokens)
- ✅ **Password Hashing** (bcrypt)
- ✅ **Rate Limiting** (express-rate-limit)
- ✅ **Input Validation** (joi/zod)
- ✅ **CORS Configuration**
- ✅ **Environment Variables** (.env)
- ✅ **HTTPS Only** (production)
- ✅ **SQL Injection Protection** (Mongoose/Prisma handles)
- ✅ **XSS Protection** (sanitize inputs)

### **Nice to Have:**
- ✅ **Helmet.js** (security headers)
- ✅ **CSRF Protection**
- ✅ **File Upload Validation** (type, size)
- ✅ **Email Verification** (optional)

---

## 📧 **EMAIL SERVICE SETUP**

### **Option 1: Nodemailer (Free - Gmail SMTP)**
```javascript
// Gmail SMTP (free, but limited)
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'your-email@gmail.com',
    pass: 'app-password' // Gmail App Password
  }
})
```

### **Option 2: SendGrid (Recommended - 100 emails/day free)**
```javascript
// SendGrid (better for production)
const sgMail = require('@sendgrid/mail')
sgMail.setApiKey(process.env.SENDGRID_API_KEY)
```

### **Option 3: Resend (Modern - 3000 emails/month free)**
```javascript
// Resend (best for modern apps)
import { Resend } from 'resend'
const resend = new Resend(process.env.RESEND_API_KEY)
```

---

## 💳 **PAYMENT INTEGRATION**

### **Razorpay Setup (India)**

```javascript
// Install: npm install razorpay

const Razorpay = require('razorpay')
const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_KEY_SECRET
})

// Create Order
app.post('/api/payment/create', async (req, res) => {
  const options = {
    amount: req.body.amount * 100, // in paise
    currency: 'INR',
    receipt: `receipt_${Date.now()}`
  }
  const order = await razorpay.orders.create(options)
  res.json({ orderId: order.id })
})

// Verify Payment
app.post('/api/payment/verify', async (req, res) => {
  const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = req.body
  
  const crypto = require('crypto')
  const generated_signature = crypto
    .createHmac('sha256', process.env.RAZORPAY_KEY_SECRET)
    .update(razorpay_order_id + '|' + razorpay_payment_id)
    .digest('hex')
  
  if (generated_signature === razorpay_signature) {
    // Payment verified - update database
    res.json({ success: true })
  } else {
    res.status(400).json({ success: false })
  }
})
```

---

## 📁 **FILE UPLOAD SETUP**

### **Option 1: Cloudinary (Recommended - Free Tier)**
```javascript
// Install: npm install cloudinary multer

const cloudinary = require('cloudinary').v2
const multer = require('multer')
const upload = multer({ dest: 'uploads/' })

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET
})

app.post('/api/upload', upload.single('file'), async (req, res) => {
  const result = await cloudinary.uploader.upload(req.file.path, {
    folder: 'resume-ready-stack',
    resource_type: 'auto'
  })
  res.json({ url: result.secure_url })
})
```

### **Option 2: AWS S3 (More Control)**
```javascript
// Install: npm install aws-sdk multer-s3

const AWS = require('aws-sdk')
const multerS3 = require('multer-s3')

const s3 = new AWS.S3({
  accessKeyId: process.env.AWS_ACCESS_KEY,
  secretAccessKey: process.env.AWS_SECRET_KEY
})

const upload = multer({
  storage: multerS3({
    s3: s3,
    bucket: 'resume-ready-stack',
    acl: 'public-read',
    key: (req, file, cb) => {
      cb(null, `uploads/${Date.now()}-${file.originalname}`)
    }
  })
})
```

---

## 🗂️ **PROJECT STRUCTURE**

```
backend/
├── src/
│   ├── config/
│   │   ├── database.js          # MongoDB connection
│   │   ├── cloudinary.js        # Cloudinary setup
│   │   └── razorpay.js          # Razorpay setup
│   │
│   ├── models/
│   │   ├── User.js              # User schema
│   │   ├── ServiceRequest.js    # Service request schema
│   │   ├── Payment.js           # Payment schema
│   │   ├── Contact.js           # Contact form schema
│   │   └── Admin.js             # Admin schema
│   │
│   ├── routes/
│   │   ├── auth.js              # Authentication routes
│   │   ├── user.js              # User routes
│   │   ├── admin.js             # Admin routes
│   │   ├── service.js           # Service request routes
│   │   ├── payment.js           # Payment routes
│   │   └── contact.js           # Contact form routes
│   │
│   ├── controllers/
│   │   ├── authController.js
│   │   ├── userController.js
│   │   ├── adminController.js
│   │   ├── serviceController.js
│   │   ├── paymentController.js
│   │   └── contactController.js
│   │
│   ├── middleware/
│   │   ├── auth.js              # JWT verification
│   │   ├── adminAuth.js         # Admin verification
│   │   ├── upload.js            # File upload
│   │   └── validation.js        # Input validation
│   │
│   ├── utils/
│   │   ├── email.js             # Email sending
│   │   ├── generateInvoice.js   # Invoice generation
│   │   └── helpers.js           # Helper functions
│   │
│   ├── app.js                   # Express app setup
│   └── server.js                # Server start
│
├── .env                         # Environment variables
├── .gitignore
├── package.json
└── README.md
```

---

## 📦 **DEPENDENCIES (package.json)**

```json
{
  "dependencies": {
    "express": "^4.18.2",
    "mongoose": "^7.0.0",
    "dotenv": "^16.0.3",
    "bcryptjs": "^2.4.3",
    "jsonwebtoken": "^9.0.0",
    "nodemailer": "^6.9.0",
    "razorpay": "^2.9.0",
    "cloudinary": "^1.37.0",
    "multer": "^1.4.5-lts.1",
    "joi": "^17.9.0",
    "cors": "^2.8.5",
    "helmet": "^7.0.0",
    "express-rate-limit": "^6.8.0"
  },
  "devDependencies": {
    "nodemon": "^2.0.22"
  }
}
```

---

## 🚀 **DEPLOYMENT OPTIONS**

### **Option 1: Railway (Easiest - Recommended)**
- ✅ Free tier available
- ✅ Auto-deploy from GitHub
- ✅ MongoDB included
- ✅ Environment variables easy
- ✅ **Best for beginners**

### **Option 2: Render**
- ✅ Free tier
- ✅ Easy setup
- ✅ PostgreSQL included
- ⚠️ Slower than Railway

### **Option 3: Vercel (Serverless)**
- ✅ Free tier
- ✅ Fast
- ⚠️ Only for Next.js API routes
- ⚠️ Cold starts

### **Option 4: AWS / DigitalOcean**
- ✅ More control
- ✅ Better for scaling
- ⚠️ Complex setup
- ⚠️ Paid (but cheap)

---

## 🔄 **FRONTEND-BACKEND INTEGRATION**

### **API Calls Example (Frontend)**

```typescript
// src/utils/api.ts

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api'

// Contact Form
export const submitContactForm = async (data: ContactFormData) => {
  const response = await fetch(`${API_URL}/contact`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data)
  })
  return response.json()
}

// Service Request
export const createServiceRequest = async (data: ServiceRequestData) => {
  const token = localStorage.getItem('token')
  const response = await fetch(`${API_URL}/service-request`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    },
    body: JSON.stringify(data)
  })
  return response.json()
}

// Payment
export const createPayment = async (amount: number) => {
  const response = await fetch(`${API_URL}/payment/create`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ amount })
  })
  return response.json()
}
```

---

## 📝 **STEP-BY-STEP SETUP**

### **Step 1: Initialize Project**
```bash
mkdir backend
cd backend
npm init -y
npm install express mongoose dotenv bcryptjs jsonwebtoken
npm install -D nodemon
```

### **Step 2: Create Basic Server**
```javascript
// server.js
const express = require('express')
const mongoose = require('mongoose')
require('dotenv').config()

const app = express()
app.use(express.json())

// Connect MongoDB
mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log('MongoDB Connected'))
  .catch(err => console.log(err))

// Routes
app.get('/', (req, res) => {
  res.json({ message: 'Backend API Running' })
})

const PORT = process.env.PORT || 5000
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
```

### **Step 3: Add Environment Variables**
```env
# .env
PORT=5000
MONGODB_URI=mongodb://localhost:27017/resume-ready-stack
JWT_SECRET=your-secret-key-here
RAZORPAY_KEY_ID=your-razorpay-key
RAZORPAY_KEY_SECRET=your-razorpay-secret
CLOUDINARY_CLOUD_NAME=your-cloud-name
CLOUDINARY_API_KEY=your-api-key
CLOUDINARY_API_SECRET=your-api-secret
SENDGRID_API_KEY=your-sendgrid-key
EMAIL_FROM=noreply@resumereadystack.com
```

### **Step 4: Create Models**
```javascript
// models/Contact.js
const mongoose = require('mongoose')

const ContactSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  phone: String,
  message: { type: String, required: true },
  serviceInterest: String,
  status: { type: String, default: 'new' },
  createdAt: { type: Date, default: Date.now }
})

module.exports = mongoose.model('Contact', ContactSchema)
```

### **Step 5: Create Routes & Controllers**
```javascript
// routes/contact.js
const express = require('express')
const router = express.Router()
const { submitContact } = require('../controllers/contactController')

router.post('/', submitContact)

module.exports = router
```

---

## 🎯 **MINIMUM VIABLE BACKEND (MVP)**

### **Agar time kam hai, to pehle ye 4 cheezein banao:**

1. **Contact Form API** (2-3 hours)
   - POST /api/contact
   - Save to database
   - Send email notification

2. **Service Request API** (3-4 hours)
   - POST /api/service-request
   - File upload
   - Save to database

3. **Payment API** (4-5 hours)
   - POST /api/payment/create
   - POST /api/payment/verify
   - Razorpay integration

4. **Admin Login** (2-3 hours)
   - POST /api/admin/login
   - JWT token
   - Protected routes

**Total: ~12-15 hours of development**

---

## 💡 **MY RECOMMENDATION**

### **For Your Project:**

**Best Option: Node.js + Express + MongoDB**

**Why?**
- ✅ Same language as frontend (JavaScript/TypeScript)
- ✅ Easy to learn
- ✅ Fast development
- ✅ Good community support
- ✅ Perfect for this use case

**Tech Stack:**
```
Backend: Node.js + Express
Database: MongoDB (MongoDB Atlas - free)
File Storage: Cloudinary (free tier)
Email: SendGrid / Resend (free tier)
Payment: Razorpay
Deployment: Railway (free tier)
```

---

## 📚 **LEARNING RESOURCES**

1. **Express.js Official Docs**: https://expressjs.com/
2. **MongoDB Tutorial**: https://www.mongodb.com/docs/
3. **JWT Authentication**: https://jwt.io/
4. **Razorpay Docs**: https://razorpay.com/docs/
5. **Cloudinary Docs**: https://cloudinary.com/documentation

---

## ❓ **FAQ**

**Q: Kya backend zaruri hai?**
A: Agar sirf contact form chahiye, to EmailJS/Formspree use kar sakte ho (no backend). Lekin agar payment, file upload, admin panel chahiye, to backend zaruri hai.

**Q: Kya free me deploy kar sakte hain?**
A: Haan! Railway, Render, Vercel sab free tier dete hain.

**Q: Database kya use karein?**
A: MongoDB (MongoDB Atlas) - free, easy, perfect for this project.

**Q: Kya backend bina coding ke bana sakte hain?**
A: Haan! No-code tools like:
- Supabase (Backend as a Service)
- Firebase
- Airtable + Zapier

Lekin custom features ke liye coding zaruri hai.

---

**Agar tum chahte ho ki main backend code start kar doon, to bata do! Main step-by-step implement kar dunga!** 🚀

