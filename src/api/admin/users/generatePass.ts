import api from "../../apiRoute"

const apiAdminGenPass = async ({ token, username, password }: TApiAdminGenPassRequest): Promise<TApiResponse> => {
  try {
    const data = {
      username,
      newPassword: password
    }

    const res = await fetch (`${api}/users/modifyPassAdmin.php`, {
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

export default apiAdminGenPass
