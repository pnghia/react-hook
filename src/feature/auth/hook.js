import { useState } from "react"


function useAuth() {
  const [auth, setAuth] = useState({})
  return [auth, setAuth];
}
export default useAuth;