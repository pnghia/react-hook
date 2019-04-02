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
  Categories,
  Category,
  Home,
  Profile,
  Register,
  Login,
  Setting,
  RegistrationSuccessfully
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
          <Route path="/register-success"  component={RegistrationSuccessfully} />
          <PrivateRoute path="/cart" component={Cart} />
          <PrivateRoute path="/cart-review" component={CartReview} />
          <PrivateRoute path="/categories" component={Categories} />
          <PrivateRoute path="/home" component={Home} />
          <PrivateRoute exact path="/" component={Home} />
          <PrivateRoute path="/category/:categoryId" component={Category} />
          <PrivateRoute path="/setting" component={Setting} />
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
