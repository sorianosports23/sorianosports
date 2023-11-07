import api from "../../apiRoute"

const apiGetSocialMedia = async (): Promise<IApiSocialResponse> => {
  try {
    const res = await fetch(`${api}/socialMedia/getSocialMedia.php`)
    return await res.json() as IApiSocialResponse
  } catch (error) {
    return {
      status: false,
      message: "Ocurrio un error inesperado",
      data: []
    }
  }
}

export default apiGetSocialMedia
