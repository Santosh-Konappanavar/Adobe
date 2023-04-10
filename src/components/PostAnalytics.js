import React, { useEffect, useState } from 'react';
import axios from 'axios';

function PostAnalytics() {
  const [postCount, setPostCount] = useState(0);
  const [mostLikedPosts, setMostLikedPosts] = useState([]);

  useEffect(() => {
    // Fetch total post count
    axios.get('/api/posts/count')
      .then(response => {
        setPostCount(response.data.count);
      })
      .catch(error => {
        console.log(error);
      });

    // Fetch most liked posts
    axios.get('/api/posts/most-liked')
      .then(response => {
        setMostLikedPosts(response.data.posts);
      })
      .catch(error => {
        console.log(error);
      });
  }, []);

  return (
    <div>
      <h1>Post Analytics</h1>
      <p>Total Posts: {postCount}</p>
      <h2>Top 5 Most Liked Posts:</h2>
      <ul>
        {mostLikedPosts.map(post => (
          <li key={post.id}>
            {post.title} - {post.likes} Likes
          </li>
        ))}
      </ul>
    </div>
  );
}

export default PostAnalytics;
