import api from "../../apiRoute"
import { TApiAdminEditStatusInsc } from "./types"

const apiAdminEditStatusInsc = async ({ token, id, state }: TApiAdminEditStatusInsc): Promise<TApiResponse> => {
  try {
    const data = {
      id,
      newStatus: state
    }

    const res = await fetch (`${api}/inscription/editStatus.php`, {
      method: "POST",
      headers: {
        Authorization: `SPToken ${token}`
      },
      body: JSON.stringify(data)
    })

    return await res.json() as TApiResponse
  } catch (error) {
    return {
      status: false,
      message: "Ocurrio un error inesperado"
    }
  }
}

export default apiAdminEditStatusInsc
