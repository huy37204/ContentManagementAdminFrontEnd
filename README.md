# 📘 Admin Frontend – Content Management System

This is the **admin-facing frontend** of the Content Management System, built with **React**, **TypeScript**, and **TailwindCSS**. It allows regular admins and editors to make changes for content and users' accounts.

## 🚀 Features

- **CRUD Users' Accounts**:  
  Admin can **Create**, **Update**, and **Delete** users' accounts.

- **CRUD Content**:  
  Editors can **Create**, **Preview**, **Update**, **Upload image/\*, video/\*** and **Delete** contents.

- **Content Block Types**:

  - **Text**: Paragraphs, headings.
  - **Image**: Upload images to **S3**.
  - **Video**: Upload videos to **S3**.

- **Preview**:  
  Editors can preview the structured content before submitting.

- **Submit**:  
  Editors submit content changes to apply them on the client-side frontend for realtime.

---

## 🚧 Constraints

- Admin Self-Protection:
  Admin cannot edit or delete their own account to prevent accidental lockout or privilege loss.

- Content Submission Flow:
  Any content that an Editor creates or updates will always be saved in **'draft'** status by default.
  Editors after preview that content can then publish it.

## 🧩 Technologies Used

- **React** (with Hooks)
- **Vite** – lightning-fast build tool
- **TypeScript**
- **TailwindCSS**
- **React Router**
- **Axios** for API calls

---

## ⚙️ Installation

### 1. Clone the repository

```bash
git clone https://github.com/huy37204/ContentManagementAdminFrontEnd.git
```

### 2. Install dependencies

```bash
npm install
```

### 💻 Running the App

```bash
npm run dev
```

The app will be available at http://localhost:5173 by default.

### 🧠 Notes

All requests requiring authentication should include the Bearer token in headers.

Login is required to unlock certain features (e.g., private content, user info).

### 🛠 Workflow File: `.github/workflows/admin-ci.yml`

```yaml
name: Admin Frontend CI

on:
  push:
    branches: [main]
  pull_request:

jobs:
  build:
    runs-on: ubuntu-latest

    steps:
      - uses: actions/checkout@v3

      - name: Setup Node.js
        uses: actions/setup-node@v3
        with:
          node-version: 18

      - name: Install dependencies
        run: npm install

      - name: Run build
        run: npm run build
```

## 📹 Video Demo

Watch the demo video here:  
▶️ [Click to watch on YouTube](https://www.youtube.com/watch?v=2qURYZtp5g8)

## 👨‍💻 Maintainer

Tran Nhat Huy

Email: huy37204@gmail.com
