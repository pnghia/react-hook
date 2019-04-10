import React, { useState, useEffect } from 'react'
import { makeStyles } from '@material-ui/styles'
import {
  AppBar,
  Toolbar,
  IconButton,
  Drawer,
  Badge,
  Tabs,
  Tab
} from '@material-ui/core'

import MenuIcon from '@material-ui/icons/Menu'
import {
  ShoppingCart as ShopingCartIcon
} from '@material-ui/icons'

import { propEq, map, findIndex } from 'ramda'

import http from 'service/http'
import Offers from 'component/offers'
import Restaurants from 'component/restaurants'
import TabContainer from 'component/tab'
import Sidebar from 'component/drawer'
import useCarts from 'component/cart/hook'
import Header from 'component/header'
import useLoading from '../loading/hook'
import customStyle from './style'

// import useAuth from '../auth/hook'

const useStyles = makeStyles(customStyle);

function home({ history }) {
  const classes = useStyles();
  const [offers, updateOffers] = useState([]);
  const [restaurants, updateRestaurants] = useState([]);
  const [, withLoading] = useLoading(false);
  // const [auth] = useAuth(false)
  const [carts, updateCarts, getCartsAmount] = useCarts();
  const [tabSelected, updateTabSelected] = useState(0);
  const [drawer, toggleDrawer] = useState(false);

  function handleChangeTab(event, newValue) {
    updateTabSelected(newValue);
  }

  async function addToCarts (id) {
    const withId = propEq('id', id)
    const findIndexInCards = findIndex(withId)
    const indexCart = findIndexInCards(carts)
    if (indexCart === -1) {
      const found = offers.find(item => item.id === id)
      const newCarts = [...carts, { ...found, quantity: 1 }]
      updateCarts(newCarts)
      return;
    }
    const increaseIfExist = idOffer => item => {
      if (item.id === idOffer) {
        return {
          ...item,
          quantity: item.quantity + 1
        }
      }
      return item
    }
    const increaseIfExistInCards = map(increaseIfExist(id))
    const newCarts = increaseIfExistInCards(carts)
    updateCarts(newCarts)
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
            string='Home'
            classes={classes}
          />
          <div>
            <IconButton color="inherit" onClick={() => history.push('cart')}>
              <Badge badgeContent={getCartsAmount()} color="secondary">
                <ShopingCartIcon />
              </Badge>
            </IconButton>
          </div>
        </Toolbar>
      </AppBar>
      <AppBar position='fixed' style={{top: 56}} color="default">
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
      <TabContainer style={{marginTop: 100}}>
        { tabSelected === 0
          ? <Offers offers={offers} addToCarts={addToCarts} />
          : <Restaurants history={history} restaurants={restaurants} />
        }
      </TabContainer>
    </div>
  );
}

export default home;
