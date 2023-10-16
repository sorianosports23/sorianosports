import api from "../apiRoute";

const apiChangeInfo = async ({ fullname, email, phone, token }: TApiChangeInfoRequest): Promise<IApiChangeInfoResponse> => {
  try {

    const userData = {
      fullname,
      email,
      phone
    }

    const req = await fetch(`${api}/users/editInfo.php`, {
      method: "PUT",
      body: JSON.stringify(userData),
      headers: {
        "Authorization": `SPToken ${token}`
      }
    })

    const res = await req.json() as IApiChangeInfoResponse

    if (!res.status) throw new Error(res.err, { cause: "php" })

    return res
  } catch (error: any) {
    if (error?.cause === "php") {
      return {
        status: false,
        message: "Ocurrio un error al actualizar los datos",
        err: error.message
      }
    }

    return {
      status: false,
      message: "Ocurrio un error inesperado"
    }
  }
}

export default apiChangeInfo
