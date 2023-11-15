type TApiAdminAddSportRequest = {
  token: string
  city: string
  sport: string
  typeSport: "summer" | "year"
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

type TApiAdminModifyPlaceRequest = {
  token: string
  info: Omit<TPlace, "city">
}

type TPlaceAttr = "sport" | "age" | "place" | "teacher" | "date" | "time"

type TApiAdminModifyPlaceParams = {
  token: string
  id: number
  attr: TPlaceAttr
  newValue: string
}