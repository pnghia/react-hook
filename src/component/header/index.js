import React from 'react';
import { Typography } from '@material-ui/core';

export default function({ string, classes }) {
  return (
    <Typography variant="h6" color="inherit" className={classes.grow}>
        {string}
    </Typography>
  );
}
