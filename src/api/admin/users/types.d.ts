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