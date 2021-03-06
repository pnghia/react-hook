import { useState } from "react"

const ApiException = (message, status) => ({ message, status })

function useLoading(status) {
  const [loading, setLoading] = useState(status)
  async function withLoading(callback) {
    setLoading(true)
    try {
      const response = await callback()
      setLoading(false)
      return response
    } catch (error) {
      const { response: { data: { message, status: errorCode } } } = error
      setLoading(false)
      throw new ApiException(message, errorCode)
    }
  }
  return [loading, withLoading];
}
export default useLoading;