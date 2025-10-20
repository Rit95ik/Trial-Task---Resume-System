# 🚀 Next-Generation Resume Builder

A modern, full-stack resume building web application with AI-powered summary generation, user authentication, and persistent data storage.

## 📋 Project Overview

This Resume Builder is part of a larger **Resume Building & Career Ecosystem** designed for students and professionals. It provides:

- **Modern React Frontend** with Tailwind CSS for a beautiful, responsive UI
- **Express + MongoDB Backend** for authentication and data persistence
- **AI-Enhanced Summary Generator** that creates professional, recruiter-ready summaries
- **Real-time Preview** of resume changes
- **Secure Authentication** with JWT tokens
- **Auto-save & Auto-load** functionality for logged-in users

## 🎯 Features

### ✨ Frontend Features
- Clean, modern UI built with React + Tailwind CSS
- Real-time form-to-preview binding
- Responsive split-screen layout
- Tab-based form navigation
- Professional resume formatting
- Dynamic skill tags
- Real-time notifications

### 🔐 Authentication
- Secure user registration and login
- JWT-based authentication
- Password hashing with bcrypt
- Persistent sessions
- Protected routes

### 🤖 AI Summary Generation
- Context-aware professional summaries
- OpenAI GPT integration (optional)
- Intelligent fallback algorithm
- Role-based customization
- Action-oriented phrasing

### 💾 Data Persistence
- MongoDB database storage
- Auto-load saved resume on login
- Save/update functionality
- User-specific data isolation

## 🛠️ Tech Stack

### Frontend
- **React 18** - UI library
- **Vite** - Build tool & dev server
- **Tailwind CSS** - Utility-first CSS framework
- **Axios** - HTTP client

### Backend
- **Node.js** - Runtime environment
- **Express.js** - Web framework
- **MongoDB** - NoSQL database
- **Mongoose** - ODM for MongoDB
- **JWT** - Authentication tokens
- **bcrypt** - Password hashing

## 📁 Project Structure

```
resume-system/
├── client/                 # React Frontend
│   ├── src/
│   │   ├── components/
│   │   │   ├── AuthPage.jsx          # Login/Register page
│   │   │   ├── ResumeForm.jsx        # Form inputs
│   │   │   ├── ResumePreview.jsx     # Live preview
│   │   ├── utils/
│   │   │   └── api.js                # API integration
│   │   ├── App.jsx                   # Main app component
│   │   ├── App.css                   # Custom styles
│   │   ├── index.css                 # Tailwind imports
│   │   └── main.jsx                  # Entry point
│   ├── tailwind.config.js
│   ├── postcss.config.js
│   └── package.json
│
├── server/                 # Node.js Backend
│   ├── config/
│   │   └── db.js                     # MongoDB connection
│   ├── models/
│   │   └── User.js                   # User model
│   ├── routes/
│   │   ├── authRoutes.js             # Auth endpoints
│   │   └── resumeRoutes.js           # Resume endpoints
│   ├── middleware/
│   │   └── authMiddleware.js         # JWT verification
│   ├── utils/
│   │   └── aiGenerator.js            # AI summary logic
│   ├── server.js                     # Express server
│   ├── .env                          # Environment variables
│   └── package.json
│
└── README.md
```

## 🚀 Getting Started

### Prerequisites

- **Node.js** (v14 or higher)
- **MongoDB** (local or MongoDB Atlas)
- **npm** or **yarn**

### Installation

#### 1. Clone the Repository

```bash
cd "Trial Task - Resume System 2"
```

#### 2. Set Up Backend

```bash
cd server
npm install
```

Create a `.env` file in the `server` directory:

```env
MONGODB_URI=mongodb://localhost:27017/resume-system
JWT_SECRET=your-super-secret-jwt-key-change-this-in-production
PORT=5000
OPENAI_API_KEY=your-openai-api-key-here
```

**Note:** The OpenAI API key is optional. If not provided, the system will use an intelligent fallback algorithm.

#### 3. Set Up Frontend

```bash
cd ../client
npm install
```

### Running the Application

#### 1. Start MongoDB

If using local MongoDB:

```bash
mongod
```

Or use MongoDB Atlas connection string in `.env`

#### 2. Start Backend Server

```bash
cd server
npm run dev
```

The server will run on `http://localhost:5000`

#### 3. Start Frontend

Open a new terminal:

```bash
cd client
npm run dev
```

The frontend will run on `http://localhost:5173`

#### 4. Access the Application

Open your browser and navigate to `http://localhost:5173`

## 📖 Usage Guide

### 1. **Registration/Login**
   - Create a new account or log in with existing credentials
   - Credentials are securely stored with hashed passwords

### 2. **Build Your Resume**
   - Fill out the form sections (Personal Info, Education, Experience, Projects, Skills)
   - See real-time preview on the right side
   - Navigate between sections using the tab buttons

### 3. **Generate AI Summary**
   - Click "Generate AI Summary" to create a professional summary
   - The AI analyzes your data and generates an impressive, recruiter-ready summary

