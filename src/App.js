import './App.css';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import UserForm from './components/UserForm';
import PostForm from './components/PostForm';
import UserList from './components/UserList';
import PostList from './components/PostList';
import UserAnalytics from './components/UserAnalytics';
import PostAnalytics from './components/PostAnalytics';

function App() {
  return (
    <Router>
      <Navbar />
        <Route exact path="/">
          <h1>Welcome to our social network app!</h1>
        </Route>
        <Route exact path="/users">
          <UserList />
        </Route>
        <Route exact path="/users/new">
          <UserForm />
        </Route>
        <Route exact path="/users/:id/edit">
          <UserForm />
        </Route>
        <Route exact path="/posts">
          <PostList />
        </Route>
        <Route exact path="/posts/new">
          <PostForm />
        </Route>
        <Route exact path="/posts/:id/edit">
          <PostForm />
        </Route>
        <Route exact path="/analytics/users">
          <UserAnalytics />
        </Route>
        <Route exact path="/analytics/posts">
          <PostAnalytics />
        </Route>
    </Router>
  );
}

export default App;

