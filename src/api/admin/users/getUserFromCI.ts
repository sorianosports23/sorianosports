import api from "../../apiRoute"

const apiGetUserFromCI = async ({ token, ci }: TApiGetUserFromCIRequest): Promise<IApiGetUserFromUsernameResponse> => {
  try {
    const res = await fetch(`${api}/users/getSearchCi.php?ci=${ci}`)
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

export default apiGetUserFromCI
