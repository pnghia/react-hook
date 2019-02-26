import { useState, useEffect } from "react"
import http from 'service/http'

function useFetch(path) {
  const [data, setDataState] = useState(null)
  const [loading, setLoadingState] = useState(true)
  useEffect(
    () => {
      setLoadingState(true)
      http.get({ path })
        .then(response => {
          setDataState(response)
          setLoadingState(false)
        })
    },
    [path]
  )
  return { data, loading }
}

export default useFetch