import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { initializeAppCheck, ReCaptchaV3Provider } from "firebase/app-check";

const provider = new GoogleAuthProvider();

const firebaseConfig = {
  apiKey: `${process.env.REACT_APP_FIREBASE_API_KEY}`,
  authDomain: "netflix-clone-v2-471b3.firebaseapp.com",
  projectId: "netflix-clone-v2-471b3",
  storageBucket: "netflix-clone-v2-471b3.appspot.com",
  messagingSenderId: "549898669368",
  appId: "1:549898669368:web:23d409faa828a7290985cd",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Pass your reCAPTCHA v3 site key (public key) to activate(). Make sure this
// key is the counterpart to the secret key you set in the Firebase console.
const appCheck = initializeAppCheck(app, {
  provider: new ReCaptchaV3Provider("6Ldnr3giAAAAAAMKs7_XOG6Kz_Bw279YUZC0V_tf"),

  // Optional argument. If true, the SDK automatically refreshes App Check
  // tokens as needed.
  isTokenAutoRefreshEnabled: true,
});

// Initialize Firebase Authentication and get a reference to the service
const auth = getAuth(app);

const db = getFirestore(app);

export { auth, provider };
export default db;
