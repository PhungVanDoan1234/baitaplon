import axios from "axios";

// User call api
export const loginCall = async (userCredentail, dispatch) => {
  dispatch({ type: "LOGIN_START" });
  try {
    const res = await axios.post(
      "http://localhost:8800/api/auth/login",
      userCredentail
    );
    dispatch({ type: "LOGIN_SUCCESS", payload: res.data });
  } catch (err) {
    dispatch({ type: "LOGIN_FAILURE", payload: err });
  }
};

export const followUser = async (followed, userId, currentUserId, dispatch) => {
  try {
    if (followed) {
      await axios.put(
        "http://localhost:8800/api/users/" + userId + "/unfollow",
        { userId: currentUserId }
      );
      dispatch({ type: "UNFOLLOW", payload: userId });
    } else {
      await axios.put("http://localhost:8800/api/users/" + userId + "/follow", {
        userId: currentUserId,
      });
      dispatch({ type: "FOLLOW", payload: userId });
    }
  } catch (err) {
    console.log(err);
  }
};

export const getAllUserOther = async (setUserOthers, currentUserId) => {
  try {
    const useOther = await axios.get(
      `http://localhost:8800/api/users/allUser/${currentUserId}`
    );
    setUserOthers(useOther.data);
  } catch (error) {
    console.log(error);
  }
};

export const getUser = async (userId, setUser) => {
  const res = await axios.get(
    `http://localhost:8800/api/users?userId=${userId}`
  );
  setUser(res.data);
};

export const getfriendList = async (userId, setFriends) => {
  try {
    const friendList = await axios.get(
      "http://localhost:8800/api/users/friends/" + userId
    );
    setFriends(friendList.data);
  } catch (err) {
    console.log(err);
  }
};

// comment call api
export const getComments = async (postId, setComments) => {
  try {
    const res = await axios.get(
      "http://localhost:8800/api/comments/allComments/" + postId
    );
    setComments(res.data);
  } catch (error) {
    console.log(error);
  }
};

export const postNewComment = async (
  newCommentOfCurrentUser,
  comments,
  setComments
) => {
  try {
    const res = await axios.post(
      "http://localhost:8800/api/comments/",
      newCommentOfCurrentUser
    );
    setComments([...comments, res.data]);
  } catch (err) {
    console.log(err);
  }
};

export const deleteComment = async (
  commentId,
  currentUserId,
  comments,
  setComments
) => {
  try {
    await axios.delete(`http://localhost:8800/api/comments/${commentId}`, {
      data: { userId: currentUserId },
    });
    setComments(comments.filter((comment) => comment._id !== commentId));
  } catch (err) {
    console.log(err);
  }
};

export const updateComment = async (
  commentId,
  UpdateText,
  currentUserId,
  comments,
  setComments
) => {
  try {
    await axios.put(`http://localhost:8800/api/comments/${commentId}`, {
      userId: currentUserId,
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
  } catch (err) {
    console.log(err);
  }
};

export const getAllComment = async (postId, setComments) => {
  try {
    const res = await axios.get(
      "http://localhost:8800/api/comments/allComments/" + postId
    );
    setComments(res.data);
  } catch (error) {
    console.log(error);
  }
};

// post call api
export const getPost = async (username, userId, setPosts) => {
  const res = username
    ? await axios.get("http://localhost:8800/api/posts/profile/" + username)
    : await axios.get("http://localhost:8800/api/posts/timeline/" + userId);
  setPosts(res.data.reverse());
};

export const likePost = async (userId, postId) => {
  try {
    await axios.put("http://localhost:8800/api/posts/" + postId + "/like", {
      userId: userId,
    });
  } catch (err) {
    console.log(err);
  }
};

export const deletePost = async (postId, userId) => {
  try {
    await axios.delete(`http://localhost:8800/api/posts/${postId}`, {
      data: { userId: userId },
    });
    window.location.reload();
  } catch (err) {
    console.log(err);
  }
};

export const updatePost = async (postId, newPost) => {
  try {
    await axios.put(`http://localhost:8800/api/posts/${postId}`, newPost);
    window.location.reload();
  } catch (error) {
    console.log(error);
  }
};

// upload
export const upload = async (data) => {
  try {
    await axios.post("http://localhost:8800/api/upload", data);
  } catch (err) {
    console.log(err);
  }
};
