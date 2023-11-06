type TApiAdminAddSearchRequest = {
  token: string
  name: string
  description: string
  url: string
}

interface IApiAdminAddSearchResponse extends TApiResponse {
  input?: string
}

type TSearch = {
  id: number
  name: string
  url: string
  description: string
  keywords: string[]
}

interface IApiGetSearchResponse extends TApiResponse {
  data: TSearch[]
}

interface IApiGetKeywordsResponse extends TApiResponse {
  data: string[]
}

type TApiAddKeywordRequest = {
  token: string
  name: string
  idSearch: number
}