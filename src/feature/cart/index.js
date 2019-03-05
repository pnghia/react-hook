import React, { useState } from 'react'
import { makeStyles } from '@material-ui/styles'
import {
  Typography,
  AppBar,
  Toolbar,
  IconButton,
  Drawer,
  Badge,
  ListItemIcon,
  ListItemText,
  ListItem,
  Divider,
  List,
  ListItemAvatar,
  ListItemSecondaryAction,
  Avatar,Fab
} from '@material-ui/core'
import MenuIcon from '@material-ui/icons/Menu'
import {
  ShoppingCart as ShopingCartIcon,
  Mail as MailIcon,
  MoveToInbox as InboxIcon,
  Add as AddIcon,
  Remove as RemoveIcon
} from '@material-ui/icons'

import numeral from 'numeral'
import { propEq, map, findIndex } from 'ramda'
import useCarts from 'component/cart/hook'
import customStyle from './style'

// import useAuth from '../auth/hook'

const useStyles = makeStyles(customStyle);

function home({ history }) {
  const classes = useStyles()
  // const [auth] = useAuth(false)
  const [carts, updateCarts, getCartsAmount] = useCarts()
  const [drawer, toggleDrawer] = useState(false)

  async function addToCarts (id) {
    const withId = propEq('id', id)
    const findIndexInCards = findIndex(withId)
    const indexCart = findIndexInCards(carts)
    if (indexCart === -1) {
      const found = carts.find(item => item.id === id)
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

  function removeFromCarts(id) {
    const reduceIfExist = idOffer => item => {
      if (item.id === idOffer) {
        return {
          ...item,
          quantity: item.quantity - 1
        }
      }
      return item;
    }
    const reduceIfExistInCards = map(reduceIfExist(id));
    const newCarts = reduceIfExistInCards(carts)
      .filter(({ quantity }) => quantity !== 0);
    updateCarts(newCarts)
  }

  const onToggleDrawer = status => () => {
    toggleDrawer(status);
  };

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
      <AppBar>
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
            Cart
          </Typography>
          <div>
            <IconButton color="inherit" onClick={() => history.push('cart')}>
              <Badge badgeContent={getCartsAmount()} color="secondary">
                <ShopingCartIcon />
              </Badge>
            </IconButton>
          </div>
        </Toolbar>
      </AppBar>
      
      <List style={{marginTop: 80}}>
        { map(
            ({ storeName, description, price, picture, id, quantity }) => (
              <ListItem key={id} alignItems="flex-start">
                <ListItemAvatar>
                  <Avatar
                    alt="Remy Sharp"
                    src={`https://carflatf.com/images/s_${picture}`}
                  />
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
                  <Fab 
                    onClick={() =>
                      removeFromCarts(id)
                    } color="secondary" size='small' aria-label="Add" className={classes.fab}>
                    <RemoveIcon />
                  </Fab>
                  <span style={{margin: 8}}>{quantity}</span>
                  <Fab 
                    onClick={() =>
                      addToCarts(id)
                    } color="secondary" size='small' aria-label="Add" className={classes.fab}>
                    <AddIcon />
                  </Fab>
                </ListItemSecondaryAction>
              </ListItem>
            ),
            carts
          )
        }
      </List>
      {/* <AppBar positionFixed style={{bottom: 0}} color="default">
      </AppBar> */}
    </div>
  );
}

export default home;
