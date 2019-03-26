import React from 'react';
import { reduce } from 'ramda';
import {
  Button,
  TextField,
  Avatar,
  CssBaseline,
  FormControl,
  FormControlLabel,
  Checkbox,
  Paper,
  Typography
} from '@material-ui/core';
import store from 'store'

import { LockOutlined as LockOutlinedIcon } from '@material-ui/icons';

import { withStyles } from '@material-ui/core/styles';
import { useForm, useField } from 'react-final-form-hooks';
import Joi from 'joi';
import http from 'service/http';
import { PropagateLoader } from 'react-spinners';
import styles from './style';
import useLoading from '../loading/hook';

function Login({ classes, history }) {
  const [loading, withLoading] = useLoading(false);

  const onSubmit = async payload => {
    const { data: { data: { token, user } }} = await withLoading(() =>
      http.post({ path: 'login', payload })
    );
    http.setJwtToken(token.token);
    store.set('token', token)
    store.set('user', user)
    history.goBack()
  };

  const schema = Joi.object().keys({
    password: Joi.string()
      .required(),
    email: Joi.string()
      .email({ minDomainAtoms: 2 })
      .required()
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

  const { form, handleSubmit, submitting } = useForm({
    onSubmit,
    validate
  });

  const email = useField('email', form);
  const password = useField('password', form);

  return (
    <div className={classes.main}>
      <CssBaseline />
      <Paper className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign in
        </Typography>
        <form onSubmit={handleSubmit} className={classes.form}>
          <FormControl margin="normal" required fullWidth>
            <TextField {...email.input} label="Email" fullWidth />
            {email.meta.touched && email.meta.error && (
              <div className={classes.error}>{email.meta.error}</div>
            )}
          </FormControl>
          <FormControl margin="normal" required fullWidth>
            <TextField {...password.input} type='password' label="Password" fullWidth />
            {password.meta.touched && password.meta.error && (
              <div className={classes.error}>{password.meta.error}</div>
            )}
          </FormControl>
          <FormControlLabel
            control={<Checkbox value="remember" color="primary" />}
            label="Remember me"
          />
          {loading ? (
            <div
              style={{ display: 'flex', justifyContent: 'center', margin: 15 }}
            >
              <PropagateLoader
                sizeUnit="px"
                size={20}
                color="#f50057"
                loading={loading}
              />
            </div>
          ) : (
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              disabled={submitting}
              className={classes.submit}
            >
              Sign in
            </Button>
          )}
        </form>
      </Paper>
    </div>
  );
}

export default withStyles(styles)(Login);
