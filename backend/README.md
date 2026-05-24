# Resume Ready Stack Backend API

A simple Node.js and Express backend API for the Resume Ready Stack website.

## 🚀 Features

- **RESTful API** with proper HTTP status codes
- **CORS Enabled** for frontend integration
- **Security Headers** with Helmet
- **Request Logging** with Morgan
- **Error Handling** with proper error responses
- **Environment Variables** support
- **Contact Form** handling
- **Services & Plans** data
- **Payment Webhook** support for Razorpay

## 📡 API Endpoints

### Health Check

- `GET /api/health` - Server health check

### Services

- `GET /api/services` - Get all services
- `GET /api/services/:id` - Get single service

### Plans

- `GET /api/plans` - Get all pricing plans
- `GET /api/plans/:id` - Get single plan

### Contact

- `POST /api/contact` - Submit contact form
- `GET /api/contact` - Get all contact messages (admin)

### Payments

- `POST /api/payments/webhook` - Razorpay webhook handler

## 🛠️ Installation

### Prerequisites

- Node.js 14.0.0 or higher
- npm or yarn

### Steps

1. **Clone the repository**

   ```bash
   cd backend
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Create environment file**

   ```bash
   copy .env.example .env
   ```

4. **Configure environment variables** (optional for development)

   ```env
   PORT=5000
   NODE_ENV=development
   ```

5. **Start the server**

   ```bash
   # Development with nodemon
   npm run dev

   # Production
   npm start
   ```

## 📝 API Usage Examples

### Get All Services

```bash
curl http://localhost:5000/api/services
```

**Response:**

```json
{
  "success": true,
  "message": "Services retrieved successfully",
  "data": [
    {
      "id": 1,
      "name": "Resume Review",
      "price": 199,
      "description": "Professional resume review with ATS optimization tips"
    }
  ],
  "count": 1
}
```

### Submit Contact Form

```bash
curl -X POST http://localhost:5000/api/contact \
  -H "Content-Type: application/json" \
  -d '{
    "name": "John Doe",
    "email": "john@example.com",
    "message": "I need help with my resume",
    "phone": "9876543210",
    "service": "Resume Review"
  }'
```

**Response:**

```json
{
  "success": true,
  "message": "Contact form submitted successfully",
  "data": {
    "id": 1,
    "name": "John Doe",
    "timestamp": "2024-04-05T10:30:00.000Z"
  }
}
```

### Get All Plans

```bash
curl http://localhost:5000/api/plans
```

**Response:**

```json
{
  "success": true,
  "message": "Plans retrieved successfully",
  "data": [
    {
      "id": 1,
      "name": "Resume Audit",
      "price": 0,
      "type": "free",
      "features": ["Free Resume Review", "ATS Score Check"],
      "description": "Get your resume reviewed for free"
    }
  ],
  "count": 1
}
```

## 🔧 Development

### Project Structure

```
backend/
├── server.js              # Main server file
├── package.json           # Dependencies and scripts
├── .env.example           # Environment variables template
├── .gitignore             # Git ignore file
└── README.md              # This file
```

### Scripts

- `npm start` - Start server in production mode
- `npm run dev` - Start server in development mode with nodemon
- `npm test` - Run tests (placeholder)

### Environment Variables

| Variable                | Description             | Default     |
| ----------------------- | ----------------------- | ----------- |
| PORT                    | Server port             | 5000        |
| NODE_ENV                | Environment mode        | development |
| RAZORPAY_KEY_ID         | Razorpay key ID         | -           |
| RAZORPAY_KEY_SECRET     | Razorpay key secret     | -           |
| RAZORPAY_WEBHOOK_SECRET | Razorpay webhook secret | -           |

## 🛡️ Security

- **Helmet.js** for security headers
- **CORS** enabled for cross-origin requests
- **Input validation** on contact forms
- **Error handling** without exposing sensitive information
- **Environment variables** for sensitive data

## 📝 Error Handling

All API endpoints return consistent error responses:

```json
{
  "success": false,
  "message": "Error description",
  "error": "Detailed error message"
}
```

### Common Status Codes

- `200` - Success
- `201` - Created
- `400` - Bad Request
- `404` - Not Found
- `500` - Internal Server Error

## 🚀 Deployment

### Production Setup

1. **Set environment variables**

   ```env
   NODE_ENV=production
   PORT=5000
   ```

2. **Install production dependencies**

   ```bash
   npm install --production
   ```

3. **Start the server**
   ```bash
   npm start
   ```

### Docker Deployment (Optional)

Create a `Dockerfile`:

```dockerfile
FROM node:16-alpine
WORKDIR /app
COPY package*.json ./
RUN npm install --production
COPY . .
EXPOSE 5000
CMD ["npm", "start"]
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## 📞 Support

For any issues or questions:

- Email: resumereadystack@gmail.com
- Phone: +91 92000000
- WhatsApp: +91 974392922

## 📄 License

This project is licensed under the MIT License.

## 🔗 Related Projects

- [Frontend Repository](../frontend) - React frontend application
- [Documentation](../docs) - API documentation and guides

---

**Resume Ready Stack Backend API** 🚀

Built with ❤️ using Node.js, Express, and modern web technologies.
