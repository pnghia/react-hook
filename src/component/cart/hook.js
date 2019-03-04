import { useState, useEffect } from "react"
import store from 'store'
import { reduce } from 'ramda'

const CARTS = 'CARTS'

function useCart(initialCarts = store.get(CARTS) || []) {
  const [carts, updateCarts] = useState(initialCarts)

  function getCartsAmount() {
    const sumCartLength = (acc, { quantity }) => acc + quantity 
    return reduce(sumCartLength, 0, carts)
  }
  
  useEffect(
    () => {
      store.set(CARTS, carts)
    },
    [carts]
  )
  return [ carts, updateCarts, getCartsAmount ];
}
export default useCart;