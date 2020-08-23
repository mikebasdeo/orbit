import React, { createContext, useState } from 'react'

const AuthContext = createContext()
const { Provider } = AuthContext

const AuthProvider = ({ children }) => {
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

  return (
    <Provider
      value={{
        authState,
        setAuthState: (authInfo) => setAuthInfo(authInfo),
        isAuthenticated,
      }}
    >
      {children}
    </Provider>
  )
}

export { AuthContext, AuthProvider }
