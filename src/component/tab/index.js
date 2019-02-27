import React from 'react'
import Typography from '@material-ui/core/Typography'

export default function ({ children, dir }) {
  return (
    <Typography component="div" dir={dir} style={{ padding: 8 * 3 }}>
      {children}
    </Typography>
  );
}