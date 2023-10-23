import api from "../../apiRoute"

const apiAdminModifyDirective = async ({ token, id, name, rank, img }: TApiAdminModifyDirectiveParams): Promise<TApiResponse> => {
  try {
    await apiAdminModifyValue({token, id, attr:"name", newValue: name})
    await apiAdminModifyValue({token, id, attr:"rank", newValue: rank})
    
    if (img) {
      await apiAdminModifyValue({token, id, attr:"image", newValue: img})
    }

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

const apiAdminModifyValue = async ({ token, id, attr, newValue }: TApiAdminModifyDirectiveRequest): Promise<TApiResponse> => {
  try {
    const data = {
      DirectiveID: id,
      attr,
      newDirective: newValue
    }
    const formData = new FormData()
    formData.set("DirectiveID", `${id}`)
    formData.set("attr", attr)
    formData.append("newDirective", newValue)

    const req = await fetch (`${api}/directive/modifyDirective.php`, {
      method: "POST",
      headers: {
        "Authorization": `SPToken ${token}`
      },
      body: attr === "image" ? formData : JSON.stringify(data)
    })
    return await req.json() as TApiResponse
  } catch (error) {
    return {
      status: false,
      message: ""
    }
  }
}

export default apiAdminModifyDirective
