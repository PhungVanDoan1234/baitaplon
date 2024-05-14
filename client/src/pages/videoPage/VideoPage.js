import Post from "../../components/post/Post";
import Topbar from "../../components/topbar/Topbar";
import "./videoPage.css";

function VideoPage() {
  let userPost = JSON.parse(localStorage.getItem("userPost"));
  const posts = userPost.filter((p) => p.img.endsWith("mp4"));
  console.log(posts);
  return (
    <>
      <Topbar></Topbar>
      <div className="videoPageContainer">
        <div className="videoPageWrapper">
          {posts.map((p) => (
            <Post post={p} key={p._id} />
          ))}
        </div>
      </div>
    </>
  );
}

export default VideoPage;
