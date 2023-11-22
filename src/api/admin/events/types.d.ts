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
  city: string
  rules: string
  inscriptionInfo: string
  extraInfo: string
  urlUbi: string
}

interface IApiAdminModifyEventRequest extends IEventID {
  token: string
  image?: File
}

interface IApiAdminModifyEventResponse extends TApiResponse {
  input?: TEventAttr
}

type TEventAttr = "name" | "place" | "time" | "sport" | "description" | "date_ev" | "image" | "city" | "place" | "time" | "rules" | "inscriptionInfo" | "extraInfo" | "urlUbi"

type TApiAdminModifyEventParams = {
  token: string
  id: number
  attr: TEventAttr
  newValue: string | File
}