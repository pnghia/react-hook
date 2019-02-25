import { useState } from "react"


function useLoading(status) {
  const [loading, setLoading] = useState(status)
  async function executeLoading(callback) {
    setLoading(true);
    try {
      const response = await callback()
      setLoading(false)
      return response
    } catch (error) {
      // setLoading(false)
      return error
    }
  }
  return [ loading, executeLoading ];
}
export default useLoading;