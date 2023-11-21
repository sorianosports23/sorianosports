import api from "../../apiRoute"

const apiAdminAddEvent = async ({ token, name, description, date, time, place, sport, image }: TApiAdminAddEventRequest): Promise<IApiAdminModifyEventResponse> => {
  try {
    const eventData = new FormData()
    eventData.append("name", name)
    eventData.set("description", description)
    eventData.set("place", place)
    eventData.set("sport", sport)
    eventData.set("date_ev", date)
    eventData.set("time", time)
    eventData.append("image", image)

    const res = await fetch(`${api}/events/addevents.php`, {
      method: "POST",
      headers: {
        Authorization: `SPToken ${token}`,
        // "Content-Type": "multipart/form-data"
      },
      body: eventData
    })
    return await res.json() as TApiResponse
  } catch (error) {
    return {
      status: false,
      message: "Ocurrio un error inesperado"
    }
  }
}

export default apiAdminAddEvent