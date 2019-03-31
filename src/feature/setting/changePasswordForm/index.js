import React from 'react';
import Joi from 'joi';
import { reduce } from 'ramda';
import http from 'service/http';
import { TextField, FormControl, Button } from '@material-ui/core';
import { useForm, useField } from 'react-final-form-hooks';
import { withStyles } from '@material-ui/core/styles';

import useLoading from 'feature/loading/hook';
import style from './style';

const schema = Joi.object().keys({
  currentPwd: Joi.string().required(),
  password: Joi.string().required(),
  confirmPassword: Joi.any()
    .required()
    .valid(Joi.ref('password'))
    .error(() => 'Password does not match')
});

const validate = values => {
  return Joi.validate(values, schema, err => {
    if (!err) {
      return {};
    }
    const generateErr = (accumulator, { message, path: [name] }) => {
      return {
        ...accumulator,
        [name]: message
      };
    };
    const error = reduce(generateErr, {}, err.details);
    return error;
  });
};

function ChangeUserSettings({
  classes,
  toggleSnackbarSuccess,
  toggleSnackbarError,
  snackbarErrorMessage
}) {
  const [, withLoading] = useLoading(false);
  const onSubmit = async ({ currentPwd, confirmPassword }) => {
    try {
      const {
        data: { status }
      } = await withLoading(() =>
        http.put({
          path: 'auth/password',
          payload: {
            currentPassword: currentPwd,
            newPassword: confirmPassword
          }
        })
      );
      if (status === 'success') {
        toggleSnackbarSuccess(true);
      }
    } catch (error) {
      snackbarErrorMessage(error.message);
      toggleSnackbarError(true);
    }
  };
  const { form, handleSubmit, submitting } = useForm({
    onSubmit,
    validate
  });
  const currentPwd = useField('currentPwd', form);
  const password = useField('password', form);
  const confirmPassword = useField('confirmPassword', form);

  return (
    <form onSubmit={handleSubmit} className={classes.form}>
      <FormControl margin="normal" required fullWidth>
        <TextField
          {...currentPwd.input}
          label="Current Password"
          fullWidth
          type="password"
        />
        {currentPwd.meta.touched && currentPwd.meta.error && (
          <div className={classes.error}>{currentPwd.meta.error}</div>
        )}
      </FormControl>
      <FormControl margin="normal" required fullWidth>
        <TextField
          {...password.input}
          label="New Password"
          fullWidth
          type="password"
        />
        {password.meta.touched && password.meta.error && (
          <div className={classes.error}>{password.meta.error}</div>
        )}
      </FormControl>
      <FormControl margin="normal" required fullWidth>
        <TextField
          {...confirmPassword.input}
          label="Repeat New Password"
          fullWidth
          type="password"
        />
        {confirmPassword.meta.touched && confirmPassword.meta.error && (
          <div className={classes.error}>{confirmPassword.meta.error}</div>
        )}
      </FormControl>
      <Button
        type="submit"
        fullWidth
        variant="contained"
        color="primary"
        disabled={submitting}
        className={classes.submit}
      >
        Save Changes
      </Button>
    </form>
  );
}
export default withStyles(style)(ChangeUserSettings);
