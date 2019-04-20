import {
  Button
} from '@material-ui/core'
import http from 'service/http'
import useCarts from 'component/cart/hook'
import React from 'react';
import {CardElement, injectStripe} from 'react-stripe-elements';
import store from 'store'

const AUTH = 'user'

function CheckoutForm(props) {
  const [carts, , , , waiting] = useCarts()
  const { id: userId } = store.get(AUTH)
  const submit = async () => {
    try {
      const { stripe: { createToken } } = props
      const { token } = await createToken();
      const orderDetails = carts.map(({ dishId, quantity, price, discount, comment}) => ({
        dishId, quantity, price, discount, comment
      }))
      http.post({path: 'order', payload: {
        userId,
        storeId: 3,
        pickupTime: waiting,
        orderDate: Date(),
        orderDetails,
        paymentInfo: token.id
      }})
    } catch (error) {
      throw error
    }
  }
  return (
    <div className="checkout">
      <CardElement />
      <Button style={{marginTop: 15}} variant="contained"
        color="primary"
        onClick={submit}>Send</Button>
    </div>
  )
}

export default injectStripe(CheckoutForm);