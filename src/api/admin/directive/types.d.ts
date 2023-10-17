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