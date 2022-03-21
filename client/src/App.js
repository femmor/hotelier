import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import PrivateRoute from "./components/PrivateRoute";

// Styles
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// Components
import Home from "./booking/Home";
import Login from "./auth/Login";
import Register from "./auth/Register";
import ErrorPage from "./booking/ErrorPage";
import TopNav from "./components/TopNav";
import Dashboard from "./user/Dashboard";
import SellerDashboard from "./user/SellerDashboard";
import NewHotel from "./hotels/NewHotel";

const App = () => {
  return (
    <Router>
      <TopNav />
      <ToastContainer
        position="top-center"
        autoClose={5000}
        hideProgressBar={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
      />

      <Switch>
        <PrivateRoute exact path="/dashboard" component={Dashboard} />
        <PrivateRoute
          exact
          path="/dashboard/seller"
          component={SellerDashboard}
        />
        <PrivateRoute exact path="/hotels/create" component={NewHotel} />
        <Route exact path="/" component={Home} />
        <Route exact path="/login" component={Login} />
        <Route exact path="/register" component={Register} />
        <Route path="*" component={ErrorPage} />
      </Switch>
    </Router>
  );
};

export default App;
