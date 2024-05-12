import { format } from "timeago.js";
import "./comment.css";
import { memo, useContext, useEffect, useRef, useState } from "react";
import axios from "axios";
import { AuthContext } from "../../context/AuthContext";
import { Delete, Update } from "@mui/icons-material";

function Comment({ comment, onDelete, onUpdate }) {
  const PF = process.env.REACT_APP_PUBLIC_FORDER;
  const { user: currentUser } = useContext(AuthContext);
  const [user, setUser] = useState({});
  const InputUpdate = useRef();

  useEffect(() => {
    const fetchUser = async () => {
      const res = await axios.get(
        `http://localhost:8800/api/users?userId=${comment.userId}`
      );
      setUser(res.data);
    };
    fetchUser();
  }, [comment]);

  console.log(InputUpdate?.current?.value);

  return (
    <div className="comment" key={comment?._id}>
      <div className="commentTop">
        <img
          className="commentImg"
          src={
            user?.profilePicture
              ? PF + user.profilePicture
              : PF + "person/noAvatar.png"
          }
          alt=""
        />
        <div className="commentTextbox">
          <b className="commentName">{user?.username}</b> <br />
          <div className="commentText">{comment?.text}</div>
        </div>
        <div className="commentTime">{format(comment?.createdAt)}</div>
      </div>
      {user._id === currentUser._id && (
        <div className="wrapperSettingComment">
          <button className="buttonSettingComment" onClick={onDelete}>
            <Delete />
            <span className="settingComment">deleted</span>
          </button>
          <button className="buttonSettingComment" onClick={onUpdate}>
            <Update />
            <span className="settingComment">updated</span>
          </button>
        </div>
      )}
    </div>
  );
}

export default memo(Comment);
