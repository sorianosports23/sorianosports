import api from "../../apiRoute"
import { IApiGetMessagesResponse } from "./types"

const apiGetAllMessages = async (token: string): Promise<IApiGetMessagesResponse> => {
  try {
    const res = await fetch(`${api}/contact/getAllMessagesFromUser.php`, {
      headers: {
        Authorization: `SPToken ${token}`
      }
    })
    return await res.json() as IApiGetMessagesResponse
  } catch (error) {
    return {
      status: false,
      message: "Ocurrio un error inesperado",
      data: []
    }
  }
}

export default apiGetAllMessages
