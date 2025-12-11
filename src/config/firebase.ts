/**
 * Firebase configuration
 */

// Firebase compat types (loaded via CDN)
interface FirebaseDatabase {
  ref(path?: string): DatabaseReference;
}

interface DatabaseReference {
  once(eventType: string): Promise<DataSnapshot>;
  on(eventType: string, callback: (snapshot: DataSnapshot) => void): (snapshot: DataSnapshot) => void;
  off(eventType?: string, callback?: (snapshot: DataSnapshot) => void): void;
  set(value: unknown): Promise<void>;
  update(value: Record<string, unknown>): Promise<void>;
  remove(): Promise<void>;
  push(value?: unknown): DatabaseReference & Promise<void>;
}

interface DataSnapshot {
  val(): unknown;
}

interface FirebaseApp {
  database(): FirebaseDatabase;
}

interface FirebaseNamespace {
  initializeApp(config: Record<string, string>): FirebaseApp;
  database(): FirebaseDatabase;
}

declare global {
  interface Window {
    firebase: FirebaseNamespace;
  }
}

export const firebaseConfig = {
  apiKey: "AIzaSyCr-Ej5jeuV3kdvquu2W_R0ffSrUW0OUcQ",
  authDomain: "tennis-coordinator-43f53.firebaseapp.com",
  databaseURL: "https://tennis-coordinator-43f53-default-rtdb.firebaseio.com",
  projectId: "tennis-coordinator-43f53",
  storageBucket: "tennis-coordinator-43f53.firebasestorage.app",
  messagingSenderId: "665148711646",
  appId: "1:665148711646:web:66d14722800a12f5a3184f",
  measurementId: "G-J0KVB2Q93W"
};

let dbInstance: ReturnType<typeof window.firebase.database> | null = null;

export function initializeFirebase() {
  if (dbInstance) return dbInstance;

  try {
    window.firebase.initializeApp(firebaseConfig);
    dbInstance = window.firebase.database();
    console.log('Firebase initialized successfully');
    return dbInstance;
  } catch (error) {
    console.error('Firebase initialization error:', error);
    throw error;
  }
}

export function getDatabase() {
  if (!dbInstance) {
    return initializeFirebase();
  }
  return dbInstance;
}
