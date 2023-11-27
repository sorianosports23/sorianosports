import api from "../../apiRoute"

const apiAdminModifyFaq = async ({ token, id, name, response }: TApiAdminModifyFaqParams): Promise<TApiResponse> => {
  try {
    await apiAdminModifyValue({token, id, attr: "name", newValue: name})
    await apiAdminModifyValue({token, id, attr: "response", newValue: response})
    
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

const apiAdminModifyValue = async ({ token, id, attr, newValue }: TApiAdminModifyFaqRequest): Promise<TApiResponse> => {
  try {
    const data = {
      faqID: id,
      name: attr,
      newName: newValue
    }
    const req = await fetch (`${api}/faq/modifyFaq.php`, {
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

export default apiAdminModifyFaq
