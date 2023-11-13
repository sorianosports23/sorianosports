type TApiAdminAddSportRequest = {
  token: string
  city: string
  sport: string
}

type TPlace = {
  id: number
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
  placeData: Omit<TPlace, "id">
}

interface IApiGetPlace extends TApiResponse {
  data: TPlace[]
}

type TApiAdminDeletePlaceRequest = {
  token: string
  id: number
}