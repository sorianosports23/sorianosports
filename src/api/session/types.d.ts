type TApiRegisterRequest = {
  username: string
  password: string
  email: string
  age: number
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

type TApiGetUserInfoRequest = {
  token: string
}

type TApiGetUserInfoResponse = {
  authorization: boolean
  data?: {
    username: string
    email: string
    age: number
    ci: number
    phone: number
  }
}