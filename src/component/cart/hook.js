import { useState, useEffect } from "react"
import store from 'store'
import { reduce } from 'ramda'

const CARTS = 'CARTS'

const sumCartPrice = (acc, { price, quantity }) => acc + (price * quantity)
const sumWaitingTime = (acc, {waitingTime}) => acc + waitingTime

function useCart(initialCarts = store.get(CARTS) || []) {
  const [carts, updateCarts] = useState(initialCarts)
  const [price, updatePrice] = useState(0)
  const [waiting, updateWaiting] = useState(0)
  function getCartsAmount() {
    const sumCartLength = (acc, { quantity }) => acc + quantity 
    return reduce(sumCartLength, 0, carts)
  }
  
  useEffect(
    () => {
      store.set(CARTS, carts)
      updatePrice(reduce(sumCartPrice, 0, carts))
      updateWaiting(reduce(sumWaitingTime, 0, carts))
    },
    [carts]
  )
  return [ carts, updateCarts, getCartsAmount, price, waiting ];
}
export default useCart;