import api from "../../apiRoute"

const apiGetKeywords = async (id: number): Promise<IApiGetKeywordsResponse> => {
  try {
    const res = await fetch(`${api}/search/getKeywords.php?search=${id}`)
    return await res.json() as IApiGetKeywordsResponse
  } catch (error) {
    return {
      status: false,
      message: "Ocurrio un error inesperado",
      data: []
    }
  }
}

export default apiGetKeywords
