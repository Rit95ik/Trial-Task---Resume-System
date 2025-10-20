# 🚀 Deployment Guide - Vercel + Render.com

## Prerequisites
- [x] GitHub repository created and code pushed
- [x] MongoDB Atlas database set up
- [ ] Vercel account (sign up at https://vercel.com)
- [ ] Render.com account (sign up at https://render.com)

---

## Part 1: Deploy Backend to Render.com

### Step 1: Create New Web Service

1. Go to https://render.com and log in
2. Click **"New +"** button → Select **"Web Service"**
3. Connect your GitHub repository
4. Select: `Trial-Task---Resume-System`

### Step 2: Configure Web Service

Fill in the following settings:

**Basic Settings:**
- **Name**: `resume-builder-backend` (or your preferred name)
- **Region**: Choose closest to your users
- **Branch**: `master`
- **Root Directory**: `server`
- **Runtime**: `Node`
- **Build Command**: `npm install`
- **Start Command**: `npm start`

**Instance Type:**
- Select **"Free"** (or paid plan for better performance)

### Step 3: Add Environment Variables

Click **"Advanced"** → **"Add Environment Variable"**

Add these variables:

| Key | Value |
|-----|-------|
| `MONGODB_URI` | `mongodb+srv://<username>:<password>@cluster.mongodb.net/resume-system?retryWrites=true&w=majority` |
| `JWT_SECRET` | `your-secure-random-string-min-32-characters` |
| `PORT` | `5000` |
| `OPENAI_API_KEY` | `your-openai-key` (optional) |
| `FRONTEND_URL` | `https://your-app.vercel.app` (add this after deploying frontend) |
| `NODE_ENV` | `production` |

**Important:** 
- Replace `<username>` and `<password>` with your MongoDB Atlas credentials
- Generate a strong JWT_SECRET (you can use: `openssl rand -base64 32`)

### Step 4: Deploy

1. Click **"Create Web Service"**
2. Wait for deployment (5-10 minutes)
3. Once deployed, you'll get a URL like: `https://resume-builder-backend.onrender.com`
4. **Copy this URL** - you'll need it for frontend deployment

### Step 5: Test Backend

Visit: `https://your-backend-url.onrender.com/api/health`

You should see: `{"status":"OK","message":"Server is running"}`

---

## Part 2: Deploy Frontend to Vercel

### Step 1: Install Vercel CLI (Optional)

```bash
npm install -g vercel
```

Or use the Vercel Dashboard (recommended for first-time users)

### Step 2: Deploy via Vercel Dashboard

1. Go to https://vercel.com and log in
2. Click **"Add New"** → **"Project"**
3. Import your GitHub repository: `Trial-Task---Resume-System`
4. Configure project:

**Framework Preset:** Vite
**Root Directory:** `client`
**Build Command:** `npm run build`
**Output Directory:** `dist`

### Step 3: Add Environment Variable

Click **"Environment Variables"**

| Key | Value |
|-----|-------|
| `VITE_API_URL` | `https://your-backend-url.onrender.com/api` |

**Important:** Replace with your actual Render.com backend URL

### Step 4: Deploy

1. Click **"Deploy"**
2. Wait for deployment (3-5 minutes)
3. Once deployed, you'll get a URL like: `https://resume-builder-xyz.vercel.app`

### Step 5: Update Backend CORS

Go back to Render.com:
1. Navigate to your backend service
2. Go to **"Environment"** tab
3. Update `FRONTEND_URL` variable:
   - Value: `https://your-app.vercel.app` (your Vercel URL)
4. Click **"Save Changes"**
5. Wait for auto-redeploy

---

## Part 3: Post-Deployment Setup

### Update MongoDB Atlas Network Access

1. Go to MongoDB Atlas Dashboard
2. Click **"Network Access"** (left sidebar)
3. Click **"Add IP Address"**
4. Select **"Allow Access from Anywhere"** (0.0.0.0/0)
   - Or add Render.com's IP addresses specifically
5. Click **"Confirm"**

### Test the Application

1. Visit your Vercel URL: `https://your-app.vercel.app`
2. Try to register a new user
3. Test all features:
   - Login
   - Fill resume form
   - Generate AI summary
   - Save resume
   - Logout and login again (test data persistence)

---

## Part 4: Custom Domain (Optional)

### For Vercel (Frontend):
1. Go to Project Settings → Domains
2. Add your custom domain
3. Update DNS records as instructed

### For Render (Backend):
1. Go to Service Settings → Custom Domains
2. Add your custom domain
3. Update DNS records as instructed

---

## Troubleshooting

### Frontend can't connect to backend
✅ **Check:**
- VITE_API_URL is set correctly in Vercel
- Backend is running (visit health endpoint)
- CORS is configured with correct frontend URL

### Backend won't start
✅ **Check:**
- All environment variables are set
- MongoDB URI is correct
- Build logs in Render dashboard

### 500 Server Error
✅ **Check:**
- MongoDB Atlas allows connections from anywhere
- JWT_SECRET is set
- Check Render logs for error messages

### AI Summary not working
✅ **Check:**
- OPENAI_API_KEY is set (or fallback will be used)
- Resume data is properly filled
- Check backend logs

---

## Environment Variables Summary

### Backend (Render.com)
```
MONGODB_URI=mongodb+srv://...
JWT_SECRET=your-secret-here
PORT=5000
OPENAI_API_KEY=sk-... (optional)
FRONTEND_URL=https://your-app.vercel.app
NODE_ENV=production
```

### Frontend (Vercel)
```
VITE_API_URL=https://your-backend.onrender.com/api
```

---

## Important Notes

⚠️ **Free Tier Limitations:**
- Render.com free tier spins down after 15 minutes of inactivity
- First request after inactivity will take 30-60 seconds to wake up
- Consider upgrading to paid plan for production use

✅ **Security:**
- Never commit `.env` files to Git
- Use strong JWT_SECRET
- Keep MongoDB credentials secure
- Enable MongoDB Atlas IP whitelisting for production

🎉 **Success Indicators:**
- Frontend loads without errors
- Can register and login
- Can save and load resume data
- AI summary generation works
- Data persists across sessions

---

## Quick Commands

### Redeploy Frontend (Vercel)
```bash
cd client
vercel --prod
```

### View Render Logs
```bash
# Via dashboard: Services → Your Service → Logs
```

### Test Backend Health
```bash
curl https://your-backend.onrender.com/api/health
```

### Test Frontend Build Locally
```bash
cd client
npm run build
npm run preview
```

---

**Need Help?**
- Vercel Docs: https://vercel.com/docs
- Render Docs: https://render.com/docs
- MongoDB Atlas: https://docs.atlas.mongodb.com

---

🎉 **Your Resume Builder is now live!**
