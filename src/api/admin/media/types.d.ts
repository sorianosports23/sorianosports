type TSocial = {
  id: number
  name: string
  link: string
}

interface IApiSocialResponse extends TApiResponse {
  data: TSocial[]
}

type TApiAdminModifySocialRequest = {
  token: string
  name: string
  newLink: string
}