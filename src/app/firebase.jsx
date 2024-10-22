"use client";

import { ReactNode, createContext, useContext, useEffect } from "react";
import { app } from "./firebaseConfig"; // Import the initialized Firebase app

// Create Firebase context (empty since we don't need any specific state)
const FirebaseContext = createContext(null);

// Firebase provider component
export const FirebaseProvider = ({ children }) => {
  useEffect(() => {
    // Firebase is now initialized globally, and you can access the app instance if needed
    console.log("Firebase initialized", app);
  }, []);

  return (
    <FirebaseContext.Provider value={null}>
      {children}
    </FirebaseContext.Provider>
  );
};

// Custom hook (optional, here for consistency)
// export const useFirebase = () => useContext(FirebaseContext);
