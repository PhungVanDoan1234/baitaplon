import { Add, Remove } from "@mui/icons-material";
import { followUser } from "../../../apiCall";
import { useContext } from "react";
import { AuthContext } from "../../../context/AuthContext";
import { Link } from "react-router-dom";
import "./profileRightbar.css";

function ProfileRightbar({ user, friends }) {
  const { user: currentUser, dispatch } = useContext(AuthContext);
  const followed = currentUser.followings.includes(user?._id);
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;

  const handleClick = () => {
    followUser(followed, user._id, currentUser._id, dispatch);
  };

  return (
    <>
      {user.username !== currentUser.username && (
        <button className="rightbarFollowButton" onClick={handleClick}>
          {followed ? "Unfollow" : "Follow"}
          {followed ? <Remove /> : <Add />}
        </button>
      )}
      <h4 className="rightbarTitle">User information</h4>
      <div className="rightbarInfo">
        <div className="rightbarInfoItem">
          <span className="rightbarInfoKey">City:</span>
          <span className="rightbarInfoValue">{user.city}</span>
        </div>
        <div className="rightbarInfoItem">
          <span className="rightbarInfoKey">From:</span>
          <span className="rightbarInfoValue">{user.from}</span>
        </div>
        <div className="rightbarInfoItem">
          <span className="rightbarInfoKey">Relationship:</span>
          <span className="rightbarInfoValue">
            {user.relationship === 1
              ? "Single"
              : user.relationship === 2
              ? "Married"
              : "-"}
          </span>
        </div>
      </div>
      <h4 className="rightbarTitle">User follower</h4>
      <div className="rightbarFollowings">
        {friends.slice(0, 8).map((friend) => (
          <Link
            to={"/profile/" + friend.username}
            style={{ textDecoration: "none" }}
            key={friend._id}
          >
            <div className="rightbarFollowing">
              <img
                src={
                  friend.profilePicture
                    ? PF + friend.profilePicture
                    : PF + "person/noAvatar.png"
                }
                alt=""
                className="rightbarFollowingImg"
              />
              <span className="rightbarFollowingName">{friend.username}</span>
            </div>
          </Link>
        ))}
      </div>
    </>
  );
}

export default ProfileRightbar;
