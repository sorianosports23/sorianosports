import api from "../../apiRoute"

const apiAdminDeleteDirective = async ({ token, id }: TApiAdminDeleteDirectiveRequest): Promise<TApiResponse> => {
  try {
    const req = await fetch (`${api}/directive/deleteDirective.php`, {
      method: "POST",
      headers: {
        "Authorization": `SPToken ${token}`
      },
      body: JSON.stringify({id})
    })

    const res = await req.json() as TApiResponse

    if (res.status) {
      return res
    } else {
      throw new Error()
    }
  } catch (error) {
    return {
      message: "",
      status: false
    }
  }
}

export default apiAdminDeleteDirective
