type TEvent = {
  id: number
  name: string
  place: string
  sport: string
  description: string
  date_ev: string
}

interface IApiGetEventsResponse extends TApiDataResponse {
  data: Array<TEvent>
}