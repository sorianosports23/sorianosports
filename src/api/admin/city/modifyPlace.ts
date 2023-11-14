import api from "../../apiRoute"

const apiAdminModifyPlace = async ({ token, info }: TApiAdminModifyPlaceRequest): Promise<TApiResponse> => {
  try {

    const { id, age, date, place, sport, teacher, time } = info

    await apiAdminModifyValue({ token, id, attr: "age", newValue: `${age}` })
    await apiAdminModifyValue({ token, id, attr: "date", newValue: date })
    await apiAdminModifyValue({ token, id, attr: "place", newValue: place })
    await apiAdminModifyValue({ token, id, attr: "sport", newValue: sport })
    await apiAdminModifyValue({ token, id, attr: "teacher", newValue: teacher })
    await apiAdminModifyValue({ token, id, attr: "time", newValue: time })

    return {
      status: true,
      message: "Se edito correctamente"
    }
  } catch (error) {
    return {
      status: false,
      message: "Ocurrio un error inesperado"
    }
  }
}

const apiAdminModifyValue = async ({ token, id, attr, newValue }: TApiAdminModifyPlaceParams): Promise<TApiResponse> => {
  try {
    const data = {
      id,
      place: attr,
      newPlace: newValue
    }

    const req = await fetch (`${api}/place/modifyPlace.php`, {
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

export default apiAdminModifyPlace