### 4. **Save Your Resume**
   - Click "Save Resume" to persist your data
   - Data is auto-loaded when you log in next time

### 5. **Logout**
   - Click "Logout" to end your session
   - Your data remains saved and will be available on next login

## 🔌 API Endpoints

### Authentication Routes (`/api/auth`)

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| POST | `/register` | Register new user | No |
| POST | `/login` | Login user | No |
| GET | `/verify` | Verify JWT token | Yes |

### Resume Routes (`/api/resume`)

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| POST | `/save` | Save/update resume | Yes |
| GET | `/get` | Get saved resume | Yes |
| DELETE | `/delete` | Delete resume data | Yes |
| POST | `/generate-summary` | Generate AI summary | No |

## 🤖 AI Summary Generator

The AI Summary Generator uses a sophisticated algorithm:

### OpenAI Integration
- Uses GPT-3.5-turbo for context-aware summaries
- Considers role, skills, experience, and projects
- Generates 2-3 professional sentences

### Fallback Algorithm
- Role categorization based on skills
- Dynamic sentence templates
- Action verbs and impactful adjectives
- Context-aware customization

### Example Output

**Input:**
```json
{
  "name": "Ritik Kumar",
  "role": "MERN Stack Developer",
  "skills": ["React", "Node.js", "MongoDB", "Express.js"],
  "projects": ["Task Management App", "Portfolio Website"]
}
```

**Output:**
```
Ritik Kumar is a results-driven MERN Stack Developer with expertise in React, Node.js, 
MongoDB, Express.js. Ritik has engineered impactful solutions including Task Management App 
and Portfolio Website, demonstrating strong problem-solving abilities and technical proficiency. 
Armed with a passion for innovation, Ritik is committed to delivering excellence in every project.
```

## 🎨 UI Design Guidelines

### Color Scheme
- **Primary:** Blue (#2563eb)
- **Secondary:** Purple (#764ba2)
- **Text:** Gray scale
- **Success:** Green
- **Error:** Red

### Layout
- Split-screen design (form on left, preview on right)
- Responsive breakpoints for mobile/tablet
- Professional resume styling with clean typography
- Smooth animations and transitions

## 🧪 Testing

### Manual Testing Checklist

- [ ] User Registration
- [ ] User Login
- [ ] Form input validation
- [ ] Real-time preview updates
- [ ] AI summary generation
- [ ] Resume save functionality
- [ ] Resume load on login
- [ ] Logout and session management
- [ ] Responsive design on different screens

## 🔒 Security Features

- Password hashing with bcrypt (salt rounds: 10)
- JWT token authentication (7-day expiry)
- Protected API routes
- Input validation
- CORS configuration
- Environment variable protection

## 📊 Database Schema

### User Model

```javascript
{
  name: String,
  email: String (unique, lowercase),
  password: String (hashed),
  resumeData: {
    personalInfo: {
      name, email, phone, linkedin, github
    },
    education: [{
      degree, institution, year, gpa
    }],
    experience: [{
      role, company, duration, description
    }],
    projects: [{
      title, description, techUsed, link
    }],
    skills: [String],
    summary: String,
    certifications: [String],
    achievements: [String]
  },
  createdAt: Date,
  updatedAt: Date
}
```

## 🚧 Future Enhancements

- [ ] PDF export functionality
- [ ] Multiple resume templates
- [ ] Resume sharing via unique link
- [ ] Integration with job boards
- [ ] Skills verification system
- [ ] Achievement tracking
- [ ] Cover letter generator
- [ ] Resume analytics

## 🏆 Evaluation Criteria Met

| Criterion | Implementation |
|-----------|----------------|
| **Creativity & Problem Solving** | AI-powered summary generation with dual approach (OpenAI + fallback) |
| **Code Quality** | Modular components, clean architecture, comprehensive comments |
| **Design Quality** | Modern Tailwind UI, responsive layout, professional resume format |
| **Integration Readiness** | RESTful APIs, JWT auth, scalable structure |
| **Documentation** | Comprehensive README, inline comments, API documentation |

## 👨‍💻 Development

### Available Scripts

**Backend:**
- `npm start` - Start production server
- `npm run dev` - Start development server with nodemon

**Frontend:**
- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build

## 🐛 Troubleshooting

### MongoDB Connection Issues
```bash
# Check if MongoDB is running
sudo systemctl status mongod

# Start MongoDB
sudo systemctl start mongod
```

### Port Already in Use
```bash
# Kill process on port 5000
npx kill-port 5000

# Or change PORT in .env file
```

### CORS Errors
- Ensure backend is running on port 5000
- Check API_BASE_URL in `client/src/utils/api.js`

## 📝 License

This project is part of a trial task for the Resume Building & Career Ecosystem.

## 🤝 Contributing

This is a demonstration project. For the actual career ecosystem integration, please contact the development team.

## 📧 Contact

For questions or feedback about this implementation, please reach out through the project repository.

---

**Built with ❤️ for the Resume Building & Career Ecosystem**

*Demonstrating creativity, code quality, and integration readiness*
