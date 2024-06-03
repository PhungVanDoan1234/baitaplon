import { useContext, useEffect, useState } from "react";
import Wrapper from "../../components/wrapper/Wrapper";
import axios from "axios";
import { AuthContext } from "../../context/AuthContext";
import Post from "../../components/post/Post";

function SavePostPage() {
  const { user: currentUser } = useContext(AuthContext);
  const [posts, setPosts] = useState([]);
  useEffect(() => {
    const getAllSavePost = async () => {
      try {
        const res = await axios.get(
          `http://localhost:8800/api/users/${currentUser._id}/getAllSavePost`
        );
        setPosts(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    getAllSavePost();
  }, [currentUser]);

  return (
    <Wrapper sologan={"Save Post Page"}>
      <div style={{ width: "90%", margin: "auto" }}>
        {posts.map((p) => (
          <Post post={p} key={p._id} />
        ))}
      </div>
    </Wrapper>
  );
}

export default SavePostPage;
