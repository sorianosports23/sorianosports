import api from "../../apiRoute"

const apiAdminDeletePlace = async ({ token, id }: TApiAdminDeletePlaceRequest): Promise<TApiResponse> => {
  try {
    const data = {
      id
    }

    const res = await fetch(`${api}/place/deletePlace.php`, {
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

export default apiAdminDeletePlace
