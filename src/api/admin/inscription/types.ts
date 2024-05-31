import { TInscription, TInscriptionDB } from "./inscription.types"

type TApiSendInscriptionRequest = {
  token: string
  data: Omit<TInscription, "state">  
}

interface IApiAdminGetInscriptions extends TApiResponse {
  data: TInscriptionDB[]
  pagination: {
    totalPages: number
    actualPage: number
  }
}

type TApiGetInscriptionRequest = {
  token: string
  id: number
}

interface IApiGetInscriptionResponse extends TApiResponse {
  data?: TInscriptionDB
}

type TApiGetInscriptionFromUsernameRequest = {
  token: string
  username: string
}

interface IApiGetInscriptionFromUsernameResponse extends TApiResponse {
  data: TInscriptionDB[]
}

type TApiAdminEditStatusInsc = {
  token: string
  id: number
  state: 2|3
}

export type { TApiSendInscriptionRequest, IApiAdminGetInscriptions, TApiGetInscriptionRequest, IApiGetInscriptionResponse, TApiGetInscriptionFromUsernameRequest, IApiGetInscriptionFromUsernameResponse, TApiAdminEditStatusInsc }