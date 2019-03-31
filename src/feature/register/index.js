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
  Typography,
} from '@material-ui/core';

import { PersonAdd } from '@material-ui/icons';
import { withStyles } from '@material-ui/core/styles';
import { useForm, useField } from 'react-final-form-hooks';
import Joi from 'joi';
import http from 'service/http';
import { PropagateLoader } from 'react-spinners';
import { geocodeByAddress, getLatLng } from 'react-places-autocomplete'
import AutoSuggestPlace from 'component/autoSuggestPlace';
import useLoading from '../loading/hook';
import styles from './style';

function Register({ classes, history }) {
  const [loading, withLoading] = useLoading(false);

  const addressToLatLng = async address => {
    const [addresCode] = await geocodeByAddress(address)
    return getLatLng(addresCode)
  }

  const onSubmit = async ({ address, ...restPayload }) => {
    const { lat, lng } = await addressToLatLng(address)
    await withLoading(() =>
      http.post({
        path: 'user', payload: {
          ...restPayload,
          address: JSON.stringify({ formatted_address: address, location: { lat, lng } }),
          roleId: 3
        }
      })
    );
    history.goBack()
  };
  const errorMessageHandler = ([err]) => {
    if (err.type === 'any.required') {
      return 'This field is required'
    }
    if (err.type === 'any.empty') {
      return 'This field is required'
    }
    if (err.type === 'string.min') {
      return `Value should have at least ${err.context.limit} characters!`
    }
    if (err.type === 'string.max') {
      return `Value should have at most ${err.context.limit} characters!`
    }
    return 'Unknow Error'
  }
  const schema = Joi.object().keys({
    firstName: Joi.string().required().error(errorMessageHandler),
    lastName: Joi.string().required().error(errorMessageHandler),
    address: Joi.string().required().error(errorMessageHandler),
    confirmPassword: Joi.any().required().valid(Joi.ref('password')).error(() => 'Password does not match'),
    password: Joi.string()
      .min(3)
      .max(30)
      .required()
      .error(errorMessageHandler),
    email: Joi.string()
      .email({ minDomainAtoms: 2 })
      .required(),
    phone: Joi.string()
      .required()
      .regex(/^ *\d[\d ]*$/)
      .error(errorMessageHandler),
    terms: Joi.equal(true).error(() => 'You must accept the terms and conditions')
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
    validate,
    initialValues: {
      terms: false
    }
  });
  const email = useField('email', form);
  const password = useField('password', form);
  const confirmPassword = useField('confirmPassword', form)
  const firstName = useField('firstName', form)
  const lastName = useField('lastName', form)
  const phone = useField('phone', form)
  const address = useField('address', form)
  const terms = useField('terms', form)
  return (
    <div className={classes.main}>
      <CssBaseline />
      <Paper className={classes.paper}>
        <Avatar className={classes.avatar}>
          <PersonAdd />
        </Avatar>
        <Typography component="h1" variant="h5">
          Register
        </Typography>
        <form onSubmit={handleSubmit} className={classes.form}>
          <FormControl margin="normal" required fullWidth>
            <TextField {...firstName.input} label="First Name" fullWidth />
            {firstName.meta.touched && firstName.meta.error && <div className={classes.error}>{firstName.meta.error}</div>}
          </FormControl>
          <FormControl margin="normal" required fullWidth>
            <TextField {...lastName.input} label="Last Name" fullWidth />
            {lastName.meta.touched && lastName.meta.error && <div className={classes.error}>{lastName.meta.error}</div>}
          </FormControl>
          <FormControl margin="normal" required fullWidth>
            <TextField {...phone.input} label="Phone number" fullWidth />
            {phone.meta.touched && phone.meta.error && <div className={classes.error}>{phone.meta.error}</div>}
          </FormControl>
          <FormControl margin="normal" required fullWidth>
            <AutoSuggestPlace
              TextField={TextField}
              {...address}
            />
            {address.meta.touched && address.meta.error && (
              <div className={classes.error}>{address.meta.error}</div>
            )}
          </FormControl>
          <FormControl margin="normal" required fullWidth>
            <TextField {...email.input} label="Email" fullWidth />
            {email.meta.touched && email.meta.error && (
              <div className={classes.error}>{email.meta.error}</div>
            )}
          </FormControl>
          <FormControl margin="normal" required fullWidth>
            <TextField type="password" {...password.input} label="Password" fullWidth />
            {password.meta.touched && password.meta.error && (
              <div className={classes.error}>{password.meta.error}</div>
            )}
          </FormControl>
          <FormControl margin="normal" required fullWidth>
            <TextField type="password" {...confirmPassword.input} label="Confirm Password" fullWidth />
            {confirmPassword.meta.touched && confirmPassword.meta.error && (
              <div className={classes.error}>{confirmPassword.meta.error}</div>
            )}
          </FormControl>
          <FormControlLabel
            checked={terms.input.value}
            control={<Checkbox color="primary" />}
            label="Terms & Policy"
            onChange={() => terms.input.onChange({ target: { value: !terms.input.value } })}
          />
          {terms.meta.touched && terms.meta.error && (
            <div className={classes.error}>{terms.meta.error}</div>
          )}
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
                Register Eater
            </Button>
            )}
            <Button
                fullWidth
                variant="outlined"
                color="secondary"
                className={classes.toLogin}
                disabled={submitting}
                onClick={() => history.push('/login')}
              >
                To Login Page
            </Button>
        </form>
      </Paper>
    </div>
  );
}

export default withStyles(styles)(Register);
