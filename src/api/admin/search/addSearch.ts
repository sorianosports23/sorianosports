import api from "../../apiRoute"

const apiAdminAddSearch = async ({ token, name, description, url }: TApiAdminAddSearchRequest): Promise<IApiAdminAddSearchResponse> => {
  try {
    const data = {
      name,
      description,
      url
    }
    const res = await fetch(`${api}/search/addSearch.php`, {
      method: "POST",
      headers: {
        Authorization: `SPToken ${token}`
      },
      body: JSON.stringify(data)
    })

    return await res.json() as IApiAdminAddSearchResponse
  } catch (error) {
    return {
      status: false,
      message: "Ocurrio un error inesperado"
    }
  }
}

export default apiAdminAddSearch
