import api from "../../apiRoute"

const apiGetFaq = async (): Promise<IApiGetFaqResponse> => {
  try {
    const res = await fetch(`${api}/faq/getFaq.php`)
    return await res.json() as IApiGetFaqResponse
  } catch (error) {
    return {
      status: false,
      message: "Ocurrio un error inesperado",
      data: []
    }
  }
}

export default apiGetFaq
