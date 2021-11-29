import "./App.css";
import { Chat } from "modules/chat/components";
import { SignIn } from "modules/authentication/components";
import React from "react";

export default function App() {
  return (
    <React.Fragment>
      <SignIn />
      <Chat />
    </React.Fragment>
  );
}
