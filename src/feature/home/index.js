import React from 'react'
import { reduce } from 'ramda'
import Button from '@material-ui/core/Button'
import TextField from '@material-ui/core/TextField'
import Avatar from '@material-ui/core/Avatar'
import CssBaseline from '@material-ui/core/CssBaseline'
import FormControl from '@material-ui/core/FormControl'
import FormControlLabel from '@material-ui/core/FormControlLabel'
import Checkbox from '@material-ui/core/Checkbox'
import LockOutlinedIcon from '@material-ui/icons/LockOutlined'
import Paper from '@material-ui/core/Paper'
import Typography from '@material-ui/core/Typography'
import withStyles from '@material-ui/core/styles/withStyles'
import { useForm, useField } from 'react-final-form-hooks'
import Joi from "joi"
import http from 'service/http'
import { PropagateLoader } from 'react-spinners'
import useLoading from '../loading/hook'
import useAuth from '../auth/hook'


function Login({ classes }) {
  const [ loading, withLoading ] = useLoading(false);
  const [, setAuth] = useAuth(false);
  const onSubmit = async payload => {
    const token = await withLoading(() => http.post({ path: 'login', payload }))
    http.setJwtToken(token)
    setAuth(token)
  }

  const schema = Joi.object().keys({
    password: Joi.string().regex(/^[a-zA-Z0-9]{3,30}$/).required(),
    email: Joi.string().email({ minDomainAtoms: 2 }).required()
  })

  const validate = values => {
    return Joi.validate(values, schema, err => { 
      if(!err) {
        return {}
      }
      const generateErr = (accumulator, { message, path : [name] }) => {
        return {
          ...accumulator,
          [name]: message
        }
      }
      const error = reduce(generateErr, {}, err.details)
      return error
    });
  }

  const { form, handleSubmit, submitting } = useForm({
    onSubmit,
    validate
  })

  const email = useField('email', form)
  const password = useField('password', form)

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
            <TextField
              {...email.input}
              label="Email"
              fullWidth
            />
            {email.meta.touched && email.meta.error && <div className={classes.error}>{email.meta.error}</div>}
          </FormControl>
          <FormControl margin="normal" required fullWidth>
            <TextField
              {...password.input}
              label="Password"
              fullWidth
            />
            {password.meta.touched && password.meta.error && <div className={classes.error}>{password.meta.error}</div>}
          </FormControl>
          <FormControlLabel
            control={<Checkbox value="remember" color="primary" />}
            label="Remember me"
          />
          { loading ? 
            <div style={{display: 'flex', justifyContent: 'center', margin: 15}}>
              <PropagateLoader
                sizeUnit="px"
                size={20}
                color="#f50057"
                loading={loading}
              />
            </div>
            : <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              disabled={submitting}
              className={classes.submit}
            >
              Sign in
            </Button>
          }
        </form>
      </Paper>
    </div>
  )
}

export default withStyles(styles)(Login)