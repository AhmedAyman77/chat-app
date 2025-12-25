# 💬 Chatify - Real-Time Chat Application

![Chatify](https://img.shields.io/badge/Chatify-Real%20Time%20Chat-blue)
![Version](https://img.shields.io/badge/version-1.0.0-green)
![License](https://img.shields.io/badge/license-ISC-blue)

A modern, full-stack real-time chat application built with the MERN stack, featuring Socket.IO for instant messaging, advanced security features, and a beautiful UI.

[Live Demo](https://chatify-production-3258.up.railway.app/) | [Report Bug](https://github.com/AhmedAyman77/chat-app/issues) | [Request Feature](https://github.com/AhmedAyman77/chat-app/issues)

---

## 📋 Table of Contents

- [Overview](#overview)
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
  - [Environment Variables](#environment-variables)
- [Usage](#usage)
- [API Endpoints](#api-endpoints)
- [Security](#security)
- [Deployment](#deployment)
- [Contributing](#contributing)
- [License](#license)

---

## 🌟 Overview

Chatify is a feature-rich, real-time chat application that enables users to communicate instantly with friends and colleagues. Built with modern web technologies, it offers a seamless messaging experience with real-time updates, secure authentication, and a responsive design that works across all devices.

### 🚀 Live Application

The application is deployed and accessible at: **[https://chatify-production-3258.up.railway.app/](https://chatify-production-3258.up.railway.app/)**

---

## ✨ Features

### 🔐 Authentication & Security
- **User Registration & Login** with JWT-based authentication
- **Secure Password Hashing** using bcrypt
- **Email Verification** with welcome emails via Resend
- **Protected Routes** with authentication middleware
- **Rate Limiting & Bot Protection** powered by Arcjet
- **Shield Protection** against SQL injection and common attacks
- **Cookie-based Session Management**

### 💬 Real-Time Messaging
- **Instant Message Delivery** using Socket.IO
- **Online/Offline Status** indicators
- **Text and Image Messages** with Cloudinary integration
- **Message History** with chronological sorting
- **Real-time Updates** when users go online/offline
- **Typing Indicators** support

### 👥 User Management
- **Contact List** showing all registered users
- **Chat History** with recent conversations
- **Profile Picture Upload** with Cloudinary storage
- **Profile Management**

### 📱 Additional Features
- **Mobile-First Responsive Design**
- **Cross-Platform Compatibility**
- **Optimized Performance** with Vite
- **Error Handling** with custom middleware
- **Production-Ready** with static asset serving

---

## 🛠️ Tech Stack

### Frontend
| Technology | Purpose |
|-----------|---------|
| **React 19.2.0** | UI library for building interactive interfaces |
| **Vite** | Fast build tool and development server |
| **React Router 7** | Client-side routing and navigation |
| **Zustand 5.0** | Lightweight state management |
| **Socket.IO Client** | Real-time bidirectional communication |
| **Axios** | HTTP client for API requests |
| **Tailwind CSS** | Utility-first CSS framework |
| **DaisyUI** | Tailwind CSS component library |
| **Lucide React** | Beautiful icon library |
| **React Hot Toast** | Elegant toast notifications |

### Backend
| Technology | Purpose |
|-----------|---------|
| **Node.js** | JavaScript runtime environment |
| **Express 5.2** | Web application framework |
| **MongoDB** | NoSQL database for data persistence |
| **Mongoose 9.0** | MongoDB object modeling |
| **Socket.IO** | Real-time communication server |
| **JWT** | JSON Web Token authentication |
| **bcryptjs** | Password hashing |
| **Cloudinary** | Cloud-based image storage |
| **Resend** | Email delivery service |
| **Arcjet** | Security & rate limiting |
| **cookie-parser** | Cookie parsing middleware |
| **CORS** | Cross-origin resource sharing |

---

## 📁 Project Structure

```
chat-app/
├── client/                          # Frontend React application
│   ├── public/
│   │   └── sounds/                  # Keyboard sound effects
│   ├── src/
│   │   ├── components/              # Reusable React components
│   │   │   ├── ActiveTabSwitch.jsx
│   │   │   ├── BorderAnimatedContainer.jsx
│   │   │   ├── ChatContainer.jsx
│   │   │   ├── ChatHeader.jsx
│   │   │   ├── ChatsList.jsx
│   │   │   ├── ContactList.jsx
│   │   │   ├── MessageInput.jsx
│   │   │   ├── MessagesLoadingSkeleton.jsx
│   │   │   ├── NoChatHistoryPlaceholder.jsx
│   │   │   ├── NoChatsFound.jsx
│   │   │   ├── NoConversationPlaceholder.jsx
│   │   │   ├── PageLoader.jsx
│   │   │   ├── ProfileHeader.jsx
│   │   │   └── UsersLoadingSkeleton.jsx
│   │   ├── hooks/
│   │   │   └── useKeyboardSound.js  # Custom hook for sound effects
│   │   ├── lib/
│   │   │   └── axios.js             # Axios configuration
│   │   ├── pages/
│   │   │   ├── ChatPage.jsx         # Main chat interface
│   │   │   ├── LoginPage.jsx        # User login
│   │   │   └── SignUpPage.jsx       # User registration
│   │   ├── store/
│   │   │   ├── useAuthStore.js      # Authentication state
│   │   │   └── useChatStore.js      # Chat state management
│   │   ├── App.jsx                  # Root component
│   │   ├── main.jsx                 # Entry point
│   │   └── index.css                # Global styles
│   ├── package.json
│   ├── vite.config.js               # Vite configuration
│   ├── tailwind.config.js           # Tailwind CSS config
│   └── postcss.config.js
│
├── server/                          # Backend Node.js application
│   ├── src/
│   │   ├── config/
│   │   │   ├── arcjet.js            # Security & rate limiting config
│   │   │   ├── cloudinary.js        # Image upload config
│   │   │   ├── db.js                # MongoDB connection
│   │   │   ├── env.js               # Environment variables
│   │   │   ├── resend.js            # Email service config
│   │   │   ├── socket.js            # Socket.IO setup
│   │   │   └── util.js              # Utility functions
│   │   ├── controllers/
│   │   │   ├── auth.controller.js   # Authentication logic
│   │   │   └── message.controller.js # Messaging logic
│   │   ├── email/
│   │   │   ├── emailHandlers.js     # Email sending functions
│   │   │   └── emailTemplates.js    # HTML email templates
│   │   ├── middleware/
│   │   │   ├── archjet.middleware.js # Arcjet security
│   │   │   ├── auth.middleware.js   # JWT verification
│   │   │   ├── error.middleware.js  # Error handling
│   │   │   └── socket.auth.middleware.js # Socket authentication
│   │   ├── models/
│   │   │   ├── message.model.js     # Message schema
│   │   │   └── user.model.js        # User schema
│   │   ├── routes/
│   │   │   ├── auth.route.js        # Auth endpoints
│   │   │   └── message.route.js     # Message endpoints
│   │   └── server.js                # Application entry point
│   └── package.json
│
└── package.json                      # Root package.json
```

---

## 🚀 Getting Started

### Prerequisites

Before running this application, make sure you have the following installed:

- **Node.js** (v16 or higher)
- **npm** or **yarn**
- **MongoDB** (local or MongoDB Atlas account)
- **Cloudinary Account** (for image uploads)
- **Arcjet Account** (for security features)

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/AhmedAyman77/chat-app.git
   cd chat-app
   ```

2. **Install dependencies**
   ```bash
   # Install root dependencies
   npm install

   # Install server dependencies
   cd server
   npm install

   # Install client dependencies
   cd ../client
   npm install
   ```

3. **Run the application**

   **Development Mode:**
   ```bash
   # Terminal 1 - Run server
   cd server
   npm run dev

   # Terminal 2 - Run client
   cd client
   npm run dev
   ```

   **Production Mode:**
   ```bash
   # Build and start
   npm run build
   npm start
   ```

---

## 📖 Usage

### User Registration
1. Navigate to the signup page
2. Enter your full name, email, and password
3. Click "Create Account"
4. You'll be automatically logged in

### Sending Messages
1. Login to your account
2. Select a contact from the "Contacts" tab
3. Type your message in the input field
4. Optionally attach an image using the image icon
5. Press Enter or click Send

### Profile Management
1. Click on your profile picture in the header
2. Upload a new profile picture
3. Changes are saved automatically

---

## 🔌 API Endpoints

### Authentication Routes
| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| POST | `/api/auth/register` | Register new user | No |
| POST | `/api/auth/login` | Login user | No |
| POST | `/api/auth/logout` | Logout user | Yes |
| GET | `/api/auth/check` | Check authentication | Yes |
| PUT | `/api/auth/update-profile` | Update profile picture | Yes |

### Message Routes
| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| GET | `/api/messages/contacts` | Get all contacts | Yes |
| GET | `/api/messages/chats` | Get chat partners | Yes |
| GET | `/api/messages/:id` | Get messages with user | Yes |
| POST | `/api/messages/send/:id` | Send message to user | Yes |

### Health Check
| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| GET | `/health` | Server health status | No |

### Socket.IO Events

#### Client → Server
- `connection` - Establish socket connection
- `disconnect` - Close socket connection

#### Server → Client
- `onlineUsers` - List of currently online users
- `newMessage` - Real-time message delivery

---

## 🔒 Security

Chatify implements multiple layers of security:

### 🛡️ Arcjet Security Features
- **Rate Limiting**: 100 requests per 60 seconds per IP
- **Bot Detection**: Blocks malicious bots while allowing search engines
- **Shield Protection**: Protects against SQL injection and common attacks
- **Spoofed Bot Detection**: Identifies and blocks fake user agents

### 🔐 Authentication Security
- **JWT Tokens**: Secure token-based authentication
- **HTTP-Only Cookies**: Prevents XSS attacks
- **Password Hashing**: bcrypt with salt rounds
- **Password Validation**: Minimum 6 characters
- **Email Validation**: Regex-based email format validation

### 🌐 Network Security
- **CORS Configuration**: Restricted to specified origins
- **Trust Proxy**: Configured for proxy environments
- **Input Validation**: Request body validation
- **Error Handling**: Secure error messages without exposing internals

### 📁 Data Security
- **MongoDB Security**: Mongoose schema validation
- **Image Upload Security**: Cloudinary secure URLs
- **Environment Variables**: Sensitive data stored in .env files
- **Session Management**: Secure cookie configuration

---

## 🚢 Deployment

### Deployed on Railway

The application is currently deployed on Railway:
- **Production URL**: [https://chatify-production-3258.up.railway.app/](https://chatify-production-3258.up.railway.app/)

### Deployment Steps (Railway)

1. **Prepare your repository**
   ```bash
   git add .
   git commit -m "Prepare for deployment"
   git push origin main
   ```

2. **Deploy on Railway**
   - Connect your GitHub repository to Railway
   - Set up environment variables in Railway dashboard
   - Railway will automatically detect and deploy the application

3. **Configure Environment**
   - Add all required environment variables
   - Set `NODE_ENV=production`
   - Update `CLIENT_URL` to your production domain

---

## 👨‍💻 Author

**Ahmed Ayman**
- GitHub: [@AhmedAyman77](https://github.com/AhmedAyman77)
- Repository: [chat-app](https://github.com/AhmedAyman77/chat-app)

---

## 🙏 Acknowledgments

- **Socket.IO** for real-time communication
- **Arcjet** for security and rate limiting
- **Cloudinary** for image hosting
- **MongoDB** for database
- **Railway** for hosting
- **Tailwind CSS** & **DaisyUI** for beautiful UI components

---

## 📊 Project Statistics

- **Lines of Code**: ~5000+
- **Components**: 14+ React components
- **API Endpoints**: 9+ REST endpoints
- **Real-time Events**: 3+ Socket.IO events
- **Dependencies**: 30+ npm packages

---

## 🐛 Known Issues

No critical issues at the moment. If you find a bug, please [open an issue](https://github.com/AhmedAyman77/chat-app/issues).

---

## 🔮 Future Enhancements

- [ ] Group chat functionality
- [ ] Voice and video calls
- [ ] Message reactions and emojis
- [ ] File sharing (PDF, documents)
- [ ] Message search functionality
- [ ] User blocking feature
- [ ] Message encryption
- [ ] Push notifications
- [ ] Message read receipts
- [ ] Dark/Light theme toggle

---

⭐ Star this repository if you find it helpful!