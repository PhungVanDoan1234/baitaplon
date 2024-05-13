import { useContext, useMemo, useRef, useState } from "react";
import axios from "axios";
import { PermMedia, Cancel } from "@mui/icons-material";
import { AuthContext } from "../../../context/AuthContext";
import "./updatePost.css";
import { upload } from "../../../apiCall";

export default function UpdatePost({
  id_post,
  children,
  sendDataToParentUpdate,
}) {
  const { user } = useContext(AuthContext);
  const PF = process.env.REACT_APP_PUBLIC_FORDER;
  const desc = useRef();
  const [file, setFile] = useState(null);

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
      try {
        await axios.post("http://localhost:8800/api/upload", data);
      } catch (err) {
        console.log(err);
      }
    }
    try {
      const res = await axios.put(
        `http://localhost:8800/api/posts/${id_post}`,
        newPost
      );
      sendDataToParentUpdate((res.data = { ...res.data, id_post }));
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="shareUpdate">
      <div className="shareWrapperUpdate">
        <div className="shareTopUpdate">
          <img
            className="shareProfileImgUpdate"
            src={
              user.profilePicture
                ? PF + user.profilePicture
                : PF + "person/noAvatar.png"
            }
            alt=""
          />
          <input
            placeholder={"What's in your mind " + user.username + " ?"}
            className="shareInputUpdate"
            ref={desc}
          />
          {children}
        </div>
        <hr className="shareHrUpdate" />
        {file && (
          <div className="shareImgContainerUpdate">
            <img
              src={URL.createObjectURL(file)}
              alt=""
              className="shareImgUpdate"
            />
            <Cancel
              className="shareCancelImgUpdate"
              onClick={() => setFile(null)}
            />
          </div>
        )}
        <form
          className="shareBottomUpdate"
          onSubmit={submitHandle}
          encType="multipart/form-data"
        >
          <div className="shareOptionsUpdate">
            <label htmlFor="fileUpdate" className="shareOptionUpdate">
              <PermMedia htmlColor="tomato" className="shareIconUpdate" />
              <span className="shareOptionTextUpdate">Photo or Video</span>
              <input
                style={{ display: "none" }}
                type="file"
                id="fileUpdate"
                accept=".png, .jpeg, .jpg"
                onChange={(e) => setFile(e.target.files[0])}
              />
            </label>
          </div>
          <button className="shareButtonUpdate" type="submit">
            Update
          </button>
        </form>
      </div>
    </div>
  );
}
