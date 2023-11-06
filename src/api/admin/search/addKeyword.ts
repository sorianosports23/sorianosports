import api from "../../apiRoute"

const apiAddKeyword = async ({ token, idSearch, name }: TApiAddKeywordRequest): Promise<TApiResponse> => {
  try {
    const data = {
      id: idSearch,
      name
    }

    const res = await fetch(`${api}/search/addKeywords.php`, {
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

export default apiAddKeyword
