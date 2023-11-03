import api from "../../apiRoute"

const apiGetCitySports = async (city: string): Promise<IApiGetCitySportsResponse> => {
  try {
    const res = await fetch(`${api}/cities/getCity.php?city=${city}`)
    return await res.json() as IApiGetCitySportsResponse
  } catch (error) {
    return {
      status: false,
      message: "",
      data: []
    }
  }
}

export default apiGetCitySports