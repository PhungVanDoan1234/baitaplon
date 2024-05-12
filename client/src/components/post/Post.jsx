import { useContext, useEffect, useState } from "react";
import { format } from "timeago.js";
import axios from "axios";
import { Link } from "react-router-dom";
import "./post.css";
import { Cancel, MoreVert } from "@mui/icons-material";
import { AuthContext } from "../../context/AuthContext";
import UpdatePost from "../settingsPost/updatePost/UpdatePost";
import { Dropdown } from "react-bootstrap";
import CommentsBox from "../commentsBox/CommentsBox";

export default function Post({ post }) {
  const [like, setLike] = useState(post.likes.length);
  const [isLiked, setIsLiked] = useState(false);
  const [user, setUser] = useState({});
  const PF = process.env.REACT_APP_PUBLIC_FORDER;
  const { user: currentUser } = useContext(AuthContext);
  const [showUpdate, setShowUpdate] = useState(false);
  const [showComments, setShowComments] = useState(false);
  const [comments, setComments] = useState([]);
  const [dataChild, setDataChild] = useState([]);

  useEffect(() => {
    setIsLiked(post.likes.includes(currentUser._id));
  }, [currentUser._id, post.likes]);

  useEffect(() => {
    const fetchUser = async () => {
      const res = await axios.get(
        `http://localhost:8800/api/users?userId=${post.userId}`
      );
      setUser(res.data);
    };
    fetchUser();
  }, [post.userId]);

  const likeHandler = () => {
    try {
      axios.put("http://localhost:8800/api/posts/" + post._id + "/like", {
        userId: currentUser._id,
      });
    } catch (err) {
      console.log(err);
    }
    setLike(isLiked ? like - 1 : like + 1);
    setIsLiked(!isLiked);
  };

  const handleUpdatePost = (e) => {
    e.preventDefault();
    setShowUpdate(true);
  };

  const handleDeletePost = async () => {
    try {
      await axios.delete(`http://localhost:8800/api/posts/${post._id}`, {
        data: { userId: user._id },
      });
      window.location.reload();
    } catch (err) {
      console.log(err);
    }
  };

  const handleShowComment = () => {
    if (showComments) {
      setShowComments(false);
    } else {
      setShowComments(true);
    }
  };

  useEffect(() => {
    const getComments = async () => {
      try {
        const res = await axios.get(
          "http://localhost:8800/api/comments/allComments/" + post._id
        );
        setComments(res.data);
      } catch (error) {
        console.log(error);
      }
    };
    if (post) getComments();
  }, [post]);

  const handleDataFormChild = (data) => {
    setDataChild(data);
  };

  console.log(dataChild);

  return (
    <div className="post">
      {showUpdate && (
        <UpdatePost id_post={post._id}>
          <Cancel onClick={() => setShowUpdate(false)} />
        </UpdatePost>
      )}
      <div className="postWrapper">
        <div className="postTop">
          <div className="postTopLeft">
            <Link to={`profile/${user.username}`}>
              <img
                className="postProfileImg"
                src={
                  user.profilePicture
                    ? PF + user.profilePicture
                    : PF + "person/noAvatar.png"
                }
                alt=""
              />
            </Link>
            <span className="postUsername">{user.username}</span>
            <span className="postDate">{format(post.createdAt)}</span>
          </div>
          <div className="postTopRight">
            {currentUser._id === post.userId && (
              <Dropdown>
                <Dropdown.Toggle variant="light">
                  <MoreVert />
                </Dropdown.Toggle>

                <Dropdown.Menu>
                  <Dropdown.Item onClick={handleUpdatePost}>
                    Update Post
                  </Dropdown.Item>
                  <Dropdown.Item onClick={handleDeletePost}>
                    Delete Post
                  </Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
            )}
          </div>
        </div>
        <div className="postCenter">
          <span className="postText">{post?.desc}</span>
          <img className="postImg" src={PF + post.img} alt="" />
        </div>
        <div className="postBottom">
          <div className="postBottomLeft">
            <img
              className="likeIcon"
              src={`${PF}like.png`}
              onClick={likeHandler}
              alt=""
            />
            <img
              className="likeIcon"
              src={`${PF}heart.png`}
              onClick={likeHandler}
              alt=""
            />
            <span className="postLikeCounter">{like} people like it</span>
          </div>
          <div className="postBottomRight">
            <span className="postCommentText" onClick={handleShowComment}>
              {dataChild.length !== 0
                ? dataChild.length + " comments"
                : comments.length + " comments"}
            </span>
          </div>
        </div>
        {showComments && (
          <CommentsBox post={post} sendDataToParent={handleDataFormChild} />
        )}
      </div>
    </div>
  );
}
