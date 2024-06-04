import axios from "axios";
import { useContext, useEffect, useState } from "react";
import "./conversation.css";
import { AuthContext } from "../../context/AuthContext";

export default function Conversation({ conversation, currentUser }) {
  const { setcurrentUserChart, currentUserChart } = useContext(AuthContext);
  const [user, setUser] = useState(null);
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;
  useEffect(() => {
    const friendId = conversation.members.find((m) => m !== currentUser._id);

    const getUser = async () => {
      try {
        const res = await axios(
          "https://backenddofscocial-1.onrender.com/api/users?userId=" +
            friendId
        );
        setUser(res.data);
        setcurrentUserChart(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    getUser();
  }, [currentUser, conversation]);
  return (
    <div className="conversation">
      <img
        className="conversationImg"
        src={
          user?.profilePicture
            ? PF + user.profilePicture
            : PF + "person/noAvatar.png"
        }
        alt=""
      />
      <span className="conversationName">{user?.username}</span>
    </div>
  );
}
