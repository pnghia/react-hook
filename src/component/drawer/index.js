import React from 'react'
import {
  List,
  Divider,
  ListItem,
  ListItemIcon,
  ListItemText
} from '@material-ui/core'

import { map } from 'ramda'
import { PermIdentity, Category, RssFeed, PlaylistAddCheck, Payment, Notifications, SentimentDissatisfied } from '@material-ui/icons'

const topSidebar = [
  {
    title: 'Feed',
    route: 'feed',
    icon: <RssFeed />
  },
  {
    title: 'Categories',
    route: 'categories',
    icon: <Category />
  },
  {
    title: 'Orders',
    route: 'orders',
    icon: <PlaylistAddCheck />
  },
  {
    title: 'Payments',
    route: 'payments',
    icon: <Payment />
  }
]

const bottomSidebar = [
  {
    title: 'Setting',
    route: 'setting',
    icon: <Notifications />
  },
  {
    title: 'Profile',
    route: 'profile',
    icon: <PermIdentity />
  },
  {
    title: 'Logout',
    route: 'orders',
    icon: <SentimentDissatisfied />
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
      </List>
    </div>
  );
}

export default sideList;
