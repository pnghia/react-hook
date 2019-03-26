/* eslint-disable react/no-array-index-key */
import React from 'react';
import {
  BrowserRouter as Router,
  Route,
  Redirect
} from "react-router-dom";

import {
  Cart,
  CartReview,
  CategoryRestaurent,
  Categories,
  Home,
  Profile,
  Register,
  Login,
} from 'feature'

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
          <PrivateRoute path="/cart" component={Cart} />
          <PrivateRoute path="/cart-review" component={CartReview} />
          <PrivateRoute path="/categories" component={Categories} />
          <PrivateRoute path="/category/:id/restaurant/:categoryName" component={CategoryRestaurent} />
          <PrivateRoute path="/home" component={Home} />
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
