import Online from "../../online/Online";
import "./homeRightbar.css";

function HomeRightbar({ friendsOfCurrentUser }) {
  return (
    <>
      <div className="birthdayContainer">
        <img className="birthdayImg" src="assets/gift.png" alt="" />
        <span className="birthdayText">
          <b>Pola Foster</b> and <b>3 other friends</b> have a birhday today.
        </span>
      </div>
      <img className="rightbarAd" src="assets/ad.jpg" alt="" />
      <h4 className="rightbarTitle">Online Friends</h4>
      <ul className="rightbarFriendList">
        {friendsOfCurrentUser.slice(0, 7).map((u) => (
          <Online key={u._id} user={u} />
        ))}
      </ul>
    </>
  );
}

export default HomeRightbar;
