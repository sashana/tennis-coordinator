# 🎾 Tennis Coordinator

A Progressive Web App (PWA) for coordinating tennis matches, managing player check-ins, and organizing match groups with intelligent player matching.

**Live Demo**: [tennis.sportsconnector.com](https://tennis.sportsconnector.com)

---

## Features

### Mobile-First Tab Navigation
- **Bottom tab bar**: iOS-style navigation with 5 tabs
- **Check-in tab**: Date selection and player check-in
- **My Matches tab**: View organized match groups and match notes
- **Alerts tab**: Notification center with badge counts
- **Help tab**: Quick reference for app usage
- **Profile tab**: User settings, admin login, and profile management

### Player Check-In System
- **14-day rolling calendar** for date selection
- **Player name selection** from member list or add guests
- **Play style preferences**: Singles Only, Doubles Only, or Either
- **Time availability windows** with multiple time slot selection
- **Partner preferences**: Include or exclude specific players
- **3-player rotation** opt-in for groups of 3
- **Guest check-in** capability for non-members
- **Remove check-in** with confirmation dialog
- **Remember me**: Auto-selects your name on return visits

### Intelligent Match Organization
- **Automatic grouping** into doubles, singles, rotation, and waiting lists
- **Partner preference enforcement**: Respects player exclusions
- **Play style matching**: Groups players by Singles/Doubles preferences
- **Time window overlap detection**: Only groups players with matching availability
- **3-player rotation handling**: Special grouping for rotation players
- **Real-time updates**: Match groups update as players check in/out

### Weather Integration
- Displays weather forecast for group location
- Configurable location per group
- Visual weather conditions display
- Helps players plan for weather conditions

### Multi-Group Support
- **URL-based routing**: Each group has unique URL (e.g., `/tue-thu-midday-doubles`)
- **Short code system**: Easy-to-remember URLs (e.g., `/ttmd` → `/tue-thu-midday-doubles`)
- **Isolated data**: Each group has separate players and check-ins
- **Unlimited groups**: Create as many groups as needed

### User Profile Management
- **Profile editing**: Update your display name, phone, and email
- **Self-service name changes**: Rename yourself without admin help
- **Contact information**: Optional phone and email for coordination
- **Admin login access**: Quick access to admin functions from profile
- **Session persistence**: Remembers your identity across visits

### My Matches Tab
- **Upcoming games overview**: See all your scheduled matches across dates
- **Match status indicators**: Green for ready, yellow for forming
- **Quick navigation**: Calendar icon next to each match to jump to that day's check-in
- **Multi-game sharing**: Select multiple games and share status via WhatsApp, SMS, or copy
- **Invite players**: Quick share for forming matches that need players
- **Admin arrangements visible**: Shows custom match arrangements made by admins

### Notification System
- **Activity alerts**: Get notified when players check in or out
- **Watched members**: Focus notifications on players you care about
- **In-app notifications**: Badge counts and notification center
- **Click to navigate**: Tap notifications to jump to that date

### Group Admin Dashboard
- **PIN-protected access** via settings (redirects to Profile after successful login)
- **Member management modal**: Add, edit, and view member details with contact info
- **Group story and rules**: Configure group description and rules/tips shown in Help tab
- **Activity history**: View all check-ins, removals, arrangements, and changes with delete option
- **Match arrangement mode**: Manually arrange players into matches, overriding automatic organization
- **Arrangement activity logging**: Activity history shows match arrangement details with player assignments
- **Admin PIN configuration**: Change admin access PIN
- **Weather location**: Set custom location for weather forecast

### Site Admin System
- **Accessible at** `/admin` with master PIN
- **Full group management**:
  - Create new groups
  - Edit existing groups
  - Delete groups
  - Clone group settings
- **Configure per group**:
  - Group name
  - URL path (full URL)
  - Short code (abbreviated URL)
  - Group PIN (for members)
  - Admin PIN (for group admins)
  - Weather location
- **View all groups**: Sortable table of all groups

### Progressive Web App (PWA)
- **Installable**: Add to home screen on iOS/Android
- **App icon**: Tennis ball emoji icon (optimized for iOS)
- **Standalone mode**: Opens without browser chrome
- **Offline caching**: Service worker caches files for offline use
- **Dynamic manifest**: Correct start URL per group
- **Native feel**: Works like a native mobile app

### UX Enhancements
- **Toast notifications**: Success and error messages with smooth animations
- **Confirmation dialogs**: Prevent accidental deletions
- **Responsive design**: Works perfectly on mobile and desktop
- **Clean UI**: Modern, intuitive interface
- **Real-time sync**: Changes appear instantly across all devices
- **Loading states**: Clear feedback during data operations

### Landing Page
- **Root URL display**: Shows app description at tennis.sportsconnector.com
- **How it works**: Clear explanation of check-in process
- **Access instructions**: Guides users to get group URL
- **Site admin link**: Easy access to admin panel

---

## Tech Stack

- **Frontend**: Preact with TypeScript
- **State Management**: @preact/signals for reactive state
- **Build Tool**: Vite for fast development and optimized builds
- **Backend**: Firebase Realtime Database
- **Hosting**: Firebase Hosting
- **Testing**: Vitest with 718 unit tests
- **Domain**: Custom domain via CNAME
- **PWA**: Service Worker + Web App Manifest
- **Architecture**: Component-based SPA with bottom tab navigation

---

## How It Works

### For Players
1. Navigate to your group's URL (provided by group admin)
2. Enter group PIN if prompted
3. Select your name from the dropdown
4. Choose the date you want to play
5. Set your play style preference (Singles/Doubles/Either)
6. Select your available time windows
7. Add partner preferences (optional)
8. Click "Check In"
9. View organized match groups in real-time

### For Group Admins
1. Access settings in your group
2. Enter admin PIN
3. Manage members (add/edit/delete)
4. Configure weather location
5. Update PINs as needed

### For Site Admins
1. Navigate to `/admin`
2. Enter master PIN: `Ilovetennis`
3. Create, edit, clone, or delete groups
4. Configure group settings and short codes
5. Manage all groups from one dashboard

---

## Setup & Installation

### Prerequisites
- GitHub account
- Firebase account
- Custom domain (optional)

### Quick Start

1. **Clone the repository**
   ```bash
   git clone https://github.com/sashana/tennis-coordinator.git
   cd tennis-coordinator
   ```

2. **Set up Firebase**
   - Create a Firebase project at [firebase.google.com](https://firebase.google.com)
   - Enable Realtime Database
   - Copy your Firebase config
   - Update the Firebase configuration in `index.html`:
     ```javascript
     const firebaseConfig = {
       apiKey: "YOUR_API_KEY",
       authDomain: "YOUR_AUTH_DOMAIN",
       databaseURL: "YOUR_DATABASE_URL",
       projectId: "YOUR_PROJECT_ID",
       storageBucket: "YOUR_STORAGE_BUCKET",
       messagingSenderId: "YOUR_SENDER_ID",
       appId: "YOUR_APP_ID"
     };
     ```

3. **Deploy to GitHub Pages**
   - Push to GitHub
   - Enable GitHub Pages in repository settings
   - Set source to `main` branch
   - Optionally add custom domain via CNAME

4. **Configure custom domain** (optional)
   - Add `CNAME` file with your domain
   - Configure DNS with your domain provider
   - Point to `<username>.github.io`

### File Structure
```
tennis-coordinator/
├── src/
│   ├── components/       # Preact components
│   │   ├── App.tsx       # Main app component
│   │   ├── layout/       # Header, BottomTabBar
│   │   ├── tabs/         # Tab content components
│   │   ├── modals/       # Modal dialogs
│   │   └── ui/           # Reusable UI components
│   ├── hooks/            # Custom hooks (useFirebase, etc.)
│   ├── utils/            # Utility functions
│   ├── types/            # TypeScript type definitions
│   ├── config/           # Firebase configuration
│   └── __tests__/        # Unit tests
├── public/               # Static assets
├── dist/                 # Build output
├── index.html            # Entry point
├── vite.config.ts        # Vite configuration
├── tsconfig.json         # TypeScript configuration
└── package.json          # Dependencies and scripts
```

### Development Commands
```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Run tests
npm test

# Build for production
npm run build

# Preview production build
npm run preview

# Deploy to Firebase
firebase deploy --only hosting
```

---

## Firebase Database Structure

```
tennis-coordinator/
├── groups/
│   └── {groupId}/
│       ├── name: "Group Name"
│       ├── shortCode: "ttmd"
│       ├── pin: "1234"
│       ├── adminPin: "5678"
│       ├── weatherLocation: "Los Gatos, CA"
│       ├── members/
│       │   └── {memberId}/
│       │       └── name: "Player Name"
│       └── checkins/
│           └── {date}/
│               └── {checkinId}/
│                   ├── name: "Player Name"
│                   ├── playStyle: "Either"
│                   ├── times: ["Morning", "Afternoon"]
│                   ├── excludePartners: ["Player 2"]
│                   ├── includePartners: ["Player 3"]
│                   └── threePlayerRotation: false
```

---

## Security Considerations

- **PINs**: Currently stored in Firebase (consider hashing in future)
- **Firebase Rules**: Should be configured to restrict access
- **HTTPS**: Enforced via GitHub Pages
- **Authentication**: PIN-based (consider Firebase Auth for production)

---

## Browser Support

- Chrome/Edge (latest)
- Safari (iOS 11.3+)
- Firefox (latest)
- PWA support: iOS Safari, Android Chrome

---

## Contributing

This is a private project, but suggestions and feedback are welcome!

---

## License

Private project - All rights reserved

---

## Credits

Built with Claude Code by Anthropic

---

## Support

For issues or questions, please open an issue on GitHub.
