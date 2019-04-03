import React from 'react';

import { TextField, FormControl, Button } from '@material-ui/core';
import Joi from 'joi';
import http from 'service/http';
import { reduce } from 'ramda';
import { useForm, useField } from 'react-final-form-hooks';
import AutoSuggestPlace from 'component/autoSuggestPlace';
import { geocodeByAddress, getLatLng } from 'react-places-autocomplete';
import useLoading from 'feature/loading/hook';
import { withStyles } from '@material-ui/core/styles';
import style from './style';

const schema = Joi.object().keys({
  firstName: Joi.string()
    .required()
    .label('First Name'),
  lastName: Joi.string()
    .required()
    .label('Last Name'),
  address: Joi.string().required(),
  phone: Joi.string()
    .required()
    .regex(/^ *\d[\d ]*$/)
    .error(() => 'Invaild Phone number')
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
  const addressToLatLng = async address => {
    const [addresCode] = await geocodeByAddress(address);
    return getLatLng(addresCode);
  };
  const onSubmit = async ({ address, phone, firstName, lastName }) => {
    try {
      const { lat, lng } = await addressToLatLng(address);
      const {
        data: { status }
      } = await withLoading(() =>
        http.put({
          path: 'user',
          payload: {
            address: JSON.stringify({
              formatted_address: address,
              location: { lat, lng },
              firstName,
              lastName
            }),
            phone
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
  const firstName = useField('firstName', form);
  const lastName = useField('lastName', form);
  const address = useField('address', form);
  const phone = useField('phone', form);

  return (
    <form onSubmit={handleSubmit} className={classes.form}>
      <FormControl margin="normal" required fullWidth>
        <TextField {...firstName.input} label="First Name" fullWidth />
        {firstName.meta.touched && firstName.meta.error && (
          <div className={classes.error}>{firstName.meta.error}</div>
        )}
      </FormControl>
      <FormControl margin="normal" required fullWidth>
        <TextField {...lastName.input} label="Last Name" fullWidth />
        {lastName.meta.touched && lastName.meta.error && (
          <div className={classes.error}>{lastName.meta.error}</div>
        )}
      </FormControl>
      <FormControl margin="normal" required fullWidth>
        <AutoSuggestPlace TextField={TextField} {...address} />
      </FormControl>
      <FormControl margin="normal" required fullWidth>
        <TextField {...phone.input} label="Phone number" fullWidth />
        {phone.meta.touched && phone.meta.error && (
          <div className={classes.error}>{phone.meta.error}</div>
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
