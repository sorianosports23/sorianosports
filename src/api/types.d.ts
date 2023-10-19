type TApiResponse = {
  status: boolean
  message: string
}

type TApiDataResponse = {
  status: boolean
  pagination: {
    totalPages: number
    currentPage: number
  }
}

type TApiResponseAdmin = {
  status: boolean
  err?: string
}