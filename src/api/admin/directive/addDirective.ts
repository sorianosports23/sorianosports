import api from "../../apiRoute"

const apiAdminAddDirective = async ({ token, name, rank, image }: TApiAdminAddDirectiveRequest): Promise<IApiAdminAddDirectiveResponse> => {
  try {
    const bodyData = new FormData()
    bodyData.set("name", name)
    bodyData.set("rank", rank)
    bodyData.append("image", image)

    const req = await fetch(`${api}/directive/addDirective.php`, {
      method: "POST",
      headers: {
        Authorization: `SPToken ${token}`
      },
      body: bodyData
    })

    return await req.json()
  } catch (error) {
    return {
      status: false,
      message: "Ocurrio un error inesperado"
    }
  }
}

export default apiAdminAddDirective
