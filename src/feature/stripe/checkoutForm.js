import {
  Button
} from '@material-ui/core'
import React, {Component} from 'react';
import {CardElement, injectStripe} from 'react-stripe-elements';

class CheckoutForm extends Component {
  constructor(props) {
    super(props);
    this.submit = this.submit.bind(this);
  }

  async submit() {
    // eslint-disable-next-line react/destructuring-assignment
    const {token} = await this.props.stripe.createToken({amount: 500});
    console.log(token);
  }

  render() {
    return (
      <div className="checkout">
        <CardElement />
        <Button style={{marginTop: 15}} variant="contained"
          color="primary"
          onClick={this.submit}>Send</Button>
      </div>
    );
  }
}

export default injectStripe(CheckoutForm);