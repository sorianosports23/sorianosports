type TContact = {
  id: number
  name: string
  email: string
  subject: string
  status: 1 | 2
  messagecontact: string
  latest_message?: string
}

type TApiAdminGetContactRequest = {
  token: string
  pag?: number
}

interface IApiAdminGetContactResponse extends TApiResponse {
  data: TContact[]
  pagination: {
    totalPages: number
    currentPage: number
  }
}

type TApiAdminEditStatusRequest = {
  token: string
  id: number
  status: 1 | 2
}

type TApiAdminSendResponeRequest = {
  token: string
  id: number
  message: string
}