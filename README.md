# 📚 Book Management System

![Build Status](https://github.com/iamAditya-DS/Book-Management-System/actions/workflows/health-check.yml/badge.svg)

Book Management System project used to demonstrate secure API management and CI/CD pipeline implementation.

## 🚀 Overview
This application allows users to search for books in real-time using the **Google Books API**. It was built with a strong focus on professional DevOps practices, ensuring that sensitive credentials are never exposed and that the application is automatically tested upon every update.

## ✨ Features
* **Real-time Book Search**: Connects directly to the Google Books API for up-to-date information.
* **Secure Backend**: Environment variables are protected locally via `.gitignore`.
* **Automated CI/CD**: Uses GitHub Actions to verify backend health on every push.
* **Secret Management**: Sensitive API keys are managed securely using GitHub Secrets.

## 🛠️ Tech Stack
* **Frontend**: HTML, CSS, JavaScript
* **Backend**: Node.js, Express.js
* **DevOps**: GitHub Actions, Git

## 🛡️ CI/CD Implementation
The project includes a custom GitHub Actions workflow (`health-check.yml`) that automates the following steps:
1.  Provisioning a virtual Ubuntu environment.
2.  Installing dependencies via `npm`.
3.  Injecting the **Google Books API Key** from GitHub Secrets.
4.  Starting the server and performing a health check to ensure the API is reachable.


## 🛠️ Technical Challenges & Solutions

### 1. Secret Leak Remediation
* **Challenge**: During an early push, the API key was accidentally committed to a public repository.
* **Solution**: Immediately revoked the compromised API key in the Google Cloud Console, scrubbed the Git history using `git rm -r --cached .`, and re-initialized a clean repository to ensure no trace of the secret remained.

### 2. Automated Pipeline Configuration
* **Challenge**: Configuring GitHub Actions to recognize the local folder structure and inject secure variables.
* **Solution**: Corrected the directory pathing to `.github/workflows/` and utilized GitHub Secrets to securely pass the `GOOGLE_BOOKS_API_KEY` into the virtual Ubuntu runner environment during the health check phase.


## ⚙️ Local Setup

1.  **Clone the repository**:
    ```bash
    git clone [https://github.com/iamAditya-DS/Book-Management-System.git](https://github.com/iamAditya-DS/Book-Management-System.git)
    ```
2.  **Install dependencies**:
    ```bash
    cd backend
    npm install
    ```
3.  **Configure Environment**:
    Create a `.env` file in the `backend` folder and add your key:
    ```text
    GOOGLE_BOOKS_API_KEY=your_key_here
    ```
4.  **Run the application**:
    ```bash
    node server.js
    ```
