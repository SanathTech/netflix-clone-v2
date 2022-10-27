import React, { useRef, useState } from "react";
import "./SignUpScreen.css";
import { auth, provider } from "../firebase";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signInWithRedirect,
  getRedirectResult,
  GoogleAuthProvider,
} from "firebase/auth";

const SignUpScreen = ({ email }) => {
  const emailRef = useRef(null);
  const passwordRef = useRef(null);

  const register = (e) => {
    e.preventDefault();

    createUserWithEmailAndPassword(
      auth,
      emailRef.current.value,
      passwordRef.current.value
    )
      .then((userCredential) => {
        // Signed in
        const user = userCredential.user;
        // ...
        console.log(user);
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        // ..
        console.log(errorCode);
        console.log(errorMessage);
      });
  };

  const signIn = (e) => {
    e.preventDefault();
    signInWithEmailAndPassword(
      auth,
      emailRef.current.value,
      passwordRef.current.value
    )
      .then((userCredential) => {
        // Signed in
        const user = userCredential.user;
        // ...
        console.log(user);
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        // ..
        console.log(errorCode);
        console.log(errorMessage);
      });
  };

  const signInGoogle = (e) => {
    e.preventDefault();
    signInWithRedirect(auth, provider);
    getRedirectResult(auth)
      .then((result) => {
        // This gives you a Google Access Token. You can use it to access Google APIs.
        const credential = GoogleAuthProvider.credentialFromResult(result);
        const token = credential.accessToken;

        // The signed-in user info.
        const user = result.user;
      })
      .catch((error) => {
        // Handle Errors here.
        const errorCode = error.code;
        const errorMessage = error.message;
        // The email of the user's account used.
        const email = error.customData.email;
        // The AuthCredential type that was used.
        const credential = GoogleAuthProvider.credentialFromError(error);
        // ...
      });
  };

  return (
    <div className="signupScreen">
      <form>
        <h1>Sign In</h1>
        <div
          style={{
            marginBottom: 30,
            color: "red",
            fontWeight: "bold",
          }}
        >
          Pay attention: this is not the original Netflix sign in.
        </div>
        {/* <input
          type="email"
          placeholder="Email"
          ref={emailRef}
        />
        <input ref={passwordRef} type="password" placeholder="Password" />
        <button
          type="submit"
          onClick={signIn}
          style={{ backgroundColor: "#e50914" }}
        >
          Sign in
        </button> */}
        <button type="submit" onClick={signInGoogle}>
          <img
            src="https://freesvg.org/img/1534129544.png"
            alt="Google Logo"
            style={{ width: 20, marginRight: 15 }}
          />
          Sign in with Google
        </button>
        {/* 
        <h4>
          <span className="signupScreen_gray">New to Fakeflix? </span>
          <span className="signupScreen_link" onClick={register}>
            Sign Up now.
          </span>
        </h4> */}
      </form>
    </div>
  );
};

export default SignUpScreen;
