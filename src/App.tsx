import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.scss";
import Home from "./components/Home";
import Goods from "./components/Goods";
import { useAppDispatch } from "./app/hooks";
import { useEffect } from "react";
import { auth } from "./firebase";
import { login, logout } from "./features/userSlice";

function App() {
  const dispatch = useAppDispatch();
  useEffect(() => {
    auth.onAuthStateChanged((loginUser) => {
      if (loginUser) {
        dispatch(
          login({
            uid: loginUser.uid,
            photo: loginUser.photoURL,
            email: loginUser.email,
            displayName: loginUser.displayName,
          })
        );
      } else {
        dispatch(logout());
      }
    });
  }, [dispatch]);

  return (
    <div className="app">
      <Router>
        <Routes>
          <Route path="/" element={<Home />}></Route>
          <Route path="/goods" element={<Goods />}></Route>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
