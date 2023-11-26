import api from "../../apiRoute"

const apiAdminAddEvent = async ({ token, name, description, date, time, place, sport, image, city, extraInfo, inscriptionInfo, rules, urlUbi, greatevent }: TApiAdminAddEventRequest): Promise<IApiAdminModifyEventResponse> => {
  try {
    const eventData = new FormData()
    eventData.set("name", name)
    eventData.set("description", description)
    eventData.set("place", place)
    eventData.set("sport", sport)
    eventData.set("date_ev", date)
    eventData.set("time", time)
    eventData.append("image", image)
    eventData.set("city", city)
    eventData.set("rules", rules)
    eventData.set("inscriptionInfo", inscriptionInfo)
    eventData.set("extraInfo", extraInfo)
    eventData.set("urlUbi", urlUbi)
    eventData.set("greatevent", `${greatevent ?? 0}`)

    const res = await fetch(`${api}/events/addevents.php`, {
      method: "POST",
      headers: {
        Authorization: `SPToken ${token}`,
        // "Content-Type": "undefined"
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