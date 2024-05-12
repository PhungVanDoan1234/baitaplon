import { useContext, useEffect, useMemo, useRef, useState } from "react";
import "./commentsBox.css";
import axios from "axios";
import { AuthContext } from "../../context/AuthContext";
import Comment from "../comment/Comment";
function CommentsBox({ post, sendDataToParent }) {
  const [comments, setComments] = useState([]);
  const [newComment, setNewComent] = useState("");
  const { user: currentUser } = useContext(AuthContext);
  const scrollRef = useRef();
  const textComment = useRef();

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

  useMemo(() => {
    sendDataToParent(comments);
  }, [comments, sendDataToParent]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newCommentOfCurrentUser = {
      postId: post._id,
      userId: currentUser._id,
      text: newComment,
    };
    try {
      const res = await axios.post(
        "http://localhost:8800/api/comments/",
        newCommentOfCurrentUser
      );
      setComments([...comments, res.data]);
      setNewComent("");
    } catch (err) {
      console.log(err);
    }
  };

  const handleDelete = async (e, commentId) => {
    e.preventDefault();
    try {
      await axios.delete(`http://localhost:8800/api/comments/${commentId}`, {
        data: { userId: currentUser._id },
      });
      setComments(comments.filter((comment) => comment._id !== commentId));
    } catch (err) {
      console.log(err);
    }
  };

  const handleUpdate = async (e, commentId, UpdateText) => {
    try {
      await axios.put(`http://localhost:8800/api/comments/${commentId}`, {
        userId: currentUser._id,
        text: UpdateText,
      });
      setComments(
        comments.map((comment) => {
          if (comment._id === commentId) {
            return { ...comment, text: UpdateText };
          }
          return comment;
        })
      );
      setNewComent("");
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    scrollRef.current?.scrollIntoView({
      behavior: "smooth",
      block: "nearest",
      inline: "nearest",
    });
  }, [comments]);

  return (
    <div className="commentBox">
      <div className="commentBoxWrapper">
        <>
          <div className="commentBoxTop">
            <div>
              {comments.map((comment) => (
                <div ref={scrollRef} key={comment._id}>
                  <Comment
                    comment={comment}
                    onDelete={(e) => handleDelete(e, comment._id)}
                    onUpdate={(e) =>
                      handleUpdate(e, comment._id, textComment.current.value)
                    }
                  />
                </div>
              ))}
            </div>
          </div>
          <div className="commentBoxBottom">
            <textarea
              className="commentsMessageInput"
              placeholder="write something..."
              onChange={(e) => setNewComent(e.target.value)}
              value={newComment}
              ref={textComment}
            ></textarea>
            <button className="commentsSubmitButton" onClick={handleSubmit}>
              Send
            </button>
          </div>
        </>
      </div>
    </div>
  );
}

export default CommentsBox;
