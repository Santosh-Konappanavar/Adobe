import React from "react";

const PostList = ({ posts, onEdit, onDelete, onLike, onUnlike }) => {
  return (
    <ul>
      {posts.map((post) => (
        <li key={post.id}>
          <h3>{post.title}</h3>
          <p>{post.body}</p>
          <button onClick={() => onEdit(post)}>Edit</button>
          <button onClick={() => onDelete(post)}>Delete</button>
          <button onClick={() => onLike(post)}>Like ({post.likes})</button>
          <button onClick={() => onUnlike(post)}>Unlike</button>
        </li>
      ))}
    </ul>
  );
};

export default PostList;
