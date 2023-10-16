import api from "../apiRoute";

const apiAdminGetUsers = async ({token, pag}: TApiGetUsersRequest): Promise<IApiGetUsersResponse> => {
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
