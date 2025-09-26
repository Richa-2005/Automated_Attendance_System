// Use the new modular imports for Firebase v9+
import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";

// Your web app's Firebase configuration - this is your new config
const firebaseConfig = {
  apiKey: "AIzaSyDzOgXwoXXtdFr48yqZCNNBX25WEuaDmv4",
  authDomain: "classsync-3df2c.firebaseapp.com",
  // IMPORTANT: You need to add the databaseURL for Realtime Database
  databaseURL: "https://classsync-3df2c-default-rtdb.firebaseio.com", 
  projectId: "classsync-3df2c",
  storageBucket: "classsync-3df2c.appspot.com",
  messagingSenderId: "60398613997",
  appId: "1:60398613997:web:4617403984ee30a18323e4"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Get a reference to the Realtime Database service and export it for use in other components
export const database = getDatabase(app);

