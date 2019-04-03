import React from 'react'
import {
  List,
  Divider,
  ListItem,
  ListItemIcon,
  ListItemText
} from '@material-ui/core'
import store from 'store'

import { map } from 'ramda'
import { Category, RssFeed, PlaylistAddCheck, Payment, Notifications, SentimentDissatisfied } from '@material-ui/icons'

const topSidebar = [
  {
    title: 'Feed',
    route: '/',
    icon: <RssFeed />
  },
  {
    title: 'Categories',
    route: '/categories',
    icon: <Category />
  },
  {
    title: 'Orders',
    route: '/cart',
    icon: <PlaylistAddCheck />
  },
  {
    title: 'Payments',
    route: '/cart-review',
    icon: <Payment />
  }
]

const bottomSidebar = [
  {
    title: 'Setting',
    route: 'setting',
    icon: <Notifications />
  }
]

function sideList({ history }) {
  return (
    <div>
      <List>
        {map(({ title, route, icon }) => (
          <ListItem button key={title} onClick={() => history.push(route)}>
            <ListItemIcon>
              {icon}
            </ListItemIcon>
            <ListItemText primary={title} />
          </ListItem>
        ), topSidebar)}
      </List>
      <Divider />
      <List>
        {map(({ title, route, icon }) => (
          <ListItem button key={title} onClick={() => history.push(route)}>
            <ListItemIcon>
              {icon}
            </ListItemIcon>
            <ListItemText primary={title} />
          </ListItem>
        ), bottomSidebar)}
        <ListItem button onClick={() => { history.push('/'); store.clearAll()}}>
          <ListItemIcon>
            <SentimentDissatisfied />
          </ListItemIcon>
          <ListItemText primary="Log out" />
        </ListItem>
      </List>
    </div>
  );
}

export default sideList;
