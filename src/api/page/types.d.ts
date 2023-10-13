type TNews = {
  id: number
  name: string
  description: string
  image: string
}

interface INews extends TNews {
  note: string
}

type TApiGetNewsIdResponse = {
  status: boolean
  data: INews
}

type TApiGetNewsResponse = {
  status: boolean
  data: TNews[]
  pagination: {
    totalPages: number
    currentPage: number
  }
}

type TApiGetRecentNewsResponse = {
  status: boolean
  data: TNews[]
}