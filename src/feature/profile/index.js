/* eslint-disable react/no-array-index-key */
import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/styles';
import {
  Typography,
  AppBar,
  Toolbar,
  IconButton,
  Drawer,
  Tabs,
  Tab,
  Card,
  CardContent,
  CardMedia
} from '@material-ui/core';

import { Menu as MenuIcon, PermIdentity } from '@material-ui/icons';

import { map, isEmpty, findIndex, propEq } from 'ramda';

import http from 'service/http';
import Sidebar from 'component/drawer';
import useCarts from 'component/cart/hook';
import Offers from 'component/offers';
import Snackbar from 'component/snackbar';
import useLoading from '../loading/hook';
import customStyle from './style';

const useStyles = makeStyles(customStyle);

function Profile({
  history,
  match: {
    params: { storeId }
  }
}) {
  const classes = useStyles();
  const [offers, updateOffers] = useState([]);
  const [profile, updateProfile] = useState({});
  const [menus, updatemenus] = useState([]);
  const [, withLoading] = useLoading(false);
  const [tabSelected, updateTabSelected] = useState(0);
  const [drawer, toggleDrawer] = useState(false);
  const [warningSnackbar, setWarningSnackbar] = useState(false);
  const [carts, updateCarts] = useCarts();

  async function addToCarts(id) {
    const withId = propEq('id', id);
    const findIndexInCards = findIndex(withId);
    const indexCart = findIndexInCards(carts);
    if (indexCart === -1) {
      const found = offers.find(item => item.id === id);
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

  function handleChangeTab(event, newValue) {
    updateTabSelected(newValue);
  }

  const onToggleDrawer = status => () => {
    toggleDrawer(status);
  };

  const fetchData = async () => {
    const [
      {
        data: { data: profileResp }
      },
      {
        data: { data: offersResp }
      },
      {
        data: { data: menuResp }
      }
    ] = await withLoading(() =>
      Promise.all([
        http.get({ path: 'store' }),
        http.get({ path: 'offer' }),
        http.get({ path: 'store/menu', params: { storeId } })
      ])
    );
    const tasks = map(
      ({ id }) => http.get({ path: `dish?menuId=${id}` }),
      menuResp
    );
    const dishs = await withLoading(() => Promise.all(tasks));
    const menuNormalize = menuResp
      .map((item, index) => {
        const dish = dishs[index];
        return {
          ...item,
          dish
        };
      })
      .filter(({ dish }) => dish);
    const allData = [profileResp, offersResp, menuNormalize];
    const allDataAvailable = allData.every(i => Array.isArray(i) && i.length);
    if (!allDataAvailable) {
      setWarningSnackbar(true);
    } else {
      updateProfile(profileResp);
      updateOffers(offersResp);
      updatemenus(menuNormalize);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const renderData = () => {
    if (!isEmpty(profile)) {
      const { name, address, menu } = profile;
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
              <Typography variant="h6" color="inherit" className={classes.grow}>
                Profile
              </Typography>
              <div>
                <IconButton color="inherit">
                  <PermIdentity />
                </IconButton>
              </div>
            </Toolbar>
          </AppBar>
          <Card
            className={classes.card}
            style={{ marginTop: 56, borderRadius: 0 }}
          >
            <div className={classes.details}>
              <CardContent className={classes.content}>
                <Typography component="p" variant="title">
                  <span style={{ fontWeight: 'bold' }}>{name}</span>
                </Typography>
                <Typography variant="subtitle1" color="textSecondary">
                  {address.formatted_address}
                </Typography>
              </CardContent>
            </div>
            <CardMedia
              className={classes.cover}
              style={{ width: 160 }}
              image={`http://carflatf.com:7070/images/m_${menu}`}
              title="Live from space album cover"
            />
          </Card>
          <Tabs
            value={tabSelected}
            onChange={handleChangeTab}
            indicatorColor="primary"
            textColor="primary"
            variant="scrollable"
          >
            <Tab label="OFFER" />
            {menus.map(({ id, name: tabName }) => (
              <Tab key={id} label={tabName} />
            ))}
          </Tabs>
          <Typography component="div">
            <Offers offers={offers} addToCarts={addToCarts} />
          </Typography>
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
            <Typography variant="h6" color="inherit" className={classes.grow}>
              Profile
            </Typography>
            <div>
              <IconButton color="inherit">
                <PermIdentity />
              </IconButton>
            </div>
          </Toolbar>
        </AppBar>
        <Snackbar.warning
          isOpen={warningSnackbar}
          handleClose={() => setWarningSnackbar(false)}
        />
      </div>
    );
  };

  return renderData();
}

export default Profile;