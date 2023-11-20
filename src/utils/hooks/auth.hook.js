import {useState, useCallback, useEffect} from 'react'

const storageName = 'userData'

export const useAuth = () => {

  const [token, setToken] = useState(null)
  const [ready, setReady] = useState(false)
  const [userId, setUserId] = useState(null)
  const [role,setRole]=useState(null)

  const login = useCallback((jwtToken, id, role) => {
    setToken(jwtToken)
    setUserId(id)
    let erole=role[0]
    setRole(erole)

    localStorage.setItem(storageName, JSON.stringify({
      userId: id, token: jwtToken, role
    }))
  }, [])


  const logout = useCallback(() => {
    setToken(null)
    setUserId(null)
    setRole(null)
    localStorage.removeItem(storageName)
  }, [])

//   window.onbeforeunload = function() {
//     logout()
//     console.log()
//  }

  useEffect(()=>{
    if(!token){
      return
    }
    const payload=JSON.parse(atob(token.split(".")[1]))
    const expiration = payload.exp*1000
    if( expiration < Date.now() ){
      logout()
    } 
  },[token])

  useEffect(() => {
    const data = JSON.parse(localStorage.getItem(storageName))

    if (data && data.token) {
      login(data.token, data.userId, data.role)
    }
    setReady(true)
  }, [login])


  return { login, logout, token, userId, ready,role }
}
