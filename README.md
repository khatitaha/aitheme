
🩺 Pneumonia Detection Web Platform
An end-to-end medical web platform that allows users to create an account, upload chest X-ray scans, and receive AI-powered pneumonia classification results.
Built with Next.js, Supabase, and a custom Deep Learning model, including authentication, premium subscriptions, admin dashboard, and fully integrated workflow from scan upload to diagnosis.
🚀 Features
🔐 Authentication & User Accounts
Email/password authentication (Supabase Auth)
Patient accounts
Premium subscription accounts
Admin accounts with protected routes
🖼️ AI Medical Scanning
Upload chest X-ray images
Real-time AI inference using a trained Deep Learning model
Binary classification: Pneumonia vs Normal
Scan history saved for each patient
Results available in user dashboard
⭐ Premium Account
Unlocks advanced AI scan features
Higher-priority scan queue
Extra analytics
Premium profile section
Secure payment integration
👨‍⚕️ Patient Features
View scan results
Book doctor appointments
Suggested doctors based on scan result
Edit profile + settings
🛠️ Admin Dashboard
Manage patient inquiries
View patient list
Post scan results
Manage appointments
Provide support
🧠 Deep Learning Model
Why Deep Learning?
To assist doctors in providing faster and more accurate diagnosis of pneumonia cases from chest X-rays.
Workflow
Data Collection
Preprocessing
Training (CNN model)
Binary classification
Multi-class classification (optional architecture)
Validation & Evaluation
Deployment into the web app
The model is integrated directly into the platform, providing classification at upload time.
🧩 Tech Stack
Frontend
Next.js 14 / React
TailwindCSS
Client & server components
Middleware-protected routes
Backend
Supabase
Authentication
Policies (RLS)
Database
File storage for scans
AI Model
Custom CNN / transfer learning architecture
Trained on medical X-ray datasets
Exported and integrated into the app
🗂️ Project Structure
/app
  /auth
  /dashboard
  /admin
  /premium
  /scan
/models
  pneumonia_model.h5
/lib
  supabase.ts
  auth.ts
/components
  UI components
/utils
  image preprocessing & inference

📊 Results
The AI model achieves strong performance in detecting pneumonia from chest X-rays.
Results include:
Accuracy
Precision / Recall / F1-score
Confusion matrix
(Provide screenshots or metrics here)
📘 Dissertation Structure (For Academic Use)
Chapter 1 — State of the art, related work
Chapter 2 — Proposed solution, system architecture
Chapter 3 — Experimentation, model results, and website development
📌 Future Improvements
Real-time doctor chat
Multi-disease classification
Mobile app version
Improving model inference speed
📝 License
MIT License – free to use and modify.
