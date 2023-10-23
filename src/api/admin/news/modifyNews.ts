import api from "../../apiRoute"

const apiAdminModifyNews = async ({ token, id, name, description, img, note }: TApiAdminModifyNewsParams): Promise<TApiResponse> => {
  try {
    await apiAdminModifyValue({token, id, attr: "name", newValue: name})
    await apiAdminModifyValue({token, id, attr: "description", newValue: description})
    await apiAdminModifyValue({token, id, attr: "note", newValue: note})
    
    if (img) {
      await apiAdminModifyValue({token, id, attr: "img", newValue: img})
    }
    
    return {
      status: true,
      message: ""
    }
  } catch (error) {
    return {
      status: false,
      message: ""
    }
  }
}

const apiAdminModifyValue = async ({ token, id, attr, newValue }: TApiAdminModifyNewsRequest): Promise<TApiResponse> => {
  try {
    const data = {
      token,
      newsID: id,
      News: attr,
      newNews: newValue
    }
    const formData = new FormData()
    formData.set("newsID", `${id}`)
    formData.set("News", attr)
    formData.set("newNews", newValue)

    const req = await fetch (`${api}/news/modifyNews.php`, {
      method: "POST",
      headers: {
        "Authorization": `SPToken ${token}`
      },
      body: attr === "img" ? formData : JSON.stringify(data)
    })
    return await req.json() as TApiResponse
  } catch (error) {
    return {
      status: false,
      message: ""
    }
  }
}

export default apiAdminModifyNews
