import React from 'react';
import UserAnalytics from '../components/UserAnalytics';
import PostAnalytics from '../components/PostAnalytics';

const Analytics = () => {
  return (
    <div>
      <h1>Analytics</h1>
      <UserAnalytics />
      <PostAnalytics />
    </div>
  );
};

export default Analytics;
