const styles = theme => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    overflow: 'hidden',
    backgroundColor: theme.palette.background.paper,
  },
  MuiGrid: {
    [theme.breakpoints.down('sm')]: {
      margin: '55px 0px 0px 0px'
    },
    [theme.breakpoints.up('sm')]: {
      marginTop: 63
    }
  }
});

export default styles;