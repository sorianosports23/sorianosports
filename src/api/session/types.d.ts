type TApiRegisterRequest = {
  username: string
  password: string
  email: string
  phone: number
  ci: string
}

type TApiLoginRequest = {
  username: string
  password: string
}

interface IApiLoginResponse extends TApiResponse {
  token?: string
  messageError?: string
}

type TApiChangePasswordRequest = {
  username: string
  password: string
  newPassword: string
}

interface IApiChangePasswordResponse extends TApiResponse {
  err?: string
}