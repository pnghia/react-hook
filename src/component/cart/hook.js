import { useState, useEffect } from "react"
import store from 'store'

const CARTS = 'CARTS'

function useCart(initialCarts = store.get(CARTS)) {
  const cartsDefault = initialCarts || []
  const [carts, updateCarts] = useState(cartsDefault)
  useEffect(
    () => {
      store.set(CARTS, carts)
    },
    [carts]
  )
  return [ carts, updateCarts ];
}
export default useCart;