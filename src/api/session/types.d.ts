type TApiRegisterRequest = {
  username: string
  fullname: string
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
  err?: string
}

type TApiChangePasswordRequest = {
  username: string
  password: string
  newPassword: string
  token: string
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
    fullname: string
    email: string
    age: number
    ci: number
    phone: number
  }
}

type TApiChangeInfoRequest = {
  token: string
  fullname: string
  email: string
  phone: number
}

interface IApiChangeInfoResponse extends TApiResponse {
  err?: "fullname" | "email" | "phone"
}

type TApiDeleteAccountRequest = {
  token: string,
  password: string
}

interface IApiDeleteAccountResponse extends TApiResponse {
  err?: string
  authorization?: boolean
}