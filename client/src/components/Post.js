import React, { useContext, useEffect, useRef, useState } from "react";
import "./styles/Post.css";
import Like from "./assets/like.png";
import Comment from "./assets/Comment.png";
import Share from "./assets/Share.png";
import Repost from "./assets/repost.png";
import ProfilePic from "./assets/Default.png";
import timeAgo from "./timeAgo";
import { useSelector } from "react-redux";
import axios from "axios";

const Post = ({ post, user }) => {
  // const user = useSelector((state) => state.user);

  const handleDelete = async () => {
    window.location.reload();
    try {
      await axios.delete(`/posts/${post._id}`, {
        data: { username: user.username },
      });
    } catch (err) {}
  };

  return (
    <>
      <div className="Post">
        <div className="Post-Picture">
          <img src={user?.picture || ProfilePic} />
        </div>
        <div className="Post-Content">
          <div className="Post-Header">
            <span className="Post-Name">
              {post?.user?.firstName || post?.user?.lastName
                ? `${post?.user?.firstName} ${post?.user?.lastName}`
                : "New User"}
            </span>
            <span className="Post-Position"></span>
            &nbsp;
            <span className="Post-Company"></span>
            <span className="Post-Time">
              {timeAgo(post.createdAt)}
              <button className="delete" onClick={handleDelete}>
                X
              </button>
            </span>
          </div>

          <div className="Post-Description">
            {post?.description}
            {post.pic ? (
              <div>
                <img
                  src={post?.pic}
                  alt="imgg"
                  style={{
                    width: "21rem",
                    height: "11rem",
                    marginTop: "0.5rem",
                  }}
                />
              </div>
            ) : null}
          </div>

          <div className="Post-Footer">
            <div onClick={() => {}}>
              <img src={Like} />
            </div>

            <div onClick={() => {}}>
              <img src={Share} />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Post;
