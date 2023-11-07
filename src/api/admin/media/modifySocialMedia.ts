import api from "../../apiRoute"

const apiAdminModifySocialMedia = async ({ token, name, newLink }: TApiAdminModifySocialRequest): Promise<TApiResponse> => {
  try {
    const res = await fetch (`${api}/socialMedia/modifySocialMedia.php`, {
      method: "POST",
      headers: {
        Authorization: `SPToken ${token}`
      },
      body: JSON.stringify({ name, newLink })
    })
    return await res.json()
  } catch (error) {
    return {
      status: false,
      message: "Ocurrio un error inesperado"
    }
  }
}

export default apiAdminModifySocialMedia
