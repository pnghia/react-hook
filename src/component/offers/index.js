import React from 'react'
import { map } from 'ramda'
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
import numeral from 'numeral'

function offerList({ offers, addToCarts }) {
  return (
    <List>
      {map(
        ({ storeName, description, price, picture, id }) => (
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
              <IconButton
                onClick={() =>
                  addToCarts(id)
                }
                aria-label="Comments"
              >
                <AddShoppingCartIcon />
              </IconButton>
            </ListItemSecondaryAction>
          </ListItem>
        ),
        offers
      )}
    </List>
  );
}

export default offerList;
