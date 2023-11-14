import api from "../../apiRoute"

const apiGetSports = async (): Promise<IApiGetSportsResponse> => {
  try {
    const res = await fetch(`${api}/cities/getAllCity.php`)
    return await res.json() as IApiGetSportsResponse
  } catch (error) {
    return {
      status: false,
      message: "Ocurrio un error inesperado",
      data: []
    }
  }
}

export default apiGetSports
