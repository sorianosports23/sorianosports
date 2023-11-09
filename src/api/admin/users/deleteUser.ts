import api from "../../apiRoute"

const apiAdminDeleteUser = async ({ token, username }: TApiAdminDeleteUser): Promise<TApiResponse> => {
  try {
    const res = await fetch(`${api}/users/deleteUser.php`, {
      method: "POST",
      headers: {
        Authorization: `SPToken ${token}`
      },
      body: JSON.stringify({username})
    })

    return await res.json() as TApiResponse
  } catch (error) {
    return {
      status: false,
      message: "Ocurrio un error inesperado"
    }
  }
}

export default apiAdminDeleteUser
