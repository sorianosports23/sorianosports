import api from "../../apiRoute"

const apiAdminSendResponse = async ({ id, message, token }: TApiAdminSendResponeRequest): Promise<TApiResponse> => {
  try {
    const data = {
      id,
      message
    }

    const res = await fetch(`${api}/contact/messageForUser.php`, {
      method: "POST",
      headers: {
        Authorization: `SPToken ${token}`
      },
      body: JSON.stringify(data)
    })

    return await res.json() as TApiResponse
  } catch (error) {
    return {
      status: false,
      message: "Ocurrio un error inesperado"
    }
  }
}

export default apiAdminSendResponse
