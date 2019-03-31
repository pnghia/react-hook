import React from 'react';

import { TextField, FormControl, Button } from '@material-ui/core'
import Joi from 'joi'
import http from 'service/http';
import { reduce } from 'ramda'
import { useForm, useField } from 'react-final-form-hooks'
import AutoSuggestPlace from "component/autoSuggestPlace"
import useLoading from 'feature/loading/hook';
import { withStyles } from '@material-ui/core/styles';
import style from './style'

const schema = Joi.object().keys({
  address: Joi.string().required()
})

const validate = values => {
  return Joi.validate(values, schema, err => {
    if (!err) {
      return {}
    }
    const generateErr = (accumulator, { message, path: [name] }) => {
      return {
        ...accumulator,
        [name]: message
      }
    }
    const error = reduce(generateErr, {}, err.details)
    return error
  })
}


function ChangeUserSettings({ classes }) {
  const [, withLoading] = useLoading(false);
  const onSubmit = async (payload) => {
    // const { lat, lng } = await addressToLatLng(address)
    await withLoading(() =>
      http.post({
        path: 'user', payload
      })
    );
  }
  const { form, handleSubmit, submitting } = useForm({
    onSubmit,
    validate,
    initialValues: {
      terms: false
    }
  })
  const address = useField('address', form)
  const phone = useField('phone', form)
  return (
    <form onSubmit={handleSubmit} className={classes.form}>
      <FormControl margin="normal" required fullWidth>
        <AutoSuggestPlace
          TextField={TextField}
          {...address}
        />
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
  )
}
export default withStyles(style)(ChangeUserSettings)
