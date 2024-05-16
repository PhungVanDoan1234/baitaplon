import Post from "../../components/post/Post";
import Wrapper from "../../components/wrapper/Wrapper";

function VideoPage() {
  let userPost = JSON.parse(localStorage.getItem("userPost"));
  const posts = userPost.filter((p) => p.img.endsWith("mp4"));
  console.log(posts);
  return (
    <Wrapper>
      {posts.map((p) => (
        <Post post={p} key={p._id} />
      ))}
    </Wrapper>
  );
}

export default VideoPage;
