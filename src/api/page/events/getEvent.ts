import api from "../../apiRoute"

const apiGetEvent = async (id: number): Promise<IApiGetEventResponse> => {
  try {
    const res = await fetch(`${api}/events/getEventsID.php?eventsID=${id}`)
    return await res.json() as IApiGetEventResponse
  } catch (error) {
    return {
      status: false,
      message: "Ocurrio un error inesperado",
      data: {
        id: 0,
        date_ev: "",
        description: "",
        name: "",
        place: "",
        sport: "",
        time: "",
        extrainfo: "",
        inscriptioninfo: "",
        rules: "",
        urlubi: "",
        city: "",
        check_great: 0
      }
    }
  }
}

export default apiGetEvent
