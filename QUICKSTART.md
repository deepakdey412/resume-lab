# Quick Start Guide

Get the Smart Resume Analyzer running in 2 minutes!

## Step 1: Start Backend (30 seconds)

Open a terminal in the project root and run:

```bash
cd backend
.\mvnw.cmd spring-boot:run
```

Wait for this message:
```
Started SmartResumeAnalyzerApplication in X.XXX seconds
```

✅ Backend is now running on `http://localhost:8081`

## Step 2: Open Frontend (10 seconds)

**Option A: Direct Open (Easiest)**
1. Navigate to the `frontend` folder
2. Double-click `index.html`
3. It will open in your default browser

**Option B: Using HTTP Server (Recommended)**
```bash
cd frontend
python -m http.server 3000
```
Then open `http://localhost:3000` in your browser

## Step 3: Use the Application (1 minute)

### First Time User:
1. Click "Sign Up"
2. Enter your details:
   - Full Name: `John Doe`
   - Email: `john@example.com`
   - Password: `password123`
3. Click "Sign Up" button

### Upload Resume:
1. Click "Upload Resume" in sidebar
2. Select a PDF or DOCX resume file
3. Wait for analysis (5-10 seconds)
4. View your job matches!

### View Dashboard:
1. Click "Dashboard" in sidebar
2. See your statistics
3. View all uploaded resumes
4. Check match percentages

## 🎉 That's It!

You're now ready to analyze resumes and find the best job matches!

## 📊 What You'll See

The application comes pre-loaded with 5 job roles:
- Software Engineer (20 skills)
- Data Scientist (20 skills)
- Frontend Developer (20 skills)
- DevOps Engineer (20 skills)
- Product Manager (20 skills)

Your resume will be matched against all these roles automatically!

## 🔧 Troubleshooting

**Backend won't start?**
- Make sure Java 17+ is installed: `java -version`
- Check if port 8081 is free

**Frontend won't load?**
- Try opening `index.html` directly in browser
- Check browser console (F12) for errors

**Can't upload file?**
- File must be PDF or DOCX
- Max size: 10MB
- Make sure backend is running

## 📝 Test Credentials

After signing up, you can use these credentials to login:
- Email: (the email you signed up with)
- Password: (the password you created)

## 🎯 Next Steps

1. Upload multiple resumes to compare
2. Check the dashboard for statistics
3. View matched and missing skills
4. Improve your resume based on suggestions

Enjoy analyzing resumes! 🚀
