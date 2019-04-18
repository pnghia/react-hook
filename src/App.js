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
  RegistrationSuccessfully,
  Payment
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
          <Route path="/cart" component={Cart} />
          <Route path="/cart-review" component={CartReview} />
          <Route path="/categories" component={Categories} />
          <Route path="/home" component={Home} />
          <PrivateRoute exact path="/" component={Home} />
          <Route path="/category/:categoryId" component={Category} />
          <Route path="/profile/:profileId" component={Profile} />
          <PrivateRoute path="/setting" component={Setting} />
          <PrivateRoute path="/payment" component={Payment} />
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
