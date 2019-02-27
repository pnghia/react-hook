import React from 'react';
import {
  BrowserRouter as Router,
  Route,
  // Link,
  // Redirect
} from "react-router-dom";
import Login from 'feature/login';
import Home from 'feature/home';
// import http from 'service/http';
import './App.css';

const Auth = () => (
  <Router>
    <div>
      <Route path="/login" component={Login} />
      {/* <Route path="/home" component={Home} /> */}
      <Route path="/" component={Home} />
      {/* <PrivateRoute path="/protected" component={Home} /> */}
    </div>
  </Router>
);

// const PrivateRoute = ({ component: Component, ...rest }) => (
//   <Route
//     {...rest}
//     render={props =>
//       http.setJwtToken() ? (
//         <Component {...props} />
//       ) : (
//         <Redirect
//           to={{
//             pathname: "/login",
//             state: { from: props.location }
//           }}
//         />
//       )
//     }
//   />
// );

export default Auth;
