import React, { useState } from 'react'
import { makeStyles } from '@material-ui/styles'
import {
  AppBar,
  Toolbar,
  IconButton,
  Drawer
} from '@material-ui/core'

import MenuIcon from '@material-ui/icons/Menu'
import Sidebar from 'component/drawer'
import Header from 'component/header'
import {Elements, StripeProvider } from 'react-stripe-elements';
import CheckoutForm from './checkoutForm';
import customStyle from './style'
import './style.css'

const useStyles = makeStyles(customStyle);

function home({ history }) {
  const classes = useStyles();
  const [drawer, toggleDrawer] = useState(false);

  const onToggleDrawer = status => () => {
    toggleDrawer(status);
  };

  return (
    <div className={classes.root}>
      <Drawer open={drawer} onClose={onToggleDrawer(false)}>
        <div
          tabIndex={0}
          role="button"
          onClick={onToggleDrawer(false)}
          onKeyDown={onToggleDrawer(false)}
        >
          <Sidebar history={history} />
        </div>
      </Drawer>
      <AppBar position='fixed'>
        <Toolbar>
          <IconButton
            onClick={onToggleDrawer(true)}
            className={classes.menuButton}
            color="inherit"
            aria-label="Menu"
          >
            <MenuIcon />
          </IconButton>
          <Header 
            string='Payment'
            classes={classes}
          />
          <div/>
        </Toolbar>
      </AppBar>
      <StripeProvider apiKey="pk_test_iTfXEX5tUaFTtGPAzzFfyRl7">
        <div className="example">
          <h1>Stripe Payment Gateway</h1>
          <Elements>
            <CheckoutForm history={history}/>
          </Elements>
        </div>
      </StripeProvider>
    </div>
  );
}

export default home;
