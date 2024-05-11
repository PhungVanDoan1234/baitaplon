import Topbar from "../../components/topbar/Topbar";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../context/AuthContext";
import axios from "axios";
import CardUser from "../../components/cardUser/CardUser";
import "./otherUser.css";
function OtherUser() {
  const [userOthers, setUserOthers] = useState([]);
  const { user: currentUser, dispatch } = useContext(AuthContext);

  useEffect(() => {
    const getUserOther = async () => {
      try {
        const useOther = await axios.get(
          `http://localhost:8800/api/users/allUser/${currentUser._id}`
        );
        setUserOthers(useOther.data);
      } catch (error) {
        console.log(error);
      }
    };
    getUserOther();
  }, [currentUser]);

  const handleClick = async (userOther) => {
    try {
      if (currentUser.followings.includes(userOther?._id)) {
        await axios.put(
          "http://localhost:8800/api/users/" + userOther._id + "/unfollow",
          { userId: currentUser._id }
        );
        dispatch({ type: "UNFOLLOW", payload: userOther._id });
      } else {
        await axios.put(
          "http://localhost:8800/api/users/" + userOther._id + "/follow",
          { userId: currentUser._id }
        );
        dispatch({ type: "FOLLOW", payload: userOther._id });
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
      <Topbar></Topbar>
      <p className="sologanOtherUser">
        <i>Follow more other friends </i>😉😉😉
      </p>
      <div className="otherUser">
        <div className="wrapperOtherUser">
          <ul className="listOtherUser">
            {userOthers.map((userOther) => (
              <li className="itemOtherUser" key={userOther._id}>
                <CardUser
                  userOther={userOther}
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

export default OtherUser;
