# 🚀 Quick Start Guide

## Option 1: Using MongoDB Atlas (Recommended - No Installation Required)

### Step 1: Create a Free MongoDB Atlas Account

1. Go to [MongoDB Atlas](https://www.mongodb.com/cloud/atlas/register)
2. Sign up for a free account
3. Create a new cluster (free tier is sufficient)
4. Wait for the cluster to be created (2-3 minutes)

### Step 2: Get Your Connection String

1. Click "Connect" on your cluster
2. Select "Connect your application"
3. Copy the connection string (looks like: `mongodb+srv://username:password@cluster.mongodb.net/`)
4. Replace `<password>` with your actual password

### Step 3: Configure Backend

1. Open `server/.env`
2. Replace the `MONGODB_URI` with your Atlas connection string:
   ```
   MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/resume-system?retryWrites=true&w=majority
   ```

## Option 2: Local MongoDB Installation

### Windows

1. Download MongoDB Community Server from [MongoDB Downloads](https://www.mongodb.com/try/download/community)
2. Run the installer and follow the setup wizard
3. Install as a Windows Service
4. MongoDB will start automatically

### macOS

```bash
# Install using Homebrew
brew tap mongodb/brew
brew install mongodb-community

# Start MongoDB
brew services start mongodb-community
```

### Linux (Ubuntu/Debian)

```bash
# Import MongoDB public key
wget -qO - https://www.mongodb.org/static/pgp/server-6.0.asc | sudo apt-key add -

# Add MongoDB repository
echo "deb [ arch=amd64,arm64 ] https://repo.mongodb.org/apt/ubuntu focal/mongodb-org/6.0 multiverse" | sudo tee /etc/apt/sources.list.d/mongodb-org-6.0.list

# Update and install
sudo apt-get update
sudo apt-get install -y mongodb-org

# Start MongoDB
sudo systemctl start mongod
sudo systemctl enable mongod
```

## Starting the Application

### Terminal 1: Backend Server

```bash
cd server
npm run dev
```

You should see:
```
✅ MongoDB Connected Successfully
🚀 Server running on port 5000
```

### Terminal 2: Frontend Development Server

```bash
cd client
npm run dev
```

You should see:
```
  VITE ready in XXXms
  ➜  Local:   http://localhost:5173/
```

### Access the Application

Open your browser and navigate to: **http://localhost:5173**

## Troubleshooting

### MongoDB Connection Failed

**Error:** `MongooseServerSelectionError: connect ECONNREFUSED`

**Solution:**
- If using local MongoDB, ensure it's running:
  ```bash
  # Windows
  net start MongoDB
  
  # macOS
  brew services start mongodb-community
  
  # Linux
  sudo systemctl start mongod
  ```
- If using Atlas, check your connection string and network access settings

### Port Already in Use

**Error:** `Port 5000 is already in use`

**Solution:**
```bash
# Find and kill the process
npx kill-port 5000

# Or change the port in server/.env
PORT=5001
```

### CORS Errors

**Solution:**
- Ensure backend is running on http://localhost:5000
- Update `API_BASE_URL` in `client/src/utils/api.js` if using different port

## Testing the Application

1. **Register a new account**
   - Click "Sign up"
   - Enter your name, email, and password (min 6 characters)

2. **Login**
   - Use your credentials to log in

3. **Build your resume**
   - Fill out Personal Info
   - Add Education entries
   - Add Work Experience
   - Add Projects
   - List your Skills

4. **Generate AI Summary**
   - Click "✨ Generate AI Summary"
   - Watch the AI create a professional summary

5. **Save your resume**
   - Click "💾 Save Resume"
   - Your data is now persisted

6. **Test persistence**
   - Logout and login again
   - Your resume should auto-load

## Next Steps

- Customize the resume template
- Add more sections (certifications, achievements)
- Export to PDF
- Share your resume with a unique link

Enjoy building your professional resume! 🎉
