import api from "../../apiRoute"
import { IApiGetContactIDResponse, TApiGetContactIDRequest } from "./types"

const apiGetContactID = async ({ id, token }: TApiGetContactIDRequest): Promise<IApiGetContactIDResponse> => {
  try {
    const res = await fetch(`${api}/contact/getMessageForUser.php?idMessage=${id}`, {
      headers: {
        Authorization: `SPToken ${token}`
      }
    })
    return await res.json() as IApiGetContactIDResponse
  } catch (error) {
    return {
      status: false,
      message: "Ocurrio un error inesperado",
      data: ""
    }
  }
}

export default apiGetContactID
