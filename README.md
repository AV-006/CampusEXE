# 🎓 CampusExe

> Your AI-powered Campus Management System  
> **CampusExe** is a multi-agent AI system designed to improve daily life in colleges and universities — bridging communication gaps, enhancing student engagement, and automating faculty-student interactions.

---

## 🌟 Features

### 🧩 Core Modules
- **📚 Resources Hub** – Teachers upload and share notes, PPTs, and study materials.  
- **🤖 AI Tutor Agent** – Personalized AI chat assistant to guide students using Gemini AI.  
- **🏆 Class Interaction** – Gamified participation system with points, leaderboards, and rewards.  
- **🧾 Anonymous Feedback** – Students submit feedback; AI generates summarized reports for faculty.  
- **🏛️ Campus Services** – Access library availability, daily menus, and gym details through a smart chat agent.  
- **🎉 Events & Exams** – Register, volunteer, or view details for upcoming events and exams.

---

## 🧠 Tech Stack

| Layer | Technologies |
|-------|---------------|
| **Frontend** | Next.js 15, React, Tailwind CSS |
| **AI & Agents** | Firebase Genkit, Google Gemini AI |
| **Auth & Hosting** | Firebase Authentication, Firebase Hosting |
| **Tools** | VS Code, GitHub, Postman |

---

## ⚙️ Prerequisites

Make sure the following are installed:

- **Node.js (v18 or higher)**
- **Firebase CLI**
- **Gemini API Key**

---

## 🚀 How to Run CampusExe Locally

### 🧩 Step 1 — Clone the Repository

```bash
git clone https://github.com/AV-006/CampusEXE.git
cd CampusEXE
```
### 🧩 Step 2 — Install Dependencies
```bash
npm i
```
### 🧩 Step 3 — Install Firebase tools

```bash
npm install -g firebase-tools
firebase login
```
### 🧩 Step 4 — Setting up Gemini

```bash
npm install genkit @genkit-ai/google-genai dotenv
```
### 🧩 Step 5 — Setup your environment variables accordingly and run:
```bash
npm run dev
```
