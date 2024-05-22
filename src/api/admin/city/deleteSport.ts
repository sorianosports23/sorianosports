import api from "../../apiRoute"

const apiAdminDeleteSport = async ({ token, city, sport, typeSport }: TApiAdminAddSportRequest): Promise<TApiResponse> => {
  try {
    const data = {
      nameCity: city,
      nameSport: sport,
      typeSport
    }

    const res = await fetch(`${api}/cities/deleteCity.php`, {
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

export default apiAdminDeleteSport
