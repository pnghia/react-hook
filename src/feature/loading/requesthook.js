import { useState } from "react"


function useLoading(status) {
  const [loading, setLoading] = useState(status)
  async function withLoading(callback) {
    setLoading(true)
    try {
      const response = await callback()
      setLoading(false)
      return response
    } catch (error) {
      setLoading(false)
      return error
    }
  }
  return [ loading, withLoading ];
}
export default useLoading;