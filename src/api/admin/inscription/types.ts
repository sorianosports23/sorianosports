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

export type { TApiSendInscriptionRequest, IApiAdminGetInscriptions }