type TUserSessionContext = {
  username: string
  token: string
  loadingData: boolean
  loadingPermData: boolean
  permissions: TPermission[]
  login: (loginData: string, username: string) => void
  logout: () => void
}