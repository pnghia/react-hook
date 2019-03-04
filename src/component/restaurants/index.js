/* eslint-disable react/no-array-index-key */
import React from 'react'
import {
  List,
  ListItem,
  ListItemText,
  ListItemAvatar,
  ListItemSecondaryAction,
  Avatar,
  Typography,
  IconButton
} from '@material-ui/core'

import { AddShoppingCart as AddShoppingCartIcon } from '@material-ui/icons'

function restaurantList({ restaurants }) {
  return (
    <List>
      {restaurants.map(({name, address, menu}, index) => (
      <ListItem key={index} alignItems="flex-start">
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
  );
}

export default restaurantList;
