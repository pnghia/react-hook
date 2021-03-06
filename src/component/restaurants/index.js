/* eslint-disable react/no-array-index-key */
import React from 'react'
import {
  List,
  ListItem,
  ListItemText,
  ListItemAvatar,
  Avatar,
  Typography
} from '@material-ui/core'

function restaurantList({ restaurants, history }) {
  return (
    <List>
      {restaurants.map(({name, address, menu, id}, index) => (
      <ListItem key={index} alignItems="flex-start" onClick={() => history.push(`profile/${id}`)}>
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
  );
}

export default restaurantList;
