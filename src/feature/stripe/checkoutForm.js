import {
  Button
} from '@material-ui/core'
import http from 'service/http'
import useCarts from 'component/cart/hook'
import React from 'react';
import {CardElement, injectStripe} from 'react-stripe-elements';
import store from 'store'
import useDialog from '../dialog/hook'

const AUTH = 'user'

function CheckoutForm(props) {
  const [carts, updateCarts, , , waiting] = useCarts()
  const [ErrorDialog, showDialogErrorWithMessage] = useDialog({
    title: 'Payment Error',
    btnLabel: 'Got it',
    type: 'error'
  })
  const [Dialog, showDialogWithMessage] = useDialog({
    title: 'Payment',
    btnLabel: 'Got it',
  })
  const { id: userId } = store.get(AUTH)
  const submit = async () => {
    try {
      const { stripe: { createToken } } = props
      const { token } = await createToken();
      const orderDetails = carts.map(({ dishId, quantity, price, discount, comment}) => ({
        dishId, quantity, price, discount, comment
      }))
      await http.post({path: 'order', payload: {
        userId,
        storeId: 50,
        pickupTime: waiting,
        orderDate: Date(),
        orderDetails,
        paymentInfo: token.id
      }})
      showDialogWithMessage('payment successful')
      updateCarts([])
      setTimeout(() => {
        props.history.push('/home')
      }, 2000); 
    } catch (error) {
      showDialogErrorWithMessage(error.message)
    }
  }
  return (
    <div className="checkout">
      <ErrorDialog />
      <Dialog />
      <CardElement />
      <Button style={{marginTop: 15}} variant="contained"
        color="primary"
        onClick={submit}>Send</Button>
    </div>
  )
}

export default injectStripe(CheckoutForm);
