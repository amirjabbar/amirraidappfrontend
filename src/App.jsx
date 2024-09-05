import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";
import Dashboard from "./pages/Dashboard";
import { setLoggedIn, setLoggedOut } from "./Reducer/Authslice";
import "./App.css";

function App() {
  const dispatch = useDispatch();
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);

  useEffect(() => {
    const loggedIn = sessionStorage.getItem("isLoggedIn") === "true"; // Check sessionStorage

    if (loggedIn) {
      dispatch(setLoggedIn());
    } else {
      dispatch(setLoggedOut());
    }
  }, [dispatch]);

  return (
    <div className="app">
      <Router>
        <Routes>
          <Route
            path="/"
            element={isLoggedIn ? <Navigate to="/Dashboard" /> : <SignIn />}
          />
          <Route
            path="/Dashboard"
            element={isLoggedIn ? <Dashboard /> : <Navigate to="/login" />}
          />
          <Route
            path="/login"
            element={isLoggedIn ? <Navigate to="/" /> : <SignIn />}
          />
          <Route path="/register" element={<SignUp />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
