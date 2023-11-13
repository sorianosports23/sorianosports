type TContact = {
  id: number
  name: string
  email: string
  subject: string
  status: 1 | 2
  messageContact: string
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