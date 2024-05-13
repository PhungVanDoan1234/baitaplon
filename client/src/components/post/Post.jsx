import { useContext, useEffect, useMemo, useState } from "react";
import { format } from "timeago.js";
import { Link } from "react-router-dom";
import "./post.css";
import { Cancel, MoreVert } from "@mui/icons-material";
import { AuthContext } from "../../context/AuthContext";
import UpdatePost from "../settingsPost/updatePost/UpdatePost";
import { Dropdown } from "react-bootstrap";
import CommentsBox from "../commentsBox/CommentsBox";
import { getUser, likePost, getAllComment, deletePost } from "../../apiCall";

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
  const [dataChildUpdated, setDataChildUpdated] = useState([]);
  let userData = JSON.parse(localStorage.getItem("user"));

  useEffect(() => {
    setIsLiked(post.likes.includes(currentUser._id));
  }, [currentUser._id, post.likes]);

  useEffect(() => {
    getUser(post.userId, setUser);
  }, [post.userId]);

  const likeHandler = () => {
    likePost(currentUser._id, post._id);
    setLike(isLiked ? like - 1 : like + 1);
    setIsLiked(!isLiked);
  };

  const handleUpdatePost = (e) => {
    e.preventDefault();
    setShowUpdate(true);
  };

  const handleDeletePost = async () => {
    deletePost(post._id, currentUser._id);
  };

  const handleShowComment = () => {
    if (showComments) {
      setShowComments(false);
    } else {
      setShowComments(true);
    }
  };

  useEffect(() => {
    if (post) getAllComment(post._id, setComments);
  }, [post]);

  const handleDataFormChild = (data) => {
    setDataChild(data);
  };

  const handleDataFormChildUpdated = (dataUpdated) => {
    setDataChildUpdated(dataUpdated);
  };

  useMemo(() => {
    if (dataChildUpdated?.id_post === post._id) {
      if (dataChildUpdated.desc) post.desc = dataChildUpdated.desc;
      if (dataChildUpdated.img) post.img = dataChildUpdated?.img;
      setShowUpdate(false);
    }
  }, [dataChildUpdated, post]);

  console.log(userData.profilePicture);

  return (
    <div className="post">
      {showUpdate && (
        <UpdatePost
          id_post={post._id}
          sendDataToParentUpdate={handleDataFormChildUpdated}
        >
          <Cancel onClick={() => setShowUpdate(false)} />
        </UpdatePost>
      )}
      <div className="postWrapper">
        <div className="postTop">
          <div className="postTopLeft">
            <Link to={`profile/${user.username}`}>
              <img
                className="postProfileImg"
                src={PF + userData.profilePicture}
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
