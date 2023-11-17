import api from "../../apiRoute"
import { IApiGetInscriptionResponse, TApiGetInscriptionRequest } from "./types"

const apiGetInscription = async ({ token, id }: TApiGetInscriptionRequest): Promise<IApiGetInscriptionResponse> => {
  try {
    const res = await fetch(`${api}/inscription/getInscriptionFormID.php?inscriptionID=${id}`, {
      headers: {
        Authorization: `SPToken ${token}`
      }
    })
    return await res.json() as IApiGetInscriptionResponse
  } catch (error) {
    return {
      status: false,
      message: "Ocurrio un error inesperado"
    }
  }
}

export default apiGetInscription
