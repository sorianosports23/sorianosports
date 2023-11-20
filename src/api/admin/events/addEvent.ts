import api from "../../apiRoute"

const apiAdminAddEvent = async ({ token, name, description, date, time, place, sport }: TApiAdminAddEventRequest): Promise<IApiAdminModifyEventResponse> => {
  try {
    const bodyData = {
      name,
      description,
      place,
      sport,
      date_ev: date,
      time
    }

    const res = await fetch(`${api}/events/addevents.php`, {
      method: "POST",
      headers: {
        Authorization: `SPToken ${token}`
      },
      body: JSON.stringify(bodyData)
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