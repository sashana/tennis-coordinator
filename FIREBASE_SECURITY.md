# Firebase Security Implementation

## Phase 1: Validation Rules (Current - No Code Changes)

### What This Phase Does

**Security Improvements:**
- ✅ Validates data structure before writes
- ✅ Prevents PIN tampering via API
- ✅ Limits data sizes (prevents DoS attacks)
- ✅ Protects legacy data paths from modification
- ✅ Makes site settings read-only

**What's NOT Protected (Yet):**
- ⚠️ Anyone can still read all data
- ⚠️ Anyone can still write (but only valid data)
- 🔐 Full protection comes in Phase 2 (after TypeScript migration)

---

## How to Apply Phase 1 Rules

### Step 1: Open Firebase Console

1. Go to https://console.firebase.google.com/
2. Select project: **tennis-coordinator-43f53**
3. Click **Realtime Database** in left sidebar
4. Click **Rules** tab

### Step 2: Replace Current Rules

Copy the contents of `firebase-rules-phase1.json` and paste into the Firebase Rules editor.

**Current rules (INSECURE):**
```json
{
  "rules": {
    ".read": true,
    ".write": true
  }
}
```

**New rules:** Use contents of `firebase-rules-phase1.json`

### Step 3: Publish

Click **Publish** button in Firebase Console.

### Step 4: Test

Open your app and verify:
- ✅ Check-ins still work
- ✅ Match notes save correctly
- ✅ Activity log displays
- ✅ Admin settings work

---

## What Each Rule Protects

### Groups Data (`/groups/{groupId}/`)

**Checkins:**
- Must have `name` and `timestamp`
- `playStyle` must be a string
- `timestamp` must be a number

**Activity Log:**
- Must have `action`, `timestamp`, and `user`
- `timestamp` must be a number

**Match Notes:**
- Must be a string
- Maximum 1000 characters

**Settings:**
- `groupPin` & `adminPin` protected from unauthorized changes
- Once `adminPin` is set, it can NEVER be changed via API (only in Firebase Console)
- `groupPin` can only change if admin authenticates
- `members` must be an array/object
- `location` must have lat/lon coordinates

### Site Settings (`/siteSettings/`)
- **Read-only** - can only be changed in Firebase Console
- Protects Google Analytics ID and other site-wide configs

### Legacy Paths
- `/checkins/`, `/settings/`, `/_migrationCompleted` are read-only
- These appear to be old data from migration

---

## Phase 2: Authentication (After TypeScript Merge)

**When:** After `feature/typescript-migration` merges to main

**Changes Required:**
1. Enable Firebase Anonymous Authentication
2. Add 5 lines of code for auto-signin
3. Update rules to require `auth != null`
4. Add group-scoped access tracking

**Estimated time:** 30 minutes
**Code impact:** Minimal (~10 lines in Firebase init)
**Security improvement:** ⭐⭐⭐⭐⭐

---

## Testing Phase 1 Rules

After applying rules, test these scenarios:

### ✅ Should Work:
- Add check-in with valid data
- Save match notes
- View activity log
- Admin can manage members
- View site settings (Google Analytics)

### ❌ Should Fail:
- Try to change `adminPin` directly in browser console:
  ```javascript
  // This should fail:
  firebase.database().ref('groups/tue-thu-midday-doubles/settings/adminPin').set('hacked')
  ```
- Try to write invalid checkin data (missing required fields)
- Try to modify site settings via API

---

## Rollback Plan

If anything breaks, you can instantly rollback:

1. Go to Firebase Console → Rules tab
2. Click **View History**
3. Select previous version
4. Click **Restore**

Your data is safe - rules don't affect existing data, only future writes.

---

## Files in This Repo

- `firebase-rules-phase1.json` - Phase 1 rules to paste in Firebase Console
- `FIREBASE_SECURITY.md` - This documentation
- `backup-firebase.sh` - Backup script (run before major changes)
- `firebase-backup-YYYYMMDD-HHMMSS.json` - Your backups (gitignored)

---

**Next Steps:** Apply Phase 1 rules, test the app, then wait for TypeScript migration before Phase 2.
