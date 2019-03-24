/* eslint-disable react/no-array-index-key */
import React from 'react';
import {
  BrowserRouter as Router,
  Route,
  Redirect
} from "react-router-dom";
import Login from 'feature/login';
import Home from 'feature/home';
import Cart from 'feature/cart'
import CartReview from 'feature/cartReview'
import Profile from 'feature/profile'
import Register from 'feature/register';
import http from 'service/http'
import store from 'store'
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles'
import './App.css';


const theme = createMuiTheme({
  palette: {
    primary: {
        main: '#007DFE'
      }
    }
  },
)

function AuthExample() {
  return (
    <MuiThemeProvider theme={theme}>
      <Router>
        <div>
          <Route path="/login" component={Login} />
          <Route path="/register" component={Register} />
          <PrivateRoute exact path="/" component={Home} />
          <PrivateRoute path="/cart" component={Cart} />
          <PrivateRoute path="/cart-review" component={CartReview} />
          <PrivateRoute path="/profile" component={Profile} />
        </div>
      </Router>
    </MuiThemeProvider>
  );
}

function PrivateRoute({ component: Component, ...rest }) {
  const token = store.get('token')
  http.setJwtToken(token)

  return (
    <Route
      {...rest}
      render={props =>
        token ? (
          <Component {...props} />
        ) : (
          <Redirect
            to={{
              pathname: "/login",
              state: { from: props.location }
            }}
          />
        )
      }
    />
  );
}

export default AuthExample
