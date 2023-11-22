import { createContext, PropsWithChildren, useState, useEffect } from "react"
import { clearLocalStorage, getLocalStorage, setLocalStorage } from "../../utils/useLocalStorage"
import apiGetPermissions from "../../api/session/getPermissions"

const userSessionContext = createContext<TUserSessionContext>({
  username: "",
  token: "",
  loadingData: false,
  loadingPermData: false,
  permissions: [],
  login: () => {},
  logout: () => {}
})

const UserSessionProvider = ({ children }: PropsWithChildren) => {  
  const [username, setUsername] = useState("")
  const [userToken, setUserToken] = useState("")
  const [userPermissions, setUserPermissions] = useState<TPermission[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [isLoadingPerm, setIsLoadingPerm] = useState(true)

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

  useEffect(() => {
    if (userToken) {
      (async () => {
        const res = await apiGetPermissions(userToken)
        if (res.permissions) {
          setUserPermissions(res.permissions)
        }
        setIsLoadingPerm(false)
      })()
    }
    if (!isLoading && !userToken) {
      setIsLoadingPerm(false)
    }
  }, [userToken, isLoading])

  const logout = () => {
    clearLocalStorage()
  }

  return (
    <userSessionContext.Provider value={{
      username,
      token: userToken,
      loadingData: isLoading,
      loadingPermData: isLoadingPerm,
      permissions: userPermissions,
      login,
      logout
    }}>
      { children }
    </userSessionContext.Provider>
  )
}

export {userSessionContext, UserSessionProvider}