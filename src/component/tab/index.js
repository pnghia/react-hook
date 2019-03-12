import React from 'react';
import { Typography } from '@material-ui/core';

export default function({ children, dir }) {
  return (
    <Typography component="div" dir={dir} style={{marginTop: 100}}>
      {children}
    </Typography>
  );
}
