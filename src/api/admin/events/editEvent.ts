import api from "../../apiRoute"

const apiAdminModifyEvent = async ({ token, id, name, place, time, description, date_ev, sport }: TApiAdminModifyEventRequest): Promise<TApiResponse> => {
  try {
    await apiAdminModifyValue({token, id, attr: "name", newValue: name})
    await apiAdminModifyValue({token, id, attr: "place", newValue: place})
    await apiAdminModifyValue({token, id, attr: "time", newValue: time})
    await apiAdminModifyValue({token, id, attr: "description", newValue: description})
    await apiAdminModifyValue({token, id, attr: "date_ev", newValue: date_ev})
    await apiAdminModifyValue({token, id, attr: "sport", newValue: sport})

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

    const req = await fetch (`${api}/events/modifyEvents.php`, {
      method: "POST",
      headers: {
        "Authorization": `SPToken ${token}`
      },
      body: JSON.stringify(data)
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
