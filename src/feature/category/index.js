/* eslint-disable react/no-array-index-key */
import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/styles';
import {
  Typography,
  AppBar,
  Toolbar,
  IconButton,
  Drawer,
  List,
  ListItem,
  ListItemText,
  ListItemAvatar,
  Avatar,
} from '@material-ui/core';
import TabContainer from 'component/tab'
import { Menu as MenuIcon, PermIdentity } from '@material-ui/icons';
import http from 'service/http';
import Sidebar from 'component/drawer';
import useLoading from '../loading/hook';
import customStyle from './style';


const useStyles = makeStyles(customStyle);

function Profile({
  history,
  match: {
    params: { categoryId }
  }
}) {
  const classes = useStyles();
  const [resList, updateresList] = useState([]);
  const [, withLoading] = useLoading(false);
  const [drawer, toggleDrawer] = useState(false);


  const onToggleDrawer = status => () => {
    toggleDrawer(status);
  };

  const fetchData = async () => {
    const {
        data: { data: resResp }
    } = await withLoading(() => http.get({ path: `store/search?CategoryId=${categoryId}` }));
    
    updateresList(resResp);
  };

  useEffect(() => {
    fetchData();
  }, []);

  const renderData = () => {
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
              CATEGORY
            </Typography>
          </Toolbar>
        </AppBar>
        <TabContainer style={{marginTop: 100}}>
          <List>
            {resList.map(({name, address, menu}, index) => (
            <ListItem key={index} alignItems="flex-start">
              <ListItemAvatar>
                <Avatar alt="Remy Sharp" src={`https://carflatf.com/images/s_${menu}`} />
              </ListItemAvatar>
              <ListItemText
                primary={name}
                secondary={
                  <React.Fragment>
                    <Typography component="span" color="textPrimary">
                      {address ? address.formatted_address : 'fuckkkk'}
                    </Typography>
                  </React.Fragment>
                }
              />
            </ListItem>))}
          </List>
        </TabContainer>
      </div>
    );
  };

  return renderData();
}

export default Profile;