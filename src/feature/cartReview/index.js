import React, { useState } from 'react'
import { makeStyles } from '@material-ui/styles'
import {
  Typography,
  AppBar,
  Toolbar,
  IconButton,
  Drawer,
  Badge,
  ListItemIcon,
  ListItemText,
  ListItem,
  Divider,
  List,
  ListItemSecondaryAction,
  Button,
  Fab,
  Grid,
  Paper
} from '@material-ui/core'
import MenuIcon from '@material-ui/icons/Menu'
import {
  ShoppingCart as ShopingCartIcon,
  Mail as MailIcon,
  MoveToInbox as InboxIcon,
  Motorcycle as MotorcycleIcon
} from '@material-ui/icons'

import numeral from 'numeral'
import { map } from 'ramda'
import useCarts from 'component/cart/hook'
import moment from 'moment'
import customStyle from './style'

// import useAuth from '../auth/hook'

const useStyles = makeStyles(customStyle);

function cart({ history }) {
  const classes = useStyles()
  // const [auth] = useAuth(false)
  const [carts, , getCartsAmount, priceCarts, waiting] = useCarts()
  const [drawer, toggleDrawer] = useState(false)

  const onToggleDrawer = status => () => {
    toggleDrawer(status);
  };

  function SideBar() {
    return (
      <div className={classes.list}>
        <List>
          {['Feed', 'Categories', 'Orders', 'Payments'].map((text, index) => (
            <ListItem button key={text}>
              <ListItemIcon>
                {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
              </ListItemIcon>
              <ListItemText primary={text} />
            </ListItem>
          ))}
        </List>
        <Divider />
        <List>
          {['Setting', 'Profile', 'Logout'].map((text, index) => (
            <ListItem button key={text}>
              <ListItemIcon>
                {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
              </ListItemIcon>
              <ListItemText primary={text} />
            </ListItem>
          ))}
        </List>
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
          <SideBar />
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
          <Typography variant="h5" color="inherit" className={classes.grow}>
            Cart Review
          </Typography>
          <div>
            <IconButton color="inherit" onClick={() => history.push('cart')}>
              <Badge badgeContent={getCartsAmount()} color="secondary">
                <ShopingCartIcon />
              </Badge>
            </IconButton>
          </div>
        </Toolbar>
      </AppBar>
      <Grid container style={{marginTop: 80}}>
        <Grid item xs={6} style={{textAlign: 'center'}}>
          <Fab 
            color="secondary" aria-label="Add">
            <MotorcycleIcon />
          </Fab>
        </Grid>
        <Grid item xs={6}>
          <Paper elevation={1} style={{textAlign: 'center', padding: 15}}>
            <Typography variant="h6" component="h6">
              Delivery
            </Typography>
            <Typography component="p">
              {moment().add(waiting, 'mins').format('YYYY-MM-DD hh:mm')}
            </Typography>
          </Paper>
        </Grid>
        <Grid item xs={12}>
          <div elevation={1} style={{textAlign: 'center', padding: 15}}>
            <Typography variant="h6" component="h6">
              Estimated pick-up / Delivery:
            </Typography>
            <Typography component="p">
              {moment().add(waiting, 'mins').format('hh:mm DD/MM/YY')}
            </Typography>
          </div>
        </Grid>
      </Grid>
      <List>
        { map(
            ({ storeName, description, price, picture, id }) => (
              <ListItem key={id} alignItems="flex-start" style={{ borderBottom: 1, borderBottomColor: '#f5f5f5', borderBottomStyle: 'solid' }}>
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
                    </React.Fragment>
                  }
                />
                <ListItemSecondaryAction>
                  <Typography component="span" color="textPrimary">
                    ${numeral(price).format('0,0')}
                  </Typography>
                </ListItemSecondaryAction>
              </ListItem>
            ),
            carts
          )
        }
        <ListItem style={{ display: 'block'}}>
          <Typography component="h3" color="textSecondary" style={{float: 'right', color: '#f50057'}}>
            Total: ${numeral(priceCarts).format('0,0')}
          </Typography>
        </ListItem>
      </List>
      <AppBar position="fixed" style={{bottom: 0, top: 'auto'}} color="default">
        <Toolbar className={classes.toolbar}>
          <Button variant="outlined" color="default">
            Add Payment
          </Button>
          <Button variant="outlined" color="default">
            Confirm
          </Button>
        </Toolbar>
      </AppBar>
    </div>
  );
}

export default cart;
