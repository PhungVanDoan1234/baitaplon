import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../context/AuthContext";
import CardUser from "../../components/cardUser/CardUser";
import Topbar from "../../components/topbar/Topbar";
import axios from "axios";
import "./followUser.css";

function FollowUser() {
  const [friends, setFriends] = useState([]);
  const { user: currentUser, dispatch } = useContext(AuthContext);
  useEffect(() => {
    const getUserOther = async () => {
      try {
        const useOther = await axios.get(
          `http://localhost:8800/api/users/friends/` + currentUser._id
        );
        setFriends(useOther.data);
      } catch (error) {
        console.log(error);
      }
    };
    getUserOther();
  }, [currentUser]);

  const handleClick = async (friend) => {
    try {
      if (currentUser.followings.includes(friend?._id)) {
        await axios.put(
          "http://localhost:8800/api/users/" + friend._id + "/unfollow",
          { userId: currentUser._id }
        );
        dispatch({ type: "UNFOLLOW", payload: friend._id });
      } else {
        await axios.put(
          "http://localhost:8800/api/users/" + friend._id + "/follow",
          { userId: currentUser._id }
        );
        dispatch({ type: "FOLLOW", payload: friend._id });
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
      <Topbar></Topbar>
      <p className="sologanFollowUser">
        <i>My friends </i>😉😉😉
      </p>
      <div className="followUser">
        <div className="wrapperFollowUser">
          <ul className="listFollowUser">
            {friends.map((friend) => (
              <li className="itemFollowUser" key={friend._id}>
                <CardUser
                  userOther={friend}
                  currentUser={currentUser}
                  handleClick={handleClick}
                />
              </li>
            ))}
          </ul>
        </div>
      </div>
    </>
  );
}

export default FollowUser;
