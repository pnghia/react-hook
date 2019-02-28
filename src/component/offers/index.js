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
import numeral from 'numeral'


function offerList({offers, updateCarts, carts}) {
  return (
    <List>
      {map(({storeName, description, price, picture, id}) => (
      <ListItem key={id} alignItems="flex-start">
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
          <IconButton onClick={() => updateCarts([...carts,
            {storeName, description, price, picture, id}
          ])} aria-label="Comments">
            <AddShoppingCartIcon />
          </IconButton>
        </ListItemSecondaryAction>
      </ListItem>), offers)}
    </List>
  );
}

export default offerList;