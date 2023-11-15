import api from "../../apiRoute"

const apiAdminEditStatus = async ({ token, id, status }: TApiAdminEditStatusRequest): Promise<TApiResponse> => {
  try {
    const data = {
      id,
      status: "status",
      newStatus: status
    }

    const res = await fetch(`${api}/contact/editStatus.php`, {
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

export default apiAdminEditStatus
