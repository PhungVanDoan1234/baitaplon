import { useEffect, useState } from "react";
import { useParams } from "react-router";
import axios from "axios";
import "./profile.css";
import Topbar from "../../components/topbar/Topbar";
import Sidebar from "../../components/sidebar/Sidebar";
import Feed from "../../components/feed/Feed";
import Rightbar from "../../components/rightbar/Rightbar";

export default function Profile() {
  const PF = process.env.REACT_APP_PUBLIC_FORDER;
  const [user, setUser] = useState();
  const username = useParams().username;

  useEffect(() => {
    const fetchUser = async () => {
      const res = await axios.get(
        `http://localhost:8800/api/users?username=${username}`
      );
      setUser(res.data);
    };
    fetchUser();
  }, [username]);

  const handleChangeAvatar = async (e) => {
    const newUser = {
      userId: user._id,
    };

    if (e.target.files.length > 0) {
      const file = e.target.files[0];
      const data = new FormData();
      const fileName = Date.now() + file.name;
      data.append("name", fileName);
      data.append("file", file);
      newUser.profilePicture = fileName;

      try {
        await axios.post("http://localhost:8800/api/upload", data);
        await axios.put(`http://localhost:8800/api/users/${user._id}`, newUser);
        setUser((prevUser) => ({ ...prevUser, profilePicture: fileName }));
      } catch (err) {
        console.log(err);
      }
    }
  };

  const handleChangeCover = async (e) => {
    const newUser = {
      userId: user._id,
    };

    if (e.target.files.length > 0) {
      const file = e.target.files[0];
      const data = new FormData();
      const fileName = Date.now() + file.name;
      data.append("name", fileName);
      data.append("file", file);
      newUser.coverPicture = fileName;

      try {
        await axios.post("http://localhost:8800/api/upload", data);
        await axios.put(`http://localhost:8800/api/users/${user._id}`, newUser);
        setUser((prevUser) => ({ ...prevUser, coverPicture: fileName }));
      } catch (err) {
        console.log(err);
      }
    }
  };

  return (
    <>
      <Topbar />
      <div className="profile">
        <Sidebar />
        <div className="profileRight">
          <div className="profileRightTop">
            <div className="profileCover">
              {/* Cover */}
              <label htmlFor="fileCover">
                <img
                  className="profileCoverImg"
                  src={
                    user && user?.coverPicture
                      ? PF + user?.coverPicture
                      : `${PF}person/noCover.png`
                  }
                  alt=""
                />
                <input
                  style={{ display: "none" }}
                  type="file"
                  id="fileCover"
                  accept=".png, .jpeg, .jpg"
                  onChange={handleChangeCover}
                />
              </label>
              {/* Avartar */}
              <label htmlFor="fileAvatar">
                <img
                  className="profileUserImg"
                  src={
                    user && user?.profilePicture
                      ? PF + user?.profilePicture
                      : `${PF}person/noAvatar.png`
                  }
                  alt=""
                />
                <input
                  style={{ display: "none" }}
                  type="file"
                  id="fileAvatar"
                  accept=".png, .jpeg, .jpg"
                  onChange={handleChangeAvatar}
                />
              </label>
            </div>
            <div className="profileInfo">
              {user && (
                <div className="profileInfo">
                  <h4 className="profileInfoName">{user.username}</h4>
                  <span className="profileInfoDesc">{user.desc}</span>
                </div>
              )}
            </div>
          </div>
          <div className="profileRightBottom">
            <Feed username={username} />
            <Rightbar user={user} />
          </div>
        </div>
      </div>
    </>
  );
}
