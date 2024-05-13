import { useContext, useRef, useState } from "react";
import axios from "axios";
import {
  PermMedia,
  Label,
  Room,
  EmojiEmotions,
  Cancel,
} from "@mui/icons-material";
import { AuthContext } from "../../context/AuthContext";
import "./share.css";

export default function Share({ sendDataToChildFromParent }) {
  const { user } = useContext(AuthContext);
  const PF = process.env.REACT_APP_PUBLIC_FORDER;
  const desc = useRef();
  const [file, setFile] = useState(null);
  let userData = JSON.parse(localStorage.getItem("user"));
  let userPostData = JSON.parse(localStorage.getItem("userPost"));

  console.log(userPostData);

  const submitHandle = async (e) => {
    e.preventDefault();
    const newPost = {
      userId: user._id,
      desc: desc.current.value,
    };
    if (file) {
      const data = new FormData();
      const fileName = Date.now() + file.name;
      data.append("name", fileName);
      data.append("file", file);
      newPost.img = fileName;
      console.log(newPost);
      try {
        await axios.post("http://localhost:8800/api/upload", data);
      } catch (err) {
        console.log(err);
      }
    }
    try {
      const res = await axios.post("http://localhost:8800/api/posts", newPost);
      userPostData = [res.data, ...userPostData];
      localStorage.setItem("userPost", JSON.stringify(userPostData));
      sendDataToChildFromParent(userPostData);
      setFile(null);
      desc.current.value = "";
      console.log(userPostData);
    } catch (error) {
      console.log(error);
    }
    alert(
      ":)) =>> year year 😘😘😘 tích cực băng bài nhé !!! \n" +
        ":) Mà đừng xóa bài mới đăng cho đến khi bạn chuyển trang nhé 😆😆😆 \n" +
        ":)) ....à thì vẫn xóa được nhưng mà tôi muốn bạn xem lại bài đăng của mình trước khi nó bị xóa thế thôi 😜😜😜 \n" +
        ":)) nếu muốn xem đã bị xóa chưa thì vào trang profile mà xem á ❤❤❤ "
    );
  };

  return (
    <div className="share">
      <div className="shareWrapper">
        <div className="shareTop">
          <img
            className="shareProfileImg"
            src={PF + userData.profilePicture}
            alt=""
          />
          <input
            placeholder={"What's in your mind " + user.username + " ?"}
            className="shareInput"
            ref={desc}
          />
        </div>
        <hr className="shareHr" />
        {file && (
          <div className="shareImgContainer">
            <img src={URL.createObjectURL(file)} alt="" className="shareImg" />
            <Cancel className="shareCancelImg" onClick={() => setFile(null)} />
          </div>
        )}
        <form
          className="shareBottom"
          onSubmit={submitHandle}
          encType="multipart/form-data"
        >
          <div className="shareOptions">
            <label htmlFor="file" className="shareOption">
              <PermMedia htmlColor="tomato" className="shareIcon" />
              <span className="shareOptionText">Photo or Video</span>
              <input
                style={{ display: "none" }}
                type="file"
                id="file"
                accept=".png, .jpeg, .jpg"
                onChange={(e) => setFile(e.target.files[0])}
              />
            </label>
            <div className="shareOption">
              <Label htmlColor="blue" className="shareIcon" />
              <span className="shareOptionText">Tag</span>
            </div>
            <div className="shareOption">
              <Room htmlColor="green" className="shareIcon" />
              <span className="shareOptionText">Location</span>
            </div>
            <div className="shareOption">
              <EmojiEmotions htmlColor="goldenrod" className="shareIcon" />
              <span className="shareOptionText">Feelings</span>
            </div>
          </div>
          <button className="shareButton" type="submit">
            Share
          </button>
        </form>
      </div>
    </div>
  );
}
