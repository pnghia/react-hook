import React, { useState, useEffect } from 'react'
import { withStyles } from '@material-ui/core/styles'
import {
  Typography,
  AppBar,
  Toolbar,
  IconButton,
  Drawer,
} from '@material-ui/core'


import MenuIcon from '@material-ui/icons/Menu'
import http from 'service/http'
import CategoriesItem from 'component/categories'
import Sidebar from 'component/drawer'
import useLoading from '../loading/hook'
import styles from './style'

function Categories({ history, classes }) {
  const [, withLoading] = useLoading(false);
  const [drawer, toggleDrawer] = useState(false);
  const [categories, setCategories] = useState([])
  const onToggleDrawer = status => () => {
    toggleDrawer(status);
  };
  const handleOnClickCategory = categoryId => history.push(`/category/${categoryId}`)
  const fetchData = async () => {
    const { data: { data } } = await withLoading(() => http.get({ path: 'lookup', params: { type: 'category' } }));
      setCategories(data)
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className={classes.root}>
      <Drawer open={drawer} onClose={onToggleDrawer(false)}>
        <div
          tabIndex={0}
          role="button"
          onClick={onToggleDrawer(false)}
          onKeyDown={onToggleDrawer(false)}
        >
          <Sidebar history={history} />
        </div>
      </Drawer>
      <AppBar position='fixed'>
        <Toolbar>
          <IconButton
            onClick={onToggleDrawer(true)}
            className={classes.menuButton}
            color="inherit"
            aria-label="Menu"
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" color="inherit" className={classes.grow}>
            Categories
          </Typography>
        </Toolbar>
      </AppBar>
      <CategoriesItem
        data={categories}
        classes={classes}
        handleOnClick={handleOnClickCategory}
      />
    </div>
  );
}

export default withStyles(styles)(Categories)
