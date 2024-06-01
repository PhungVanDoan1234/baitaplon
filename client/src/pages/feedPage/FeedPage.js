import { useEffect, useState } from "react";
import Wrapper from "../../components/wrapper/Wrapper";
import axios from "axios";
import Post from "../../components/post/Post";

function FeedPage() {
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
  console.log(posts);

  return (
    <>
      <Wrapper sologan={"my feed page"}>
        <div style={{ margin: "0 120px" }}>
          <input type="text" />
          {posts.map((p) => (
            <Post post={p} key={p?._id} />
          ))}
        </div>
      </Wrapper>
    </>
  );
}

export default FeedPage;
