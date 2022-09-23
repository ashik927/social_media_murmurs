import Profile from "./pages/profile/Profile";
import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";
import Login from "./pages/login/Login";
import Home from "./pages/home/Home";
import Register from "./pages/register/Register";
import PrivateRoute from "./components/PrivateRoute/PrivateRoute";
import { Follow } from "./pages/Follow/Follow";
import { Following } from "./pages/Following/Following";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route exact path='/' element={<PrivateRoute />}>
            <Route path="/" element={<Home />} />
            <Route path="/profile" element={<Profile />}>
              <Route path=":userName" element={<Profile />} />
            </Route>
            <Route path="timeline" element={<Home />} />
            <Route path="follow" element={<Follow />} />
            <Route path="following" element={<Following />} />
          </Route>
          <Route path="login" element={<Login />} />
          <Route path="register" element={<Register />} />
          

        </Routes>
      </BrowserRouter>,

    </>
  )
}

export default App;
