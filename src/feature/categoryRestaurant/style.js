const styles = theme => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    overflow: 'hidden',
    backgroundColor: theme.palette.background.paper,
  },
  MuiList: {
    [theme.breakpoints.down('sm')]: {
      marginTop: 29
    },
    [theme.breakpoints.up('sm')]: {
      marginTop: 36
    }
  },
  MuiListItemIcon: {
    marginRight: 0
  },
  MuiListItem: {
    padding: '20px 0'
  },
  media: {
    // ⚠️ object-fit is not supported by IE 11.
    objectFit: 'cover',
  },
});

export default styles;