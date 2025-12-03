
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
Edit profile + settings<img width="1440" height="810" alt="Screenshot 2025-05-08 at 00 56 39" src="https://github.com/user-attachments/assets/b93d9af1-c17e-4325-b483-36c34aead020" />
<img width="1440" height="814" alt="Screenshot 2025-05-08 at 00 49 20" src="https://github.com/user-attachments/assets/99d3b045-a9a8-4c2a-adc6-1f0d894df5d6" />
<img width="1440" height="814" alt="Screenshot 2025-05-08 at 00 49 09" src="https://github.com/user-attachments/assets/39ecb2f8-b0b3-4642-bf3c-3fd05a175e0e" />
<img width="1440" height="814" alt="Screenshot 2025-05-08 at 00 49 03" src="https://github.com/user-attachments/assets/babbe347-ef0b-4434-a5be-1a675c4bdb98" />
<img width="1440" height="814" alt="Screenshot 2025-05-08 at 00 48 46" src="https://github.com/user-attachments/assets/ed8d995c-2a65-4618-8092-655a771fc5c6" />
<img width="1440" height="814" alt="Screenshot 2025-05-08 at 00 47 18" src="https://github.com/user-attachments/assets/f034d1b9-a479-4c40-ac8e-83ea305dc052" />
<img width="1440" height="814" alt="Screenshot 2025-05-08 at 00 45 36" src="https://github.com/user-attachments/assets/03393171-ef1f-4803-b587-ab389ff30701" />
<img width="1440" height="814" alt="Screenshot 2025-05-08 at 00 42 50" src="https://github.com/user-attachments/assets/e7582b2d-8bb6-4c3d-a2c5-73a0e443fce0" />
<img width="1440" height="814" alt="Screenshot 2025-05-08 at 00 42 39" src="https://github.com/user-attachments/assets/246683ed-7efa-4e33-a121-49b44eadd4c3" />
<img width="1440" height="814" alt="Screenshot 2025-05-08 at 00 42 07" src="https://github.com/user-attachments/assets/d0223b81-f526-496c-9dbc-120f02250006" />
<img width="1440" height="814" alt="Screenshot 2025-05-08 at 00 42 00" src="https://github.com/user-attachments/assets/ae9424a4-72e3-4fa6-8bd5-5f283898ace8" />
<img width="1440" height="814" alt="Screenshot 2025-05-08 at 00 41 54" src="https://github.com/user-attachments/assets/c97f4af5-f76b-4578-a2c5-ac961b4f5650" />
<img width="1440" height="814" alt="Screenshot 2025-05-08 at 00 41 36" src="https://github.com/user-attachments/assets/e06c4b64-7aa7-4258-8866-7d774ea030b0" />
<img width="1920" height="1080" alt="Screenshot 2025-05-08 at 00 41 21" src="https://github.com/user-attachments/assets/03e65fdb-8054-42e2-acb9-0bf40633440e" />
<img width="1440" height="900" alt="Screenshot 2025-05-08 at 00 41 21 (2)" src="https://github.com/user-attachments/assets/3ddbe172-2660-4cbf-bcc1-f143c61ecbf0" />
<img width="1440" height="822" alt="Screenshot 2025-05-08 at 00 40 19" src="https://github.com/user-attachments/assets/948bec5b-2def-4505-81e7-0c39e9a712bf" />
<img width="1440" height="822" alt="Screenshot 2025-05-08 at 00 39 47" src="https://github.com/user-attachments/assets/8872b114-19a5-4f1a-b5d3-61eabe211308" />
<img width="1440" height="810" alt="Screenshot 2025-05-08 at 00 32 26" src="https://github.com/user-attachments/assets/ba0d152a-e50b-4a85-88b1-e4bc9da598b5" />

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
