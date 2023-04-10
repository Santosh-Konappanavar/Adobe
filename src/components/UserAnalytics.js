import React, { useState, useEffect } from 'react';
import axios from 'axios';

function UserAnalytics() {
  const [userCount, setUserCount] = useState(0);
  const [mostActiveUsers, setMostActiveUsers] = useState([]);

  useEffect(() => {
    axios.get('/api/users/count')
      .then(res => {
        setUserCount(res.data.count);
      })
      .catch(err => {
        console.log(err);
      });

    axios.get('/api/users/most-active')
      .then(res => {
        setMostActiveUsers(res.data);
      })
      .catch(err => {
        console.log(err);
      });
  }, []);

  return (
    <div>
      <h1>User Analytics</h1>
      <p>Total Number of Users: {userCount}</p>
      <h2>Most Active Users</h2>
      <ul>
        {mostActiveUsers.map(user => (
          <li key={user._id}>{user.name} ({user.postCount} posts)</li>
        ))}
      </ul>
    </div>
  );
}

export default UserAnalytics;
