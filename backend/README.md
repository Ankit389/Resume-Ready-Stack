# Resume Ready Stack - Backend API

## Setup Instructions

### 1. Install Dependencies
```bash
npm install
```

### 2. Create `.env` File
Copy `.env.example` to `.env` and update the values:
```bash
PORT=5000
MONGODB_URI=mongodb://localhost:27017/resume-ready-stack
JWT_SECRET=your-secret-key-here
ADMIN_EMAIL=admin@resumereadystack.com
ADMIN_PASSWORD=admin123
FRONTEND_URL=http://localhost:5173
```

### 3. Start MongoDB
Make sure MongoDB is running on your system.

### 4. Run Server
```bash
# Development (with auto-reload)
npm run dev

# Production
npm start
```

## API Endpoints

### Public Routes
- `POST /api/contact` - Submit contact form
- `POST /api/service` - Create service request
- `POST /api/admin/login` - Admin login
- `POST /api/admin/initialize` - Initialize admin (first time only)

### Protected Routes (Require JWT Token)
- `GET /api/contact/all` - Get all contacts (Admin)
- `GET /api/service/all` - Get all service requests (Admin)
- `GET /api/service/:id` - Get single service request (Admin)
- `PUT /api/service/:id` - Update service request (Admin)
- `GET /api/admin/profile` - Get admin profile

## First Time Setup

1. Start the server
2. Create admin account:
```bash
POST /api/admin/initialize
{
  "name": "Admin Name",
  "email": "admin@resumereadystack.com",
  "password": "securepassword"
}
```

3. Login to get JWT token:
```bash
POST /api/admin/login
{
  "email": "admin@resumereadystack.com",
  "password": "securepassword"
}
```

4. Use the token in Authorization header:
```
Authorization: Bearer <your-token>
```


