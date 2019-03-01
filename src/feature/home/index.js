import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/styles';
import SwipeableViews from 'react-swipeable-views';
import {
  Typography,
  AppBar,
  Toolbar,
  IconButton,
  Drawer,
  Badge,
  Tabs,
  Tab,
  ListItemIcon,
  ListItemText,
  ListItem,
  Divider,
  List
} from '@material-ui/core';

import MenuIcon from '@material-ui/icons/Menu';
import {
  ShoppingCart as ShopingCartIcon,
  Mail as MailIcon,
  MoveToInbox as InboxIcon
} from '@material-ui/icons';

import http from 'service/http';
import Offers from 'component/offers';
import Restaurants from 'component/restaurants';
import TabContainer from 'component/tab';
import useCarts from 'component/cart/hook';
import useLoading from '../loading/hook';
import customStyle from './style';

// import useAuth from '../auth/hook'

const useStyles = makeStyles(customStyle);

function home() {
  const classes = useStyles();
  const [offers, updateOffers] = useState([]);
  const [restaurants, updateRestaurants] = useState([]);
  const [, withLoading] = useLoading(false);
  // const [auth] = useAuth(false)
  const [carts, updateCarts] = useCarts();
  const [tabSelected, updateTabSelected] = useState(0);
  const [drawer, toggleDrawer] = useState(false);

  function handleChangeTab(event, newValue) {
    updateTabSelected(newValue);
  }

  function handleChangeTabIndex(index) {
    updateTabSelected(index);
  }

  const onToggleDrawer = status => () => {
    toggleDrawer(status);
  };

  const fetchData = async () => {
    const [
      {
        data: { data: offersResp }
      },
      {
        data: { data: restaurantsResp }
      }
    ] = await withLoading(() =>
      Promise.all([
        http.get({ path: 'offer' }),
        http.get({ path: 'store/search' })
      ])
    );
    updateOffers(offersResp);
    updateRestaurants(restaurantsResp);
  };

  useEffect(() => {
    fetchData();
  }, []);

  function SideBar() {
    return (
      <div className={classes.list}>
        <List>
          {['Feed', 'Categories', 'Orders', 'Payments'].map((text, index) => (
            <ListItem button key={text}>
              <ListItemIcon>
                {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
              </ListItemIcon>
              <ListItemText primary={text} />
            </ListItem>
          ))}
        </List>
        <Divider />
        <List>
          {['Setting', 'Profile', 'Logout'].map((text, index) => (
            <ListItem button key={text}>
              <ListItemIcon>
                {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
              </ListItemIcon>
              <ListItemText primary={text} />
            </ListItem>
          ))}
        </List>
      </div>
    );
  }

  return (
    <div className={classes.root}>
      <Drawer open={drawer} onClose={onToggleDrawer(false)}>
        <div
          tabIndex={0}
          role="button"
          onClick={onToggleDrawer(false)}
          onKeyDown={onToggleDrawer(false)}
        >
          <SideBar />
        </div>
      </Drawer>
      <AppBar position="static">
        <Toolbar>
          <IconButton
            onClick={onToggleDrawer(true)}
            className={classes.menuButton}
            color="inherit"
            aria-label="Menu"
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" color="inherit" className={classes.grow}>
            Home
          </Typography>
          <div>
            <IconButton color="inherit">
              <Badge badgeContent={carts.length} color="secondary">
                <ShopingCartIcon />
              </Badge>
            </IconButton>
          </div>
        </Toolbar>
      </AppBar>
      <AppBar position="static" color="default">
        <Tabs
          value={tabSelected}
          onChange={handleChangeTab}
          indicatorColor="primary"
          textColor="primary"
          variant="fullWidth"
          centered
        >
          <Tab label="OFFER" />
          <Tab label="RESTAURANT" />
        </Tabs>
      </AppBar>
      <SwipeableViews index={tabSelected} onChangeIndex={handleChangeTabIndex}>
        <TabContainer>
          <Offers offers={offers} updateCarts={updateCarts} carts={carts} />
        </TabContainer>
        <TabContainer>
          <Restaurants restaurants={restaurants} />
        </TabContainer>
      </SwipeableViews>
    </div>
  );
}

export default home;
