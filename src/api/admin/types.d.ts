type TPermission = "users" | "news"

type TUser = {
  username: string
  fullname: string
  email: string
  age: number
  phone: number
  ci: number
  permissions: TPermission[]
}

type TApiGetUsersRequest = {
  token: string
  pag: number
}

interface IApiGetUsersResponse extends TApiResponseAdmin {
  data: Array<TUser>
  pagination: {
    totalPages: number
    currentPage: number
    maxUsers: number
  }
}

type TApiAddNewsRequest = {
  token: string
  title: string
  description: string
  image: string
  content: string
  author: string
}

type TApiAddNewsResponse = {
  status: boolean
  message: string
}