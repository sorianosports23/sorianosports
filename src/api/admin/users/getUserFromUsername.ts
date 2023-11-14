import api from "../../apiRoute"

const apiGetUserFromUsername = async ({ token, username }: TApiGetUserFromUsernameRequest): Promise<IApiGetUserFromUsernameResponse> => {
  try {
    const res = await fetch(`${api}/users/getSearchUser.php?username=${username}`)
    return await res.json() as IApiGetUserFromUsernameResponse
  } catch (error) {
    return {
      status: false,
      message: "Ocurrio un error inesperado",
      data: {
        username: "",
        fullname: "",
        email: "",
        age: 0,
        phone: 0,
        ci: 0,
        permissions: []
      }
    }
  }
}

export default apiGetUserFromUsername