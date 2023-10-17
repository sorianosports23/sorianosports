type TDirective = {
  id: number
  image: string
  name: string
  rank: string
  imgType: string
}

type TApiGetDirectiveResponse = {
  status: boolean
  data: TDirective[]
}