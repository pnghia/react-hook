import React from 'react'
import { map } from 'ramda'
import {
  List,
  ListItem,
  ListItemText,
  ListItemSecondaryAction,
  Typography,
  Fab
} from '@material-ui/core'
import { AddShoppingCart as AddShoppingCartIcon } from '@material-ui/icons'
import numeral from 'numeral'

function offerList({ offers, addToCarts }) {
  return (
    <List>
      {(offers && offers.length) ? map(
        ({ description, price, picture, id }) => (
          <ListItem key={id} alignItems="flex-start" style={{ borderBottom: 1, borderBottomColor: '#f5f5f5', borderBottomStyle: 'solid' }}>
            <img
              style={{ width: 100, height: 100, borderRadius: 4 }}
              alt="Remy Sharp"
              src={`http://carflatf.com:7070/images/m_${picture}`}
            />
            <ListItemText
              primary={
                <React.Fragment>
                  <Typography component="span" color="textPrimary" style={{fontSize: 17, fontWeight: 'bold'}}>
                    {description}
                  </Typography>
                  <Typography component="span" style={{fontWeight: 'bold'}}>
                    ${numeral(price).format('0,0')}
                  </Typography>
                </React.Fragment>
              }
            />
            <ListItemSecondaryAction>
              <Fab 
                onClick={() =>
                  addToCarts(id)
                } color="secondary" size='small' aria-label="Add" >
                <AddShoppingCartIcon />
              </Fab>
            </ListItemSecondaryAction>
          </ListItem>
        ),
        offers
      ) : null}
    </List>
  );
}

export default offerList;
