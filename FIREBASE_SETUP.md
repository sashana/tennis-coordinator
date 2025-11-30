# Firebase Setup Guide for Tennis Coordinator

Follow these steps to enable real-time data sharing across all users.

## Step 1: Create a Firebase Project

1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Click **"Add project"** or **"Create a project"**
3. Enter project name: `tennis-coordinator` (or any name you prefer)
4. Disable Google Analytics (not needed for this app)
5. Click **"Create project"**

## Step 2: Set Up Realtime Database

1. In the Firebase Console, click **"Realtime Database"** in the left sidebar
2. Click **"Create Database"**
3. Choose location: **United States** (or closest to your group)
4. Start in **"Test mode"** for now (we'll secure it in Step 4)
5. Click **"Enable"**

## Step 3: Get Your Firebase Configuration

1. In Firebase Console, click the **gear icon** ⚙️ next to "Project Overview"
2. Click **"Project settings"**
3. Scroll down to **"Your apps"** section
4. Click the **Web** icon `</>`
5. Register app with nickname: `tennis-coordinator-web`
6. Click **"Register app"**
7. Copy the **firebaseConfig** object (looks like this):

```javascript
const firebaseConfig = {
  apiKey: "AIzaSy...",
  authDomain: "your-project.firebaseapp.com",
  databaseURL: "https://your-project-default-rtdb.firebaseio.com",
  projectId: "your-project",
  storageBucket: "your-project.appspot.com",
  messagingSenderId: "123456789",
  appId: "1:123456789:web:abc123"
};
```

## Step 4: Update Your index.html File

1. Open `index.html` in a text editor
2. Find this section (around line 915):

```javascript
// Firebase Configuration - REPLACE WITH YOUR OWN CONFIG
const firebaseConfig = {
    apiKey: "YOUR_API_KEY",
    authDomain: "YOUR_PROJECT_ID.firebaseapp.com",
    ...
};
```

3. Replace the entire `firebaseConfig` object with YOUR config from Step 3
4. Save the file

## Step 5: Set Up Firebase Security Rules

1. Go back to Firebase Console → Realtime Database
2. Click the **"Rules"** tab
3. Replace the rules with these secure rules:

```json
{
  "rules": {
    ".read": true,
    ".write": true,
    "checkins": {
      ".read": true,
      ".write": true
    },
    "settings": {
      ".read": true,
      ".write": true
    },
    "userPreferences": {
      ".read": true,
      ".write": true
    }
  }
}
```

4. Click **"Publish"**

**Note:** These rules allow anyone to read/write. This is fine for a small private group app, but you should use the PIN authentication in the app to control access.

## Step 6: Deploy to GitHub Pages

1. Commit your changes (with Firebase config):
```bash
git add index.html
git commit -m "Add Firebase configuration for real-time sync"
git push
```

2. Your app will be live at: `https://sashana.github.io/tennis-coordinator/`

## Step 7: Test with Multiple Users

1. Open the app on your browser
2. Have another person open the same URL on their device
3. Check in on one device
4. You should see the check-in appear on both devices in real-time!

## Troubleshooting

**Error: "Firebase not configured"**
- Make sure you replaced ALL placeholder values in firebaseConfig
- Check that databaseURL ends with `.firebaseio.com`

**Data not syncing**
- Check browser console for errors (F12 → Console tab)
- Verify Firebase Rules are published
- Make sure database is in "Realtime Database" not "Firestore"

**Need help?**
- Firebase Documentation: https://firebase.google.com/docs/database/web/start
- Check Firebase Console → Database → Data tab to see if data is being saved

## Security Best Practices

For a production app with sensitive data, consider:
1. Implementing Firebase Authentication
2. Using more restrictive security rules
3. Rate limiting writes to prevent abuse

For your tennis group, the current setup with PIN authentication should be sufficient.
