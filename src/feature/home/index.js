import React, { useState, useEffect } from 'react'
import { makeStyles } from '@material-ui/styles'
import SwipeableViews from 'react-swipeable-views'
import AppBar from '@material-ui/core/AppBar'
import Typography from '@material-ui/core/Typography'
import Toolbar from '@material-ui/core/Toolbar'
import IconButton from '@material-ui/core/IconButton'
import MenuIcon from '@material-ui/icons/Menu'
import ShopingCartIcon from '@material-ui/icons/ShoppingCart'
import Badge from '@material-ui/core/Badge'
import Tabs from '@material-ui/core/Tabs'
import Tab from '@material-ui/core/Tab'
import http from 'service/http'
import Offers from 'component/offers'
import Restaurants from 'component/restaurants'
import TabContainer from 'component/tab'
import useLoading from '../loading/hook'
import customStyle from './style'
// import useAuth from '../auth/hook'

const useStyles = makeStyles(customStyle);

function home() {
  const classes = useStyles();
  const [offers, updateOffers] = useState([])
  const [restaurants, updateRestaurants] = useState([])
  const [ , withLoading ] = useLoading(false)
  // const [auth] = useAuth(false)
  const [tabSelected, updateTabSelected] = React.useState(0);

  function handleChangeTab(event, newValue) {
    updateTabSelected(newValue);
  }

  function handleChangeTabIndex(index) {
    updateTabSelected(index);
  }

  const fetchData = async() => {
    const [{ data: { data: offersResp } }, { data: { data: restaurantsResp } }] = await withLoading(() => Promise.all([
      http.get({ path: 'offer'}),
      http.get({ path: 'store/search'})
    ]))
    updateOffers(offersResp)
    updateRestaurants(restaurantsResp)
  }

  useEffect(
    () => {
      fetchData()
    },
    []
  )

  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar>
          <IconButton className={classes.menuButton} color="inherit" aria-label="Menu">
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" color="inherit" className={classes.grow}>
            Home
          </Typography>
          <div>
            <IconButton color="inherit">
              <Badge badgeContent={4} color="secondary">
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
      <SwipeableViews
        index={tabSelected}
        onChangeIndex={handleChangeTabIndex}
      >
        <TabContainer>
          <Offers offers={offers} />
        </TabContainer>
        <TabContainer>
          <Restaurants restaurants={restaurants} />
        </TabContainer>
      </SwipeableViews>
    </div>
  );
}

export default home;