import { useEffect, useState } from "react";
import Post from "../../components/post/Post";
import Wrapper from "../../components/wrapper/Wrapper";
import axios from "axios";

function VideoPage() {
  const [posts, setPosts] = useState([]);
  useEffect(() => {
    const getAllPost = async () => {
      try {
        const res = await axios.get(
          "http://localhost:8800/api/posts/getPost/All"
        );
        setPosts(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    getAllPost();
  }, []);
  const videoPost = posts.filter((p) => p?.img.endsWith("mp4"));
  console.log(videoPost);
  return (
    <Wrapper>
      {videoPost.map((p) => (
        <div style={{ margin: "0 120px" }}>
          <Post post={p} key={p?._id} />
        </div>
      ))}
    </Wrapper>
  );
}

export default VideoPage;
