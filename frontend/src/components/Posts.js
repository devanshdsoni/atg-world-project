import React from "react";
import PostItem from "./PostItem";

const Posts = (props) => {
  const { allPost, setAllPost } = props;
  const allPostsReversed = [];
  for (var i = allPost.length - 1; i >= 0; i--) {
    allPostsReversed.push(allPost[i]);
  }

  return (
    <>
      {allPostsReversed.map((post) => {
        return <PostItem key={post._id} post={post} allPost={allPost} setAllPost={setAllPost} />;
      })}
    </>
  );
};

export default Posts;
