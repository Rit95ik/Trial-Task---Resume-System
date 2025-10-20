# 🚀 Deployment Guide

## Production Deployment Options

### Option 1: Deploy to Vercel (Frontend) + Railway (Backend)

#### Frontend Deployment (Vercel)

1. **Prepare Frontend**
   ```bash
   cd client
   npm run build
   ```

2. **Create vercel.json**
   ```json
   {
     "rewrites": [
       { "source": "/(.*)", "destination": "/" }
     ]
   }
   ```

3. **Deploy**
   ```bash
   npm install -g vercel
   vercel login
   vercel --prod
   ```

4. **Update API URL**
   - In `client/src/utils/api.js`, change:
   ```javascript
   const API_BASE_URL = 'https://your-backend-url.railway.app/api';
   ```

#### Backend Deployment (Railway)

1. **Create Railway Account**
   - Go to [Railway.app](https://railway.app)
   - Connect your GitHub repository

2. **Add MongoDB Plugin**
   - In Railway dashboard, click "New" → "Database" → "MongoDB"
   - Copy the connection string

3. **Set Environment Variables**
   ```
   MONGODB_URI=<your-railway-mongodb-url>
   JWT_SECRET=<secure-random-string>
   PORT=5000
   OPENAI_API_KEY=<your-openai-key>
   ```

4. **Deploy**
   - Railway automatically deploys on git push
   - Or use Railway CLI:
   ```bash
   npm install -g @railway/cli
   railway login
   railway up
   ```

---

### Option 2: Deploy to Render (Full Stack)

#### Backend Deployment

1. **Create render.yaml**
   ```yaml
   services:
     - type: web
       name: resume-builder-api
       env: node
       buildCommand: cd server && npm install
       startCommand: cd server && npm start
       envVars:
         - key: MONGODB_URI
           sync: false
         - key: JWT_SECRET
           generateValue: true
         - key: PORT
           value: 5000
   ```

2. **Deploy to Render**
   - Push to GitHub
   - Connect repository in Render dashboard
   - Add environment variables
   - Deploy

#### Frontend Deployment

1. **Update API URL**
   ```javascript
   const API_BASE_URL = 'https://your-app.onrender.com/api';
   ```

2. **Deploy**
   - Create new Static Site in Render
   - Build command: `cd client && npm install && npm run build`
   - Publish directory: `client/dist`

---

### Option 3: Deploy to Heroku (All-in-One)

#### 1. Prepare for Heroku

**Create `Procfile`:**
```
web: cd server && npm start
```

**Update package.json** (root):
```json
{
  "name": "resume-builder",
  "version": "1.0.0",
  "scripts": {
    "install-client": "cd client && npm install",
    "install-server": "cd server && npm install",
    "build": "cd client && npm run build",
    "start": "cd server && npm start",
    "heroku-postbuild": "npm run install-client && npm run install-server && npm run build"
  }
}
```

#### 2. Deploy

```bash
# Install Heroku CLI
npm install -g heroku

# Login
heroku login

# Create app
heroku create resume-builder-app

# Add MongoDB
heroku addons:create mongolab:sandbox

# Set environment variables
heroku config:set JWT_SECRET=your-secret-here
heroku config:set OPENAI_API_KEY=your-key-here

# Deploy
git push heroku main

# Open app
heroku open
```

---

### Option 4: Docker Deployment

#### 1. Create Dockerfiles

**server/Dockerfile:**
```dockerfile
FROM node:18-alpine
WORKDIR /app
COPY package*.json ./
RUN npm install --production
COPY . .
EXPOSE 5000
CMD ["npm", "start"]
```

**client/Dockerfile:**
```dockerfile
FROM node:18-alpine as build
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

FROM nginx:alpine
COPY --from=build /app/dist /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
```

**client/nginx.conf:**
```nginx
server {
  listen 80;
  location / {
    root /usr/share/nginx/html;
    index index.html;
    try_files $uri $uri/ /index.html;
  }
}
```

#### 2. Docker Compose

**docker-compose.yml:**
```yaml
version: '3.8'
services:
  mongodb:
    image: mongo:6
    ports:
      - "27017:27017"
    volumes:
      - mongo-data:/data/db

  backend:
    build: ./server
    ports:
      - "5000:5000"
    environment:
      - MONGODB_URI=mongodb://mongodb:27017/resume-system
      - JWT_SECRET=${JWT_SECRET}
      - OPENAI_API_KEY=${OPENAI_API_KEY}
    depends_on:
      - mongodb

  frontend:
    build: ./client
    ports:
      - "80:80"
    depends_on:
      - backend

volumes:
  mongo-data:
```

#### 3. Deploy

```bash
# Build and run
docker-compose up -d

# View logs
docker-compose logs -f

# Stop
docker-compose down
```

---

### Option 5: AWS Deployment

#### Architecture
- **EC2** - Host Node.js backend
- **S3 + CloudFront** - Host React frontend
- **MongoDB Atlas** - Database
- **Route 53** - DNS
- **Certificate Manager** - SSL

#### Backend (EC2)

```bash
# SSH into EC2
ssh -i your-key.pem ubuntu@your-ec2-ip

# Install Node.js
curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
sudo apt-get install -y nodejs

# Install PM2
sudo npm install -g pm2

# Clone repository
git clone your-repo-url
cd resume-system/server

# Install dependencies
npm install

# Set environment variables
nano .env

# Start with PM2
pm2 start server.js --name resume-api
pm2 startup
pm2 save

# Setup Nginx reverse proxy
sudo apt install nginx
sudo nano /etc/nginx/sites-available/default
```

**Nginx config:**
```nginx
server {
  listen 80;
  server_name your-domain.com;

  location /api {
    proxy_pass http://localhost:5000;
    proxy_http_version 1.1;
    proxy_set_header Upgrade $http_upgrade;
    proxy_set_header Connection 'upgrade';
    proxy_set_header Host $host;
    proxy_cache_bypass $http_upgrade;
  }
}
```

#### Frontend (S3)

```bash
# Build frontend
cd client
npm run build

# Install AWS CLI
npm install -g aws-cli

# Configure AWS
aws configure

# Create S3 bucket
aws s3 mb s3://resume-builder-frontend

# Upload files
aws s3 sync dist/ s3://resume-builder-frontend

# Enable static website hosting
aws s3 website s3://resume-builder-frontend --index-document index.html

# Setup CloudFront distribution
aws cloudfront create-distribution --origin-domain-name resume-builder-frontend.s3.amazonaws.com
```

---

## Production Checklist

### Security
- [ ] Change JWT_SECRET to secure random string
- [ ] Enable HTTPS/SSL
- [ ] Set up CORS properly
- [ ] Add rate limiting
- [ ] Enable MongoDB authentication
- [ ] Use environment variables for all secrets
- [ ] Add helmet.js for security headers

### Performance
- [ ] Enable gzip compression
- [ ] Add Redis caching
- [ ] Optimize database queries
- [ ] Add CDN for static assets
- [ ] Minify frontend code
- [ ] Enable HTTP/2

### Monitoring
- [ ] Set up error tracking (Sentry)
- [ ] Add logging (Winston, Morgan)
- [ ] Monitor uptime (UptimeRobot)
- [ ] Track analytics (Google Analytics)
- [ ] Set up alerts

### Backup
- [ ] Schedule MongoDB backups
- [ ] Version control (Git)
- [ ] Database migration strategy
- [ ] Disaster recovery plan

---

## Environment Variables (Production)

```env
# Server (.env)
NODE_ENV=production
MONGODB_URI=mongodb+srv://user:pass@cluster.mongodb.net/resume-prod
JWT_SECRET=super-secure-random-string-min-32-chars
PORT=5000
OPENAI_API_KEY=sk-...
FRONTEND_URL=https://your-domain.com

# Client (build time)
VITE_API_URL=https://api.your-domain.com
```

---

## Post-Deployment Testing

1. **Health Check**
   ```bash
   curl https://api.your-domain.com/api/health
   ```

2. **Register User**
   ```bash
   curl -X POST https://api.your-domain.com/api/auth/register \
     -H "Content-Type: application/json" \
     -d '{"name":"Test","email":"test@example.com","password":"test123"}'
   ```

3. **Load Frontend**
   - Visit https://your-domain.com
   - Check console for errors
   - Test full registration/login flow

---

## Domain Setup

1. **Purchase Domain** (Namecheap, GoDaddy, etc.)

2. **DNS Configuration**
   ```
   Type    Name    Value
   A       @       <backend-ip>
   A       api     <backend-ip>
   CNAME   www     your-domain.com
   ```

3. **SSL Certificate** (Let's Encrypt)
   ```bash
   sudo apt install certbot python3-certbot-nginx
   sudo certbot --nginx -d your-domain.com -d www.your-domain.com
   ```

---

## Scaling Strategy

### Horizontal Scaling
- Load balancer (AWS ELB, Nginx)
- Multiple backend instances
- Database replication
- Redis session store

### Vertical Scaling
- Increase server resources
- Optimize database indexes
- Cache frequently accessed data

---

## Cost Estimation (Monthly)

| Service | Free Tier | Paid (Small) |
|---------|-----------|--------------|
| MongoDB Atlas | ✅ 512MB | $9 (2GB) |
| Railway/Render | ✅ 500hrs | $7 |
| Vercel | ✅ 100GB | $20 |
| Domain | - | $12/year |
| **Total** | **$0** | **~$30/mo** |

---

## Support & Maintenance

- Monitor logs daily
- Update dependencies monthly
- Backup database weekly
- Review security quarterly
- Performance audit bi-annually

---

**Ready for Production! 🚀**
