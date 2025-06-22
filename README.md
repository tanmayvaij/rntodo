# ✅ React Native To-Do App

A minimal and efficient **To-Do app** built using **React Native (TypeScript)** with support for:

- 📋 Adding, updating, and deleting tasks
- 🔐 Firebase authentication with Google sign-in
- ☁️ Realtime Firestore database for storing tasks
- 💾 Local storage fallback to persist tasks offline

---

## 🚀 Features

- ✍️ Add new tasks
- 🔁 Update existing tasks
- ❌ Delete tasks
- 🔒 Google Sign-In using Firebase Authentication
- ☁️ Sync tasks to Firebase Firestore
- 💡 Uses local storage as a backup mechanism

---

## 🛠️ Tech Stack

| Technology        | Purpose                               |
|------------------|----------------------------------------|
| React Native      | Cross-platform mobile development      |
| TypeScript        | Static typing for improved DX          |
| Firebase Auth     | Google Sign-In for authentication      |
| Firestore DB      | Store and sync tasks in the cloud      |
| AsyncStorage      | Persist tasks locally                  |
| React Navigation  | Navigation between screens             |

---

## 📦 Installation

### 1. Clone the Repo

```bash
git clone https://github.com/tanmayvaij/rntodo.git
cd rntodo
```

### 2. Install Dependencies

```bash
npm install
# or
yarn install
```

### 3. Run the App

```bash
npx react-native run-android
# or for iOS
npx react-native run-ios
```

Make sure Metro is running:

```bash
npx react-native start
```

---

## 🔐 Authentication

* Google Sign-In is handled via Firebase Auth.
* On successful login, user session is stored and tasks are fetched from Firestore.

---

## 🧠 Local Storage

* Tasks are cached using **AsyncStorage** for offline support and faster load times.
* Syncs with Firestore on login and task changes.
