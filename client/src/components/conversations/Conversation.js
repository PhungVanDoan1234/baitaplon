import { useEffect, useState } from "react";
import "./conversation.css";
import axios from "axios";

function Conversation({ conversations, currentUser }) {
  const [user, setUser] = useState(null);
  const PF = process.env.REACT_APP_PUBLIC_FORDER;

  useEffect(() => {
    const friendId = conversations?.members.find((m) => m !== currentUser._id);
    console.log(conversations);
    const getUser = async () => {
      try {
        const res = await axios(
          "http://localhost:8800/api/users?userId=" + friendId
        );
        setUser(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    getUser();
  }, [currentUser, conversations]);

  return (
    <div className="conversation">
      <img
        className="conversationImg"
        // src="https://i.pinimg.com/236x/95/e8/d7/95e8d7b587f8c6c52770f9c6a5357282.jpg"
        src={
          user?.profilePicture
            ? PF + user.profilePicture
            : PF + "person/noAvatar.png"
        }
        alt=""
      />
      <span className="conversationName">{user?.username}</span>
      {/* <span className="conversationName">CodeCuaDoan</span> */}
    </div>
  );
}

export default Conversation;
