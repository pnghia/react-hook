import React from 'react'
import Button from '@material-ui/core/Button'
import Dialog from '@material-ui/core/Dialog'
import DialogActions from '@material-ui/core/DialogActions'
import DialogContent from '@material-ui/core/DialogContent'
import DialogContentText from '@material-ui/core/DialogContentText'
import DialogTitle from '@material-ui/core/DialogTitle'
import './style.css'

function ResponsiveDialog(props) {
  const { message, title, btnLabel, type } = props
  const [options, upadteOptions] = React.useState({message, title, btnLabel})

  function showWithMessage(msg, callback) {
    upadteOptions({
      ...options,
      message: msg,
      callback
    })
  }

  function showWithConfig(configs, callback) {
    upadteOptions({
      ...options,
      ...configs,
      callback
    })
  }

  const [open, setOpen] = React.useState(false)

  function handleClose() {
    setOpen(false)
  }

  React.useEffect(() => {
    const opened = options.message && options.message.length
    setOpen(opened)
  }, [options])

  return [() =>
    <div>
      <Dialog
        open={Boolean(open)}
        onClose={handleClose}
        aria-labelledby="responsive-dialog-title"
      >
        <DialogTitle className={type === 'error' ? 'error' : 'success'} id="responsive-dialog-title">{title}</DialogTitle>
        <DialogContent>
          <DialogContentText>
            {options.message}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={options.callback || handleClose} color="primary" autoFocus>
            {btnLabel || 'AGREE'}
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  ,
  showWithMessage, showWithConfig]
}

export default ResponsiveDialog