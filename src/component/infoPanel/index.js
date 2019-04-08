import React from 'react';
import {
  Button,
  Avatar,
  CssBaseline,
  Paper,
  Typography
} from '@material-ui/core';

import {
  CheckCircle as CheckIcon,
  Info as InfoIcon,
  Error as ErrorIcon
} from '@material-ui/icons';
import { withStyles } from '@material-ui/core/styles';
import styles from './style';

const variantIcon = {
  info: InfoIcon,
  success: CheckIcon,
  error: ErrorIcon
};

function RegistrationSuccessfully({
  classes,
  variant,
  title,
  body,
  onClick,
  ButtonText
}) {
  const Icon = variantIcon[variant];
  return (
    <div className={classes.main}>
      <CssBaseline />
      <Paper className={classes.paper}>
        <Avatar className={classes.avatar}>
          <Icon />
        </Avatar>
        <Typography component="h1" variant="h6">
          {title}
        </Typography>
        <Typography variant="body1" gutterBottom>
          {body}
        </Typography>
        <Button
          type="submit"
          variant="contained"
          color="primary"
          className={classes.submit}
          onClick={onClick}
        >
          {ButtonText}
        </Button>
      </Paper>
    </div>
  );
}

export default withStyles(styles)(RegistrationSuccessfully);
