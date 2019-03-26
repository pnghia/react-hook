import React, { useState, useEffect } from 'react';
import { withStyles } from '@material-ui/core/styles';
import {
  Typography,
  AppBar,
  Toolbar,
  IconButton,
  ListItem,
  List,
  Card,
  CardActionArea,
  ListItemIcon,
  CardContent,
  CardMedia,
  ListItemText
} from '@material-ui/core';

import {
  ArrowBack,
  LocationOn,
  RestaurantMenu,
  Phone
} from '@material-ui/icons';
import http from 'service/http';
import useLoading from '../loading/hook';
import styles from './style';

const categoryRestaurantToString = arr => arr.map(({name}) => name).toString()

function CategoryRestaurant({
  history,
  classes,
  match: {
    params: { id, categoryName }
  }
}) {
  const [, withLoading] = useLoading(false);
  const [restaurants, setRestaurants] = useState([]);

  const fetchData = async () => {
    const {
      data: { data }
    } = await withLoading(() =>
      http.get({ path: 'store/search', params: { categoryId: id } })
    );
    if(data) {
      setRestaurants(data)
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className={classes.root}>
      <AppBar position="fixed">
        <Toolbar>
          <IconButton
            onClick={() => history.goBack()}
            className={classes.menuButton}
            color="inherit"
            aria-label="Back"
          >
            <ArrowBack />
          </IconButton>
          <Typography variant="h6" color="inherit" className={classes.grow}>
            {categoryName}
          </Typography>
        </Toolbar>
      </AppBar>
      <List className={classes.MuiList}>
        {restaurants.map(
          ({
            address = '',
            category = '',
            menu: imgURL,
            name = '',
            phone = ''
          }) => (
            <ListItem className={classes.MuiListItem} key={name}>
              <Card className={classes.card}>
                <CardActionArea>
                  <CardMedia
                    component="img"
                    alt="Contemplative Reptile"
                    className={classes.media}
                    height="auto"
                    image={`https://carflatf.com/images/s_${imgURL}`}
                    title="Contemplative Reptile"
                  />
                  <CardContent>
                    <Typography gutterBottom variant="h5" component="h2">
                      {name}
                    </Typography>
                    <ListItem key={`${name}-category`}>
                      <ListItemIcon className={classes.MuiListItemIcon}>
                        <RestaurantMenu />
                      </ListItemIcon>
                      <ListItemText primary={`${categoryRestaurantToString(category)}`} />
                    </ListItem>
                    <ListItem key={`${name}-location`}>
                      <ListItemIcon className={classes.MuiListItemIcon}>
                        <LocationOn />
                      </ListItemIcon>
                      <ListItemText primary={`${address}`} />
                    </ListItem>
                    <ListItem key={`${name}-phone`}>
                      <ListItemIcon className={classes.MuiListItemIcon}>
                        <Phone />
                      </ListItemIcon>
                      <ListItemText primary={`${phone}`} />
                    </ListItem>
                  </CardContent>
                </CardActionArea>
              </Card>
            </ListItem>
          )
        )}
      </List>
    </div>
  );
}

export default withStyles(styles)(CategoryRestaurant);
