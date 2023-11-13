type TApiAdminAddSportRequest = {
  token: string
  city: string
  sport: string
}

type TPlace = {
  city: string
  sport: string
  age: number
  place: string
  teacher: string
  date: string
  time: string
}

type TApiAdminAddPlaceRequest = {
  token: string
  placeData: TPlace
}

interface IApiGetPlace extends TApiResponse {
  data: TPlace[]
}