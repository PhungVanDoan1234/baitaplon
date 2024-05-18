import "./sidebar.css";
import {
  RssFeed,
  PlayCircleFilledOutlined,
  Group,
  Bookmark,
  HelpOutline,
  WorkOutline,
  Event,
  School,
  Settings,
  Reviews,
} from "@mui/icons-material";
import CloseFriend from "../closeFriend/CloseFriend";
import { Link } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../context/AuthContext";
import { getAllUserOther } from "../../apiCall";

export default function Sidebar() {
  const [userOthers, setUserOthers] = useState([]);
  const { user: currentUser } = useContext(AuthContext);

  useEffect(() => {
    getAllUserOther(setUserOthers, currentUser._id);
  }, [currentUser]);

  return (
    <div className="sidebar">
      <div className="sidebarWrapper">
        <ul className="sidebarList">
          <Link to="/feedPage">
            <li className="sidebarListItem">
              <RssFeed className="sidebarIcon" />
              <span className="sidebarListItemText">Feed</span>
            </li>
          </Link>
          <Link to="/videoPage">
            <li className="sidebarListItem">
              <PlayCircleFilledOutlined className="sidebarIcon" />
              <span className="sidebarListItemText">Videos</span>
            </li>
          </Link>
          <Link to="/groupPage">
            <li className="sidebarListItem">
              <Group className="sidebarIcon" />
              <span className="sidebarListItemText">Groups</span>
            </li>
          </Link>
          <Link>
            <li className="sidebarListItem">
              <Bookmark className="sidebarIcon" />
              <span className="sidebarListItemText">Bookmarks</span>
            </li>
          </Link>
          <Link>
            <li className="sidebarListItem">
              <HelpOutline className="sidebarIcon" />
              <span className="sidebarListItemText">Questions</span>
            </li>
          </Link>
          <Link>
            <li className="sidebarListItem">
              <WorkOutline className="sidebarIcon" />
              <span className="sidebarListItemText">Jobs</span>
            </li>
          </Link>
          <Link to="/eventsPage">
            <li className="sidebarListItem">
              <Event className="sidebarIcon" />
              <span className="sidebarListItemText">Events</span>
            </li>
          </Link>
          {/* <Link>
            <li className="sidebarListItem">
              <School className="sidebarIcon" />
              <span className="sidebarListItemText">Courses</span>
            </li>
          </Link> */}
          <Link to="/reviews">
            <li className="sidebarListItem">
              <Reviews className="sidebarIcon" />
              <span className="sidebarListItemText">Reviews</span>
            </li>
          </Link>
          <Link to="/settingsPage">
            <li className="sidebarListItem">
              <Settings className="sidebarIcon" />
              <span className="sidebarListItemText">Settings</span>
            </li>
          </Link>
        </ul>
        <hr className="sidebarHr" />
        <Link to="/otherUser">
          <div className="sidebarShowAll">Other user</div>
        </Link>
        <ul className="sidebarFriendList">
          {userOthers.slice(0, 8).map((u) => (
            <CloseFriend key={u._id} user={u} />
          ))}
        </ul>
      </div>
    </div>
  );
}

/* <button className="sidebarButton">Show More</button> */

// icon rating
