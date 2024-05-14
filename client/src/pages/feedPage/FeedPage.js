import Feed from "../../components/feed/Feed";
import Topbar from "../../components/topbar/Topbar";
import "./feedPage.css";

function FeedPage() {
  return (
    <>
      <Topbar></Topbar>
      <div className="feedPageContainer">
        <div className="feedPageWrapper">
          <Feed></Feed>
        </div>
      </div>
    </>
  );
}

export default FeedPage;
