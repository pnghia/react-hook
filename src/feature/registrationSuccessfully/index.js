import React from 'react';
import {
  Button,
  Avatar,
  CssBaseline,
  Paper,
  Typography
} from '@material-ui/core';

import { CheckCircle } from '@material-ui/icons';
import { withStyles } from '@material-ui/core/styles';
import styles from './style';

function RegistrationSuccessfully({ classes, history }) {
  return (
    <div className={classes.main}>
      <CssBaseline />
      <Paper className={classes.paper}>
        <Avatar className={classes.avatar}>
          <CheckCircle />
        </Avatar>
        <Typography component="h1" variant="h6">
          Registration successfully
        </Typography>
        <Typography variant="body1" gutterBottom>
          Please check your registered email for email verification
        </Typography>
        <Button
              type="submit"
              variant="contained"
              color="primary"
              className={classes.submit}
              onClick={() => history.push('/login')}
            >
              Ok
            </Button>
      </Paper>
    </div>
  );
}

export default withStyles(styles)(RegistrationSuccessfully);
