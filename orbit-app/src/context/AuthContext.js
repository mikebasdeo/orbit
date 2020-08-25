import React, { createContext, useState } from 'react'
import { useHistory } from 'react-router-dom'

const AuthContext = createContext()
const { Provider } = AuthContext

const AuthProvider = ({ children }) => {

  // keeps track of where the user has been
  const history = useHistory()
  // check local browser storage first
  const token = localStorage.getItem('token')
  const userInfo = localStorage.getItem('userInfo')
  const expiresAt = localStorage.getItem('expiresAt')

  // set initial context to local storage if possible.
  // unset values will be undefined
  const [authState, setAuthState] = useState({
    token: token,
    expiresAt: expiresAt,
    userInfo: userInfo ? JSON.parse(userInfo) : {},
  })

  const logout = () => {
    // clear local storage and
    localStorage.removeItem('token')
    localStorage.removeItem('userInfo')
    localStorage.removeItem('expiresAt')

    // clear app authState
    setAuthState({ token: null, expiresAt: null, userInfo: {} })

    history.push('/login')
  }

  const isAuthenticated = () => {
    if (!authState.token || !authState.expiresAt) {
      return false
    }
    return new Date().getTime() / 1000 < authState.expiresAt
  }
  // function to handle successful login
  const setAuthInfo = ({ token, userInfo, expiresAt }) => {
    //persist local storage in browser
    localStorage.setItem('token', token)
    localStorage.setItem('userInfo', JSON.stringify(userInfo))
    localStorage.setItem('expiresAt', expiresAt)

    setAuthState({ token, userInfo, expiresAt })
  }

  const isAdmin = () => {
    return authState.userInfo.role === 'admin'
  }
  return (
    <Provider
      value={{
        authState,
        setAuthState: (authInfo) => setAuthInfo(authInfo),
        isAuthenticated,
        logout,
        isAdmin,
      }}
    >
      {children}
    </Provider>
  )
}

export { AuthContext, AuthProvider }
