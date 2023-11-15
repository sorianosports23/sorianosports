import api from "../../apiRoute"

const apiGetCityFromSport = async (sport: string): Promise<IApiGetCityFromSportResponse> => {
  try {
    const res = await fetch(`${api}/cities/getCityForSport.php?citySport=${sport}`)
    return await res.json() as IApiGetCityFromSportResponse
  } catch (error) {
    return {
      status: false,
      message: "Ocurrio un error inesperado",
      data: []
    }
  }
}

export default apiGetCityFromSport
