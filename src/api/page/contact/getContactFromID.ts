import { IApiGetContactIDResponse, TApiGetContactIDRequest } from "./types"

const apiGetContactID = async ({ id, token }: TApiGetContactIDRequest): Promise<IApiGetContactIDResponse> => {
  try {
    
  } catch (error) {
    return {
      status: false,
      message: "Ocurrio un error inesperado",
      data: []
    }
  }
}

export default apiGetContactID
