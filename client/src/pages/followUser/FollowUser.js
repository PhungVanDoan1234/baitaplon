import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../context/AuthContext";
import CardUser from "../../components/cardUser/CardUser";
import Topbar from "../../components/topbar/Topbar";
import "./followUser.css";
import { followUser, getfriendList } from "../../apiCall";

function FollowUser() {
  const [friends, setFriends] = useState([]);
  const { user: currentUser, dispatch } = useContext(AuthContext);
  useEffect(() => {
    getfriendList(currentUser._id, setFriends);
  }, [currentUser]);

  const handleClick = (friend) => {
    followUser(
      currentUser.followings.includes(friend?._id),
      friend._id,
      currentUser._id,
      dispatch
    );
  };

  return (
    <>
      <Topbar></Topbar>
      <div style={{ marginTop: "50px" }}>
        <p className="sologanFollowUser">
          <i>My friends </i>
        </p>
        <div className={"container"}>
          <div className="followUser">
            <div className="wrapperFollowUser">
              <div className="row listFollowUser">
                {friends.map((friend) => (
                  <div
                    className="itemFollowUser col-lg-3 col-md-4"
                    key={friend._id}
                  >
                    <CardUser
                      userOther={friend}
                      currentUser={currentUser}
                      handleClick={handleClick}
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default FollowUser;
