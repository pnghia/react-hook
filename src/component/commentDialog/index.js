import React, { useEffect } from 'react';
import {
  Button,
  Dialog,
  DialogTitle,
  DialogContentText,
  DialogContent,
  DialogActions,
  TextField
} from '@material-ui/core';
import { useForm, useField, useFormState } from 'react-final-form-hooks';

function ResetOnSubmitSuccess({ form }) {
  const state = useFormState(form, { submitSucceeded: true });

  useEffect(() => {
    if (state.submitSucceeded) form.reset();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [state.submitSucceeded]);

  return null;
}

function CommentDialog({ open, handleClose, onSubmit, comment }) {
  const { form, handleSubmit, submitting } = useForm({
    onSubmit,
    initialValues: {
      comment
    }
  });
  const commentField = useField('comment', form);

  return (
    <form onSubmit={handleSubmit} id="comment-form">
    <ResetOnSubmitSuccess form={form} />
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle id="form-dialog-title">Comment</DialogTitle>
        <DialogContent>
          <DialogContentText>Please leave a comment below</DialogContentText>
          <TextField
            margin="normal"
            id="comment"
            fullWidth
            multiline
            rowsMax={Infinity}
            {...commentField.input}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button
            onClick={handleClose}
            color="primary"
            type="submit"
            disabled={submitting}
            form="comment-form"
          >
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </form>
  );
}

export default CommentDialog;
