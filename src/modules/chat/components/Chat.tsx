import { SignOut } from "modules/authentication/components";
import { useState, useEffect } from "react";
import { collection, getDocs } from "@firebase/firestore";
import { db } from "../../../firebase";

export const Chat: React.FC = ({}) => {
  const [messages, setMessages] = useState([]);
  useEffect(() => {}, []);
  return (
    <div>
      <SignOut />
      Chat
    </div>
  );
};
