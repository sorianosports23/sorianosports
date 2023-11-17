import api from "../../apiRoute"
import { IApiGetInscriptionFromUsernameResponse, TApiGetInscriptionFromUsernameRequest, TApiGetInscriptionRequest } from "./types"

const apiGetInscriptionFromUsername = async ({ token, username }: TApiGetInscriptionFromUsernameRequest): Promise<IApiGetInscriptionFromUsernameResponse> => {
  try {
    const res = await fetch(`${api}/inscription/getInscriptionForUsername.php?username=${username}`, {
      headers: {
        Authorization: `SPToken ${token}`
      }
    })
    return await res.json() as IApiGetInscriptionFromUsernameResponse
  } catch (error) {
    return {
      status: false,
      message: "Ocurrio un error inesperado",
      data: []
    }
  }
}

export default apiGetInscriptionFromUsername
