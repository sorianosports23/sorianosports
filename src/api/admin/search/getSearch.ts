import api from "../../apiRoute"

const apiGetSearch = async (): Promise<IApiGetSearchResponse> => {
  try {
    const res = await fetch(`${api}/search/getSearch.php`)
    return await res.json()
  } catch (error) {
    return {
      status: false,
      message: "Ocurrio un error inesperado",
      data: []
    }
  }
}

export default apiGetSearch
