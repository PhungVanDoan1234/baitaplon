import { useContext } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Home from "./pages/home/Home";
import Login from "./pages/login/Login";
import Profile from "./pages/profile/Profile";
import Register from "./pages/register/Register";
import Messenger from "./pages/messenger/Messenger";
import { AuthContext } from "./context/AuthContext";
import Topbar from "./components/topbar/Topbar";
import Feed from "./components/feed/Feed";
import OtherUser from "./pages/otherUser/OtherUser";
import FollowUser from "./pages/followUser/FollowUser";
import Notification from "./pages/notification/Notification";

function App() {
  const { user } = useContext(AuthContext);
  return (
    <Router>
      <Routes>
        <Route path="/" element={user ? <Home /> : <Navigate to="/login" />} />

        <Route path="/login" element={user ? <Navigate to="/" /> : <Login />} />
        <Route
          path="/register"
          element={user ? <Navigate to="/" /> : <Register />}
        />
        <Route
          path="/messenger"
          element={!user ? <Navigate to="/" /> : <Messenger />}
        />
        <Route
          path="/profile/:username"
          element={user ? <Profile /> : <Navigate to="/login" />}
        />
        <Route
          path="/feedPage"
          element={
            <>
              <Topbar />
              <Feed />
            </>
          }
        ></Route>
        <Route path="/otherUser" element={<OtherUser />}></Route>
        <Route path="/followUser" element={<FollowUser />}></Route>
        <Route path="/notification" element={<Notification />}></Route>
      </Routes>
    </Router>
  );
}

export default App;

/* <Route path="/profile/:username" element={<Profile />} /> */
/* <Route path="/register" element={<Register />} /> */
/* <Route path="/login" element={<Login />} /> */
