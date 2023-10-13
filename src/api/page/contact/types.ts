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

export type { TApiSendContactErr, TApiSendContactRequest, TApiSendContactResponse }
export { EApiContactInputsErr }