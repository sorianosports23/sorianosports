type TApiAdminDeleteUser = {
  token: string
  username: string
}

type TApiAdminGenPassRequest = {
  token: string
  username: string
  password: string
}

type TApiAdminManagePermRequest = {
  token: string
  username: string
  permission: "admin" | "editor"
  grant: boolean
}

type TApiGetUserFromUsernameRequest = {
  token: string
  username: string
}

type TApiGetUserFromCIRequest = {
  token: string
  ci: number
}

interface IApiGetUserFromUsernameResponse extends TApiResponse {
  data: TUser
}