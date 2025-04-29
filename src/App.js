
import HomePage from './HomePage';
import LoginPage from './LoginPage';
import Post from './post';
import Profile from './profile';
import NewPost from './newPost';
import PostDetailPage from './postDetail';
import SignUp from './signUp';
import Activate from './activate';
import CreateProfile from './createProfile';
import EditProfile from './editProfile';
import People from './people';
import FilterPost from './filterpost';
import Navbar from './navbar';
import About from './about';
import EditPost from './editPost';
import PostSearch from './postSearch';
import PostReport from './postReport';
import EditComment from './editComment';
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";


function App() {
  return (
    <div className="App">
      <Router>
      <Routes>
          <Route path="/" element={<HomePage/>}></Route>
        </Routes>
        <Routes>
          <Route path="/post/:post_id/comment/:comment_id/edit" element={<EditComment/>}></Route>
        </Routes>
        <Routes>
          <Route path="/search" element={<PostSearch/>}></Route>
        </Routes>
        <Routes>
          <Route path="/login" element={<LoginPage/>}></Route>
        </Routes>
        <Routes>
          <Route path="/post" element={<Post/>}></Route>
        </Routes>
        <Routes>
          <Route path="/post/edit/:post_id" element={<EditPost/>}></Route>
        </Routes>
        <Routes>
          <Route path="/post/filter/:criteria" element={<FilterPost/>}></Route>
        </Routes>
        <Routes>
          <Route path="/post/report/:post_id" element={<PostReport/>}></Route>
        </Routes>
        <Routes>
          <Route path="/profile" element={<Profile/>}></Route>
        </Routes>
        <Routes>
          <Route path="/newpost" element={<NewPost/>}></Route>
        </Routes>
        <Routes>
          <Route path="/post/details/:post_id" element={<PostDetailPage/>}></Route>
        </Routes>
        <Routes>
          <Route path="/signup" element={<SignUp/>}></Route>
        </Routes>
        <Routes>
          <Route path="/activate" element={<Activate/>}></Route>
        </Routes>
        <Routes>
          <Route path="/profile/create" element={<CreateProfile/>}></Route>
        </Routes>
        <Routes>
          <Route path="/profile/edit" element={<EditProfile/>}></Route>
        </Routes>
        <Routes>
          <Route path="/profile/user/:profile_id/:username" element={<People/>}></Route>
        </Routes>
        <Routes>
          <Route path="/navbar" element={<Navbar/>}></Route>
        </Routes>
        <Routes>
          <Route path="/about" element={<About/>}></Route>
        </Routes>
      </Router>
    </div>
  );
}
export default App;
