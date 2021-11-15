import { useContext, useEffect } from "react";
import { Switch, Route, useHistory } from "react-router-dom";
import { API, setAuthToken } from "./config/api";
import { UserContext } from "./context/userContext";

import Landing from "./pages/Landing";
import Home from "./pages/Home";
import Subscribe from "./pages/Subscribe";
import Profile from "./pages/Profile";
import DetailBook from "./pages/DetailBook";
import ReadBook from "./pages/ReadBook";
import "bootstrap/dist/css/bootstrap.min.css";
import "./index.css";
import Transaction from "./pages/Transaction";
import AddBook from "./pages/AddBook";

if (localStorage.token) {
  setAuthToken(localStorage.token);
}

function App() {
  let history = useHistory();
  const [state, dispatch] = useContext(UserContext);
  useEffect(() => {
    if (!state.isLogin) {
      history.push("/");
    } else {
      if (state.user.role === "admin") {
        history.push("/transaction");
      } else if (state.user.role === "user") {
        history.push("/home");
      }
    }
  }, [state]);

  const checkUser = async () => {
    try {
      const response = await API.get("/check-auth");

      // If the token incorrect
      if (response.status === 404) {
        return dispatch({
          type: "AUTH_ERROR",
        });
      }

      // Get user data
      let payload = response.data.data.user;
      // Get token from local storage
      payload.token = localStorage.token;

      // Send data to useContext
      dispatch({
        type: "USER_SUCCESS",
        payload,
      });
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    checkUser();
  }, []);
  return (
      <Switch>
        <Route exact path="/" component={Landing} />
        <Route path="/home" component={Home} />
        <Route path="/subscribe" component={Subscribe} />
        <Route path="/profile" component={Profile} />
        <Route path="/detail-book/:id" component={DetailBook} />
        <Route path="/read-book/:id" component={ReadBook} />
        <Route path="/transaction" component={Transaction} />
        <Route path="/add-book" component={AddBook} />
      </Switch>
  );
}

export default App;
