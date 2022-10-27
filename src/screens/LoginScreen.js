import React, { useRef, useState } from "react";
import "./LoginScreen.css";
import SignUpScreen from "./SignUpScreen";

function LoginScreen() {
  const [signIn, setSignIn] = useState(false);

  const getStarted = (e) => {
    e.preventDefault();
    setSignIn(true);
  };

  return (
    <div className="loginScreen">
      <div className="loginScreen_background">
        <img
          className="loginScreen_logo"
          src="https://cdn.jsdelivr.net/gh/Th3Wall/assets-cdn/Fakeflix/Fakeflix_logo.png"
          alt="Fakeflix Logo"
        />
        <button onClick={() => setSignIn(true)} className="loginScreen_button">
          Sign In
        </button>
        <div className="loginScreen_gradient" />
      </div>
      <div className="loginScreen_body">
        {signIn ? (
          <SignUpScreen />
        ) : (
          <>
            <h1>Unlimited movies, TV shows and more.</h1>
            <h2>Watch anywhere. Cancel at any time.</h2>
            <h3>
              Ready to watch Fakeflix? Get started by clicking the button below.
            </h3>
            <h3
              style={{
                margin: "30px auto",
                color: "red",
                backgroundColor: "black",
                width: 300,
                padding: 10,
                fontWeight: "bold",
              }}
            >
              Pay attention: this is not Netflix.
            </h3>
            <div className="loginScreen_input">
              <form>
                {/* <input
                  ref={emailRef}
                  type="email"
                  placeholder="Email Address"
                /> */}
                <button
                  onClick={() => setSignIn(true)}
                  className="loginScreen_getStarted"
                >
                  GET STARTED
                </button>
              </form>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default LoginScreen;
