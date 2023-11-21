type TUserSessionContext = {
  username: string
  token: string
  isAdmin: boolean
  loadingData: boolean
  login: (loginData: string, username: string) => void
  logout: () => void
}