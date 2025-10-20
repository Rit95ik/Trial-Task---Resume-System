# 📋 Quick Deployment Checklist

## Before You Start
- [x] MongoDB Atlas database created
- [x] Code pushed to GitHub
- [x] Deployment configurations added

## Step 1: Deploy Backend to Render.com (15 minutes)

### 1.1 Create Account & Import
- [ ] Go to https://render.com
- [ ] Sign up / Login with GitHub
- [ ] Click "New +" → "Web Service"
- [ ] Select repository: `Trial-Task---Resume-System`

### 1.2 Configure Service
```
Name: resume-builder-backend
Region: (your choice)
Branch: master
Root Directory: server
Runtime: Node
Build Command: npm install
Start Command: npm start
Instance: Free
```

### 1.3 Environment Variables
Click "Advanced" → Add these:

```
MONGODB_URI = mongodb+srv://<user>:<pass>@cluster.mongodb.net/resume-system
JWT_SECRET = (generate with: openssl rand -base64 32)
PORT = 5000
NODE_ENV = production
OPENAI_API_KEY = (optional)
FRONTEND_URL = (add after frontend deployment)
```

### 1.4 Deploy
- [ ] Click "Create Web Service"
- [ ] Wait 5-10 minutes
- [ ] Copy your backend URL: `https://______.onrender.com`
- [ ] Test: Visit `https://your-url.onrender.com/api/health`

---

## Step 2: Deploy Frontend to Vercel (10 minutes)

### 2.1 Create Account & Import
- [ ] Go to https://vercel.com
- [ ] Sign up / Login with GitHub
- [ ] Click "Add New" → "Project"
- [ ] Select repository: `Trial-Task---Resume-System`

### 2.2 Configure Project
```
Framework: Vite
Root Directory: client
Build Command: npm run build
Output Directory: dist
```

### 2.3 Environment Variable
Click "Environment Variables" → Add:

```
VITE_API_URL = https://your-backend.onrender.com/api
```
(Use the URL you copied from Render)

### 2.4 Deploy
- [ ] Click "Deploy"
- [ ] Wait 3-5 minutes
- [ ] Copy your frontend URL: `https://______.vercel.app`

---

## Step 3: Update Backend CORS (5 minutes)

### 3.1 Go back to Render.com
- [ ] Open your backend service
- [ ] Go to "Environment" tab
- [ ] Add/Update variable:
  ```
  FRONTEND_URL = https://your-app.vercel.app
  ```
  (Use the URL you copied from Vercel)
- [ ] Click "Save Changes"
- [ ] Wait for auto-redeploy (~2 minutes)

---

## Step 4: Configure MongoDB Atlas (2 minutes)

### 4.1 Allow All IPs
- [ ] Go to MongoDB Atlas Dashboard
- [ ] Click "Network Access" (left sidebar)
- [ ] Click "Add IP Address"
- [ ] Select "Allow Access from Anywhere" (0.0.0.0/0)
- [ ] Click "Confirm"

---

## Step 5: Test Your Application (5 minutes)

### 5.1 Visit Your Vercel URL
- [ ] Open: `https://your-app.vercel.app`
- [ ] Page loads without errors ✓

### 5.2 Test Registration
- [ ] Click "Sign up"
- [ ] Create account: name, email, password
- [ ] Should login successfully ✓

### 5.3 Test Resume Features
- [ ] Fill in personal info
- [ ] Add education
- [ ] Add experience
- [ ] Add projects
- [ ] Add skills
- [ ] Click "Generate AI Summary" ✓
- [ ] Summary appears in preview ✓

### 5.4 Test Data Persistence
- [ ] Click "Save Resume"
- [ ] See "Resume saved successfully" message ✓
- [ ] Logout
- [ ] Login again
- [ ] Resume data auto-loads ✓

### 5.5 Test Templates
- [ ] Click on different template buttons
- [ ] Preview changes instantly ✓

---

## ✅ Deployment Complete!

### Your Live URLs:
- **Frontend**: https://your-app.vercel.app
- **Backend**: https://your-backend.onrender.com
- **API Health**: https://your-backend.onrender.com/api/health

### Share These:
- Repository: https://github.com/Rit95ik/Trial-Task---Resume-System
- Live App: https://your-app.vercel.app
- Documentation: See README.md in repository

---

## ⚠️ Important Notes

**Free Tier Warning:**
- Render.com free tier sleeps after 15 min inactivity
- First request will take 30-60 seconds to wake up
- This is normal for free tier

**Security:**
- ✓ Never share your .env file
- ✓ Keep MongoDB credentials private
- ✓ Use strong JWT_SECRET

**Next Steps:**
- Add custom domain (optional)
- Upgrade to paid plans for better performance
- Monitor usage and logs

---

## 🆘 Troubleshooting

### Frontend shows "Network Error"
→ Check VITE_API_URL in Vercel environment variables
→ Ensure backend is running (visit health endpoint)

### Backend deployment fails
→ Check Render logs
→ Verify all environment variables are set
→ Ensure MongoDB URI is correct

### Can't save resume data
→ Check MongoDB Atlas network access (allow 0.0.0.0/0)
→ Verify MongoDB URI includes database name
→ Check backend logs in Render

### AI Summary not working
→ Works without OpenAI key (uses fallback)
→ Check if resume has enough data
→ Inspect browser console for errors

---

## 📞 Support Links

- Vercel Docs: https://vercel.com/docs
- Render Docs: https://render.com/docs  
- MongoDB Atlas: https://docs.atlas.mongodb.com

---

**Estimated Total Time: 35-40 minutes**

🎉 **Good luck with your deployment!**
