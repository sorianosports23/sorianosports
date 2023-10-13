type TApiSendContactRequest = {
  name: string
  email: string
  subject: string
  message: string
}

type TApiSendContactResponse = {
  status: boolean
  message: string
  err?: string
}