import { useContext, useEffect, useMemo, useState } from "react";
import Post from "../post/Post";
import Share from "../share/Share";
import { AuthContext } from "../../context/AuthContext";
import "./feed.css";
import { getPost } from "../../apiCall";

export default function Feed({ username }) {
  const [posts, setPosts] = useState([]);
  const { user } = useContext(AuthContext);

  useEffect(() => {
    getPost(username, user._id, setPosts);
  }, [username, user._id]);

  return (
    <div className="feed">
      <div className="feedWrapper">
        {(!username || username === user.username) && <Share />}
        {posts.map((p) => (
          <Post key={p._id} post={p} />
        ))}
      </div>
    </div>
  );
}
