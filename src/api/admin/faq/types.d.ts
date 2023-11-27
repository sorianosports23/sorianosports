type TApiAdminAddFaqRequest = {
  token: string
  question: string
  response: string
}

type TFaq = {
  id: number
  name: string
  response: string
}

interface IApiGetFaqResponse extends TApiResponse {
  data: TFaq[]
}

interface IApiGetFaqIDResponse extends TApiResponse {
  data: TFaq
}

type TApiAdminModifyFaqParams = {
  token: string
  id: number
  name: string
  response: string
}

type TApiAdminModifyFaqRequest = {
  token: string
  id: number
  attr: "name" | "response"
  newValue: string
}