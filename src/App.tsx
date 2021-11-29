import "./App.css";
import { Chat } from "modules/chat/components";
import { SignIn } from "modules/authentication/components";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "firebase";
import React from "react";

export default function App() {
  const [user, loading, error] = useAuthState(auth);
  return (
    <React.Fragment>
      {user ? <Chat/> : <SignIn/>}
    </React.Fragment>
  );
}
