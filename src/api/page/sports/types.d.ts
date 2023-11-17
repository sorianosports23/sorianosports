type TCityRes = {
  name: string
  type: "year" | "summer"
}

interface IApiGetCitySportsResponse extends TApiResponse {
  data: TCityRes[]
}

interface IApiGetSportsResponse extends TApiResponse {
  data: TCityRes[]
}

interface IApiGetCityFromSportResponse extends TApiResponse {
  data: string[]
}