# QuickBite Food Ordering System
**ITUE301 Practical Exam | SET A | Roll No: 24cs079 | Batch: A2**

## Project Structure
```
itue301-exam-24cs079-A2/
├── frontend/    ← React + Vite app
├── backend/     ← Express.js server
└── README.md
```

## MongoDB Setup
1. Create a free cluster at https://mongodb.com/atlas
2. Copy your connection string
3. In `/backend`, create a `.env` file (copy from `.env.example`):
```
MONGO_URI=your_mongodb_connection_string
PORT=5000
JWT_SECRET=your_secret_key
```

## How to Run

### Backend
```bash
cd backend
npm install
node server.js
```
Server starts at: http://localhost:5000

### Frontend
```bash
cd frontend
npm install
npm run dev
```
App opens at: http://localhost:5173

## API Endpoints
| Method | Endpoint | Auth | Purpose |
|--------|----------|------|---------|
| POST | /api/v1/auth/register | No | Register customer |
| POST | /api/v1/auth/login | No | Login, get token |
| GET | /api/v1/restaurants | No | Get all restaurants |
| POST | /api/v1/restaurants | No | Add restaurant |
| POST | /api/v1/orders | Yes | Place order |
| GET | /api/v1/orders | Yes | Get my orders |
| PATCH | /api/v1/orders/:id/status | Yes | Update order status |

## Tech Stack
- **Frontend**: React, Vite, React Router, Axios
- **Backend**: Node.js, Express.js
- **Database**: MongoDB Atlas with Mongoose
