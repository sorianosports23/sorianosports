import { createContext, PropsWithChildren, useState, useEffect } from "react"
import { clearLocalStorage, getLocalStorage, setLocalStorage } from "../../utils/useLocalStorage"

const userSessionContext = createContext<TUserSessionContext>({
  username: "",
  token: "",
  isAdmin: false,
  loadingData: false,
  login: () => {},
  logout: () => {}
})

const UserSessionProvider = ({ children }: PropsWithChildren) => {  
  const [username, setUsername] = useState("")
  const [userToken, setUserToken] = useState("")
  const [userIsAdmin, setUserIsAdmin] = useState(false)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const userLocal = getLocalStorage("userData", true)
    if (userLocal) {
      setUsername(userLocal.username)
      setUserToken(userLocal.token)
    }
    setIsLoading(false)
  }, [setUsername, setUserToken])

  const login = (userData: string, username: string) => {
    setUsername(username)
    setUserToken(userData)
    const user = {
      username,
      token: userData
    }
    setLocalStorage("userData", user, true)
  }

  const logout = () => {
    clearLocalStorage()
  }

  return (
    <userSessionContext.Provider value={{
      username,
      token: userToken,
      isAdmin: userIsAdmin,
      loadingData: isLoading,
      login,
      logout
    }}>
      { children }
    </userSessionContext.Provider>
  )
}

export {userSessionContext, UserSessionProvider}