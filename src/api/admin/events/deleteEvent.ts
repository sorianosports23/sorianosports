import api from "../../apiRoute"

const apiDeleteEvent = async ({ token, id }: TApiDeleteEventRequest): Promise<TApiResponse> => {
  try {
    const bodyData = {
      id
    }
    const req = await fetch(`${api}/events/deleteEvents.php`, {
      method: "POST",
      headers: {
        Authorization: `SP Token ${token}`
      },
      body: JSON.stringify(bodyData)
    })
    return await req.json() as TApiResponse
  } catch (error) {
    return {
      status: false,
      message: "Ocurrio un error inesperado"
    }
  }
}

export default apiDeleteEvent
