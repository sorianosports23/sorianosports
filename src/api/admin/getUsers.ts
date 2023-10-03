import api from "../../utils/apiRoute";
import apiLoaded from "../../utils/apiLoaded";

const apiAdminGetUsers = async ({token, pag}: TApiGetUsersRequest): Promise<IApiGetUsersResponse> => {
  if (!apiLoaded) {
    return {
      status: false,
      err: "La api no esta cargada",
      data: [],
      pagination: {
        totalPages: 0,
        currentPage: 0,
        maxUsers: 0
      }
    }
  }

  try {
    const req = await fetch(`${api}/users/getUsers.php?pag=${pag}`, {
      headers: {
        "Authorization": `SPToken ${token}`
      }
    })

    const res = await req.json() as IApiGetUsersResponse
    if (!res.status) throw new Error(res.err, {cause: "php"})
    return res
  } catch (error: any) {
    return {
      status: false,
      err: error.message,
      data: [],
      pagination: {
        totalPages: 0,
        currentPage: 0,
        maxUsers: 0
      },
    }
  }
}

export default apiAdminGetUsers
