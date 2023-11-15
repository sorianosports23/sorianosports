import api from "../../apiRoute"

const apiAdminDeleteSport = async ({ token, city, sport }: Omit<TApiAdminAddSportRequest, "typeSport">): Promise<TApiResponse> => {
  try {
    const data = {
      nameCity: city,
      nameSport: sport
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
