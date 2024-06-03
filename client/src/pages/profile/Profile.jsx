import { useEffect, useState } from "react";
import { useParams } from "react-router";
import "./profile.css";
import Topbar from "../../components/topbar/Topbar";
import Sidebar from "../../components/sidebar/Sidebar";
import Feed from "../../components/feed/Feed";
import Rightbar from "../../components/rightbar/Rightbar";
import { InsertPhoto, Person } from "@mui/icons-material";
import { Link } from "react-router-dom";
import {
  deleteFile,
  getUserByName,
  udpateCoverPicture,
  updateAvatar,
} from "../../apiCall";

export default function Profile() {
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;
  const [user, setUser] = useState();
  const username = useParams().username;
  let userData = JSON.parse(localStorage.getItem("user"));

  useEffect(() => {
    getUserByName(username, setUser);
  }, [username]);

  const handleChangeAvatar = async (e) => {
    deleteFile(user.profilePicture);
    const newUser = {
      userId: user?._id,
    };

    if (e.target.files.length > 0) {
      const file = e.target.files[0];
      const data = new FormData();
      const fileName = Date.now() + file.name;
      data.append("name", fileName);
      data.append("file", file);
      newUser.profilePicture = fileName;
      updateAvatar(user?._id, newUser, fileName, userData, setUser, data);
    }
  };

  const handleChangeCover = async (e) => {
    deleteFile(user.coverPicture);
    const newUser = {
      userId: user?._id,
    };

    if (e.target.files.length > 0) {
      const file = e.target.files[0];
      const data = new FormData();
      const fileName = Date.now() + file.name;
      data.append("name", fileName);
      data.append("file", file);
      newUser.coverPicture = fileName;
      udpateCoverPicture(user?._id, newUser, fileName, setUser, data);
    }
  };

  return (
    <div className="container-fluid" style={{ padding: "0" }}>
      <div className="row">
        <Topbar />
        <div className="profile">
          <div className="col-lg-3">
            <Sidebar />
          </div>
          <div className="col-lg-9">
            <div className="profileRight">
              <div className="profileRightTop">
                <div className="profileCover">
                  {/* Cover */}
                  <Link target="_blank" to={PF + user?.coverPicture}>
                    <img
                      className="profileCoverImg"
                      src={
                        user && user?.coverPicture
                          ? PF + user?.coverPicture
                          : `${PF}person/noCover.png`
                      }
                      alt=""
                    />
                  </Link>
                  <label htmlFor="fileCover">
                    {userData._id === user?._id && (
                      <div className="changeCoverPicture">
                        <InsertPhoto
                          style={{ fontSize: "4rem" }}
                          className="iconChangeCoverPicture"
                        />
                      </div>
                    )}
                    <input
                      style={{ display: "none" }}
                      type="file"
                      id="fileCover"
                      accept=".png, .jpeg, .jpg"
                      onChange={handleChangeCover}
                    />
                  </label>
                  {/* Avartar */}
                  <Link to={PF + user?.profilePicture} target="_blank">
                    <img
                      className="profileUserImg"
                      src={
                        user && user?.profilePicture
                          ? PF + user?.profilePicture
                          : `${PF}person/noAvatar.png`
                      }
                      alt=""
                    />
                  </Link>
                  <label htmlFor="fileAvatar">
                    {userData._id === user?._id && (
                      <div className="changeAvatar">
                        <Person
                          className="iconChangeAvatar"
                          style={{ fontSize: "4rem" }}
                        />
                      </div>
                    )}
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
                <div className="col-lg-8">
                  <Feed username={username} />
                </div>
                <div className="col-lg-4">
                  <Rightbar user={user} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
