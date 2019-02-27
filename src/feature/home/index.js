/* eslint-disable react/no-array-index-key */
import React, { useState, useEffect } from 'react'
import { makeStyles } from '@material-ui/styles'
import SwipeableViews from 'react-swipeable-views'
import AppBar from '@material-ui/core/AppBar'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemText from '@material-ui/core/ListItemText'
import ListItemAvatar from '@material-ui/core/ListItemAvatar'
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction'
import Avatar from '@material-ui/core/Avatar'
import Typography from '@material-ui/core/Typography'
import Toolbar from '@material-ui/core/Toolbar'
import IconButton from '@material-ui/core/IconButton'
import MenuIcon from '@material-ui/icons/Menu'
import ShopingCartIcon from '@material-ui/icons/ShoppingCart'
import AddShoppingCartIcon from '@material-ui/icons/AddShoppingCart'
import Badge from '@material-ui/core/Badge'
import Tabs from '@material-ui/core/Tabs'
import Tab from '@material-ui/core/Tab'
import numeral from 'numeral'
import http from 'service/http'
import useLoading from '../loading/hook'
// import useAuth from '../auth/hook'

function TabContainer({ children, dir }) {
  return (
    <Typography component="div" dir={dir} style={{ padding: 8 * 3 }}>
      {children}
    </Typography>
  );
}

const useStyles = makeStyles({
  root: {
    flexGrow: 1,
  },
  grow: {
    flexGrow: 1,
  },
  menuButton: {
    marginLeft: -12,
    marginRight: 20,
  },
  tab: {
    flexGrow: 1,
  },
});

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
          <List>
            {offers.map(({storeName, description, price, picture, id}) => (<ListItem key={id} alignItems="flex-start">
              <ListItemAvatar>
                <Avatar alt="Remy Sharp" src={`https://carflatf.com/images/s_${picture}`} />
              </ListItemAvatar>
              <ListItemText
                primary={storeName}
                secondary={
                  <React.Fragment>
                    <Typography component="span" color="textPrimary">
                      {description}
                    </Typography>
                      ${numeral(price).format('0,0')}
                  </React.Fragment>
                }
              />
              <ListItemSecondaryAction>
                <IconButton aria-label="Comments">
                  <AddShoppingCartIcon />
                </IconButton>
              </ListItemSecondaryAction>
            </ListItem>))}
          </List>
        </TabContainer>
        <TabContainer>
        <List>
            {restaurants.map(({name, address, menu}, index) => (<ListItem key={index} alignItems="flex-start">
              <ListItemAvatar>
                <Avatar alt="Remy Sharp" src={`https://carflatf.com/images/s_${menu}`} />
              </ListItemAvatar>
              <ListItemText
                primary={name}
                secondary={
                  <React.Fragment>
                    <Typography component="span" color="textPrimary">
                      {address.formatted_address}
                    </Typography>
                  </React.Fragment>
                }
              />
              <ListItemSecondaryAction>
                <IconButton aria-label="Comments">
                  <AddShoppingCartIcon />
                </IconButton>
              </ListItemSecondaryAction>
            </ListItem>))}
          </List>
        </TabContainer>
      </SwipeableViews>
    </div>
  );
}

export default home;