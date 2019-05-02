import React from 'react';
import {
  Button,
  Dialog,
  DialogTitle,
  DialogContentText,
  DialogContent,
  DialogActions,
  TextField
} from '@material-ui/core';

function CommentDialog({ open, handleClose }) {
  return (
    <Dialog
      open={open}
      onClose={handleClose}
      aria-labelledby="form-dialog-title"
    >
      <DialogTitle id="form-dialog-title">Comment</DialogTitle>
      <DialogContent>
        <DialogContentText>
          Please leave a comment below
        </DialogContentText>
        <TextField
          margin="normal"
          id="name"
          fullWidth
          multiline
          rowsMax={Infinity}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} color="primary">
          Cancel
        </Button>
        <Button onClick={handleClose} color="primary">
          Save
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default CommentDialog;
