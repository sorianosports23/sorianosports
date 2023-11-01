import api from "../../apiRoute"

const apiAdminDeleteNews = async ({ token, id }: TApiAdminDeleteNewsRequest): Promise<TApiResponse> => {
  try {
    const data = {
      token,
      id
    }
    const req = await fetch (`${api}/news/deleteNews.php`, {
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

export default apiAdminDeleteNews
