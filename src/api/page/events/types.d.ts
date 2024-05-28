type TEvent = {
  id: number
  name: string
  place: string
  time: string
  sport: string
  description: string
  date_ev: string
  check_great: TTinyInt
}

interface IEventID extends TEvent {
  inscriptioninfo: string
  rules: string
  urlubi: string
  extrainfo: string
  city: string
}

interface IApiGetEventsResponse extends TApiDataResponse {
  data: Array<TEvent>
}

interface IApiGetEventResponse extends TApiResponse {
  data: IEventID
}

type TApiGetEventRequest = {
  id: number
}

interface IApiGetGreatEventsResponse extends TApiResponse {
  data: TEvent[]
}