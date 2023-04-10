import React, { useState } from "react";

const PostForm = ({ onSubmit, post = {} }) => {
  const [title, setTitle] = useState(post.title || "");
  const [body, setBody] = useState(post.body || "");

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({ title, body });
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Title:
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
      </label>
      <label>
        Body:
        <textarea value={body} onChange={(e) => setBody(e.target.value)} />
      </label>
      <button type="submit">Submit</button>
    </form>
  );
};

export default PostForm;
