type TEvent = {
  id: number
  name: string
  place: string
  time: string
  sport: string
  description: string
  date_ev: string
  check_Great: TTinyInt
}

interface IEventID extends TEvent {
  inscriptionInfo: string
  rules: string
  urlUbi: string
  extraInfo: string
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