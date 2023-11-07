import api from "../../apiRoute"

const apiAdminDeleteKW = async ({ token, id, name }: TApiAdminDeleteKWRequest): Promise<TApiResponse> => {
  try {
    const data = {
      id,
      name
    }
    const res = await fetch(`${api}/search/deleteKeywords.php`, {
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

export default apiAdminDeleteKW
