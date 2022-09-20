import Profile from "./pages/profile/Profile";
import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";
import Login from "./pages/login/Login";
import Home from "./pages/home/Home";
import Register from "./pages/register/Register";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Profile />} />
          <Route path="/profile" element={<Profile />}>
            <Route path=":profileID" element={<Profile />} />
          </Route>
          <Route path="timeline" element={<Home/>} />
          <Route path="login" element={<Login />} />
          <Route path="register" element={<Register />} />

        </Routes>
      </BrowserRouter>,

    </>
  )
}

export default App;
