import api from "../../apiRoute"
import { TInscription } from "./inscription.types"

const apiSendInscription = async ({ token, data }: { token: string, data: Omit<TInscription, "state">}): Promise<TApiResponse> => {
  try {
    const formData = new FormData()

    Object.keys(data).forEach((key, i) => {
      const dataKey = key as keyof typeof data
      if (dataKey === "imageCI" || dataKey === "imageMedicalRecord") {
        formData.append(dataKey, data[dataKey] as string)
      } else {
        formData.set(dataKey, data[dataKey] as string)
      }
    })

    const res = await fetch(`${api}/test.php`, {
      method: "POST",
      headers: {
        Authorization: `SPToken ${token}`
      },
      body: formData
    })

    return await res.json() as TApiResponse
  } catch (error) {
    return {
      status: false,
      message: "Ocurrio un error inesperado"
    }
  }
}

export default apiSendInscription
