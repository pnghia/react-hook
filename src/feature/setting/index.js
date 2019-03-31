import React, {useState} from 'react';

import { withStyles } from '@material-ui/core/styles';
import {
  Typography,
  AppBar,
  Toolbar,
  IconButton,
  Grid,
  ExpansionPanel,
  ExpansionPanelSummary,
  ExpansionPanelDetails,
  // Snackbar,
  // Button
} from '@material-ui/core';
import { ArrowBack, ExpandMore } from '@material-ui/icons';
import Snackbar from 'component/snackbar'
import UserSettingForm from './settingUserForm';
import ChangePasswordForm from './changePasswordForm';
import styles from './style';

function Setting({ history, classes }) {
  const [snackbarSuccess, setSnackbarSuccess] = useState(false)
  const [snackbarError, setSnackbarError] = useState(false)
  const [snackbarErrorMessage, setSnackbarErrorMessage] = useState('')
  return (
    <div className={classes.root}>
      <AppBar position="fixed">
        <Toolbar>
          <IconButton
            onClick={() => history.goBack()}
            className={classes.menuButton}
            color="inherit"
            aria-label="Back"
          >
            <ArrowBack />
          </IconButton>
          <Typography variant="h6" color="inherit" className={classes.grow}>
            Settings
          </Typography>
        </Toolbar>
      </AppBar>
      <Grid container className={classes.MuiGrid} spacing={0}>
        <Grid item xs={12}>
          <ExpansionPanel>
            <ExpansionPanelSummary expandIcon={<ExpandMore />}>
              <Typography className={classes.heading}>
                Change User Settings
              </Typography>
            </ExpansionPanelSummary>
            <ExpansionPanelDetails>
              <UserSettingForm />
            </ExpansionPanelDetails>
          </ExpansionPanel>
          <ExpansionPanel>
            <ExpansionPanelSummary expandIcon={<ExpandMore />}>
              <Typography className={classes.heading}>
                Change Password
              </Typography>
            </ExpansionPanelSummary>
            <ExpansionPanelDetails>
              <ChangePasswordForm 
                toggleSnackbarSuccess={setSnackbarSuccess}
                toggleSnackbarError={setSnackbarError}
                snackbarErrorMessage={setSnackbarErrorMessage}
              />
            </ExpansionPanelDetails>
          </ExpansionPanel>
        </Grid>
      </Grid>
      <Snackbar.success
        isOpen={snackbarSuccess}
        handleClose={() => setSnackbarSuccess(false)}
      />
      <Snackbar.error
        isOpen={snackbarError}
        handleClose={() => setSnackbarError(false)}
        message={snackbarErrorMessage}
      />
    </div>
  );
}

export default withStyles(styles)(Setting);
