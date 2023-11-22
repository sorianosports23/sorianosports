type TApiSendContactErr = "name" | "email" | "subject" | "messageContact"

enum EApiContactInputsErr {
  "name" = "name",
  "email" = "email",
  "subject" = "subject",
  "messageContact" = "message"
}
 
type TApiSendContactRequest = {
  name: string
  email: string
  subject: string
  message: string
}

type TApiSendContactResponse = {
  status: boolean
  message: string
  err?: TApiSendContactErr
}

type TApiGetContactIDRequest = {
  token: string
  id: number
}

interface IApiGetContactIDResponse extends TApiResponse {
  data: string[]
}

export { EApiContactInputsErr }
export type { TApiGetContactIDRequest, IApiGetContactIDResponse }