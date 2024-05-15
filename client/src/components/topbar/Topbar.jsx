import { useContext } from "react";
import { Link } from "react-router-dom";
import "./topbar.css";
import {
  Search,
  Person,
  Chat,
  Notifications,
  Logout,
} from "@mui/icons-material";
import { AuthContext } from "../../context/AuthContext";

export default function Topbar() {
  const { user } = useContext(AuthContext);
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;
  let userData = JSON.parse(localStorage.getItem("user"));

  const handleLogout = () => {
    if (
      window.confirm(
        "Bạn có chắc chắn muốn thoát tài khoản chứ 😔😔😔? \n thôi đừng thoát nhấn cancel đi 😥😥😥"
      )
    ) {
      localStorage.clear();
      window.location.reload();
    } else {
      alert("year hoo !!! 🤗🤗🤗 ");
    }
  };

  return (
    <div className="topbarContainer">
      <div className="topbarLeft">
        <Link to="/" style={{ textDecoration: "none" }}>
          <span className="logo">CodeCuaDoan</span>
        </Link>
      </div>
      <div className="topbarCenter">
        <div className="searchbar">
          <Search className="searchIcon" />
          <input
            placeholder="Search for friend, post or video"
            className="searchInput"
          />
        </div>
      </div>
      <div className="topbarRight">
        <div className="topbarLinks">
          {/* <span className="topbarLink">Homepage</span>
          <span className="topbarLink">Timeline</span> */}
        </div>
        <div className="topbarIcons">
          <div className="topbarIconItem">
            <Link to="/followUser">
              <Person />
              <span className="topbarIconBadge">1</span>
            </Link>
          </div>
          <div className="topbarIconItem">
            <Link
              to="/messenger"
              style={{ textDecoration: "none", color: "white" }}
            >
              <Chat />
            </Link>
            <span className="topbarIconBadge">2</span>
          </div>
          <div className="topbarIconItem">
            <span className="topbarIconBadge">1</span>
            <Link
              to="/notification"
              style={{ textDecoration: "none", color: "white" }}
            >
              <Notifications />
            </Link>
          </div>
          <div className="topbarIconItem" onClick={handleLogout}>
            <Logout />
          </div>
        </div>
        <Link to={`/profile/${user.username}`}>
          <img
            src={PF + userData.profilePicture}
            alt=""
            className="topbarImg"
          />
        </Link>
      </div>
    </div>
  );
}
