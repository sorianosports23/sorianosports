type TApiAdminAddDirectiveRequest = {
  token: string
  name: string
  rank: string
  image: string
}

type TInputsOnDirective = "image" | "name" | "rank"

interface IApiAdminAddDirectiveResponse extends TApiResponse {
  input?: TInputsOnDirective
}

type TApiAdminDeleteDirectiveRequest = {
  id: number
  token: string
}

type TApiAdminModifyDirectiveParams = {
  token: string
  id: number
  name: string
  rank: string
  img?: string
}

type TApiAdminModifyDirectiveRequest = {
  token: string
  id: number
  attr: "name" | "rank" | "image"
  newValue: string
}