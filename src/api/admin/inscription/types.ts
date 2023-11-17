import { TInscription } from "./inscription.types"

type TApiSendInscriptionRequest = {
  token: string
  data: Omit<TInscription, "state">  
}

interface IApiAdminGetInscriptions extends TApiResponse {
  data: TInscription[]
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
  data?: TInscription
}

export type { TApiSendInscriptionRequest, IApiAdminGetInscriptions, TApiGetInscriptionRequest, IApiGetInscriptionResponse }