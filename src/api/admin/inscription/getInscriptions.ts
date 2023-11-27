import api from "../../apiRoute"
import { IApiAdminGetInscriptions } from "./types"

const apiAdminGetInscriptions = async (token: string): Promise<IApiAdminGetInscriptions> => {
  try {
    const res = await fetch(`${api}/inscription/getInscriptionForm.php`, {
      headers: {
        Authorization: `SPToken ${token}`
      }
    })

    return await res.json() as IApiAdminGetInscriptions
  } catch (error) {
    return {
      status: false,
      message: "Ocurrio un error inesperado",
      data: [],
      pagination: {
        totalPages: 0,
        actualPage: 0
      }
    }
  }
}

export default apiAdminGetInscriptions
