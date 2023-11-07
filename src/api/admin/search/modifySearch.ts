import api from "../../apiRoute"

const apiAdminModifySearch = async ({ token, id, description, url }: TApiAdminModifySearchRequest): Promise<TApiResponse> => {
  try {
    await apiAdminModifyValue({token, id, attr: "description", newValue: description})
    await apiAdminModifyValue({token, id, attr: "url", newValue: url})

    return {
      status: true,
      message: "Se edito correctamente"
    }
  } catch (error) {
    return {
      status: false,
      message: ""
    }
  }
}

const apiAdminModifyValue = async ({ token, id, attr, newValue }: TApiAdminModifySearchParams): Promise<TApiResponse> => {
  try {
    const data = {
      id,
      search: attr,
      newSearch: newValue
    }

    const req = await fetch (`${api}/search/modifySearch.php`, {
      method: "POST",
      headers: {
        "Authorization": `SPToken ${token}`
      },
      body: JSON.stringify(data)
    })
    return await req.json() as TApiResponse
  } catch (error) {
    return {
      status: false,
      message: ""
    }
  }
}

export default apiAdminModifySearch
