import React from 'react'
import { map } from 'ramda'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemText from '@material-ui/core/ListItemText'
import ListItemAvatar from '@material-ui/core/ListItemAvatar'
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction'
import Avatar from '@material-ui/core/Avatar'
import Typography from '@material-ui/core/Typography'
import IconButton from '@material-ui/core/IconButton'
import AddShoppingCartIcon from '@material-ui/icons/AddShoppingCart'

function restaurantList({restaurants}) {
  return (
    <List>
      {map(({name, address, menu}, index) => (
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
      </ListItem>), restaurants)}
    </List>
  );
}

export default restaurantList;