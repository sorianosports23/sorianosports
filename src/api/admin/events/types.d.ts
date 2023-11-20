type TApiDeleteEventRequest = {
  token: string
  id: number
}

type TApiAdminAddEventRequest = {
  token: string
  name: string
  description: string
  sport: string
  place: string
  time: string
  date: string
  image: File
}

type TApiAdminModifyEventRequest = {
  token: string
  id: number
  name: string
  place: string
  time: string
  sport: string
  description: string
  date_ev: string
}

interface IApiAdminModifyEventResponse extends TApiResponse {
  input?: TEventAttr
}

type TEventAttr = "name" | "place" | "time" | "sport" | "description" | "date_ev" | "image"

type TApiAdminModifyEventParams = {
  token: string
  id: number
  attr: TEventAttr
  newValue: string
}