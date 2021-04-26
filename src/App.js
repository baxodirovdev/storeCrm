import React, { useEffect, useState } from "react";
import "./styles/App.css";
import "antd/dist/antd.css";

import { BrowserRouter as Router } from "react-router-dom";
import { Home } from "./pages/Home";
import { auth } from "./firebase";
import { Loader } from "./components/layout/Loader";
import { Auth } from "./pages/Auth/Auth";
import { useDispatch, useSelector } from "react-redux";
import { setUser } from "./redux/actions/UserAction";
import { getProducts } from "./redux/actions/ProductsAction";

function App() {
  const dispatch = useDispatch();
  const [loader, setLoader] = useState(true);
  const user = useSelector((state) => state.user.user);

  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      if (user) {
        dispatch(setUser(user));
        dispatch(getProducts(user.uid));
      }

      setLoader(false);
    });
  }, [user, dispatch]);

  if (loader) {
    return <Loader />;
  } else {
    return (
      <Router>
        <div className="app">{user ? <Home /> : <Auth />}</div>
      </Router>
    );
  }
}

export default App;
