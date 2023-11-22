import api from "../../apiRoute"

const apiAdminModifyEvent = async ({ token, id, name, image, place, time, description, date_ev, sport, city, extraInfo, inscriptionInfo, rules, urlUbi }: IApiAdminModifyEventRequest): Promise<TApiResponse> => {
  try {
    await apiAdminModifyValue({token, id, attr: "name", newValue: name})
    await apiAdminModifyValue({token, id, attr: "place", newValue: place})
    await apiAdminModifyValue({token, id, attr: "time", newValue: time})
    await apiAdminModifyValue({token, id, attr: "description", newValue: description})
    await apiAdminModifyValue({token, id, attr: "date_ev", newValue: date_ev})
    await apiAdminModifyValue({token, id, attr: "sport", newValue: sport})
    await apiAdminModifyValue({token, id, attr: "city", newValue: city})
    await apiAdminModifyValue({token, id, attr: "extraInfo", newValue: extraInfo})
    await apiAdminModifyValue({token, id, attr: "inscriptionInfo", newValue: inscriptionInfo})
    await apiAdminModifyValue({token, id, attr: "rules", newValue: rules})
    await apiAdminModifyValue({token, id, attr: "urlUbi", newValue: urlUbi})
    if (image) await apiAdminModifyValue({token, id, attr: "image", newValue: image})

    return {
      status: true,
      message: "Se edito correctamente"
    }
  } catch (error) {
    return {
      status: false,
      message: ""
    }
  }
}

const apiAdminModifyValue = async ({ token, id, attr, newValue }: TApiAdminModifyEventParams): Promise<TApiResponse> => {
  try {
    const data = {
      eventID: id,
      event: attr,
      newEvent: newValue
    }
    const formData = new FormData()
    formData.set("eventID", `${id}`)
    formData.set("event", attr)
    formData.set("newEvent", newValue)

    const req = await fetch (`${api}/events/modifyEvents.php`, {
      method: "POST",
      headers: {
        "Authorization": `SPToken ${token}`
      },
      body: attr === "image" ? formData : JSON.stringify(data)
    })
    return await req.json() as TApiResponse
  } catch (error) {
    return {
      status: false,
      message: ""
    }
  }
}

export default apiAdminModifyEvent
