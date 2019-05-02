import React, { useState } from 'react';
import { makeStyles } from '@material-ui/styles';
import {
  Typography,
  AppBar,
  Toolbar,
  IconButton,
  Drawer,
  Badge,
  ListItemText,
  ListItem,
  List,
  ListItemSecondaryAction,
  Button,
  Fab
} from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';
import {
  ShoppingCart as ShopingCartIcon,
  Add as AddIcon,
  Remove as RemoveIcon
} from '@material-ui/icons';

import numeral from 'numeral';
import { propEq, map, findIndex } from 'ramda';
import useCarts from 'component/cart/hook';
import Sidebar from 'component/drawer';
import Header from 'component/header';
import Comment from 'component/commentDialog';
import customStyle from './style';

// import useAuth from '../auth/hook'

const useStyles = makeStyles(customStyle);

function Cart({ history }) {
  const classes = useStyles();
  // const [auth] = useAuth(false)
  const [carts, updateCarts, getCartsAmount, priceCarts] = useCarts();
  const [drawer, toggleDrawer] = useState(false);
  const [commentDialog, setCommentDialog] = useState(false);
  async function addToCarts(id) {
    const withId = propEq('id', id);
    const findIndexInCards = findIndex(withId);
    const indexCart = findIndexInCards(carts);
    if (indexCart === -1) {
      const found = carts.find(item => item.id === id);
      const newCarts = [...carts, { ...found, quantity: 1 }];
      updateCarts(newCarts);
      return;
    }
    const increaseIfExist = idOffer => item => {
      if (item.id === idOffer) {
        return {
          ...item,
          quantity: item.quantity + 1
        };
      }
      return item;
    };
    const increaseIfExistInCards = map(increaseIfExist(id));
    const newCarts = increaseIfExistInCards(carts);
    updateCarts(newCarts);
  }

  function removeFromCarts(id) {
    const reduceIfExist = idOffer => item => {
      if (item.id === idOffer) {
        return {
          ...item,
          quantity: item.quantity - 1
        };
      }
      return item;
    };
    const reduceIfExistInCards = map(reduceIfExist(id));
    const newCarts = reduceIfExistInCards(carts).filter(
      ({ quantity }) => quantity !== 0
    );
    updateCarts(newCarts);
  }

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
      <AppBar position="fixed">
        <Toolbar>
          <IconButton
            onClick={onToggleDrawer(true)}
            className={classes.menuButton}
            color="inherit"
            aria-label="Menu"
          >
            <MenuIcon />
          </IconButton>
          <Header string="Cart" classes={classes} />
          <div>
            <IconButton color="inherit" onClick={() => history.push('cart')}>
              <Badge badgeContent={getCartsAmount()} color="secondary">
                <ShopingCartIcon />
              </Badge>
            </IconButton>
          </div>
        </Toolbar>
      </AppBar>

      <List style={{ marginTop: 80, paddingBottom: 70 }}>
        {map(
          ({ storeName, description, price, picture, id, quantity }) => (
            <ListItem
              key={id}
              alignItems="flex-start"
              style={{
                borderBottom: 1,
                borderBottomColor: '#f5f5f5',
                borderBottomStyle: 'solid'
              }}
            >
              <img
                style={{ width: 100, height: 100, borderRadius: 4 }}
                alt="Remy Sharp"
                src={`http://carflatf.com:7070/images/m_${picture}`}
              />
              <ListItemText
                primary={storeName}
                secondary={
                  <React.Fragment>
                    <Typography component="span" color="textPrimary">
                      {description}
                    </Typography>
                    ${numeral(price).format('0,0')}
                    <Button
                      variant="outlined"
                      style={{ position: 'absolute' }}
                      className={classes.commentBtn}
                      onClick={() => setCommentDialog(true)}
                    >
                      Comment
                    </Button>
                  </React.Fragment>
                }
              />
              <ListItemSecondaryAction>
                <Fab
                  onClick={() => removeFromCarts(id)}
                  color="secondary"
                  size="small"
                  aria-label="Add"
                  className={classes.fab}
                >
                  <RemoveIcon />
                </Fab>
                <span style={{ margin: 8 }}>{quantity}</span>
                <Fab
                  onClick={() => addToCarts(id)}
                  color="secondary"
                  size="small"
                  aria-label="Add"
                  className={classes.fab}
                >
                  <AddIcon />
                </Fab>
              </ListItemSecondaryAction>
            </ListItem>
          ),
          carts
        )}
      </List>
      <AppBar
        position="fixed"
        style={{ bottom: 0, top: 'auto' }}
        color="default"
      >
        <Toolbar className={classes.toolbar}>
          <div>
            <span>Total: $ {numeral(priceCarts).format('0,0')}</span>
          </div>
          <Button
            variant="outlined"
            color="default"
            onClick={() => history.push('cart-review')}
          >
            Order
          </Button>
        </Toolbar>
      </AppBar>
      <Comment
        open={commentDialog}
        handleClose={() => setCommentDialog(false)}
      />
    </div>
  );
}

export default Cart;
