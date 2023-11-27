import api from "../../apiRoute"

const apiGetGreatEvent = async (): Promise<IApiGetGreatEventsResponse> => {
  try {
    const res = await fetch(`${api}/events/getGreatEvents.php`)
    return await res.json() as IApiGetGreatEventsResponse
  } catch (error) {
    return {
      status: false,
      message: "Ocurrio un error inesperado",
      data: []
    }
  }
}

export default apiGetGreatEvent
