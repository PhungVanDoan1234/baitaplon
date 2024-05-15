import { Link } from "react-router-dom";
import Online from "../../online/Online";
import "./homeRightbar.css";

function HomeRightbar({ friendsOfCurrentUser }) {
  return (
    <>
      <div className="birthdayContainer">
        <img className="birthdayImg" src="assets/gift.png" alt="" />
        <span className="birthdayText">
          <b>Would you like to understand more about us?.</b>
        </span>
      </div>
      <Link to="/aboutUs">
        <img className="rightbarAd" src="assets/ad.jpg" alt="" />
        <h4 className="rightbarTitle">Online Friends</h4>
      </Link>
      <ul className="rightbarFriendList">
        {friendsOfCurrentUser.slice(0, 7).map((u) => (
          <Online key={u._id} user={u} />
        ))}
      </ul>
    </>
  );
}

export default HomeRightbar;
