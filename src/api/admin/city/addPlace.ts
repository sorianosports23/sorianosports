import api from "../../apiRoute"

const apiAdminAddPlace = async ({ token, placeData }: TApiAdminAddPlaceRequest): Promise<TApiResponse> => {
  try {
    const { city, place, age, teacher, time, date, sport } = placeData

    const data = {
      sport,
      age,
      city,
      place,
      teacher,
      date,
      time
    }

    const res = await fetch(`${api}/place/addPlace.php`, {
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

export default apiAdminAddPlace
