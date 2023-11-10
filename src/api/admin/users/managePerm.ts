import api from "../../apiRoute"

const apiAdminManagePerm = async ({ token, username, grant, permission }: TApiAdminManagePermRequest): Promise<TApiResponse> => {
  try {
    const data = {
      username,
      permission
    }

    let route = ""

    grant 
      ? route = addPerm()
      : route = delPerm()

    const res = await fetch(`${route}`, {
      method: "POST",
      headers: {
        Authorization: `SPToken ${token}`,
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

const addPerm = () => {
  return `${api}/users/modifyPermission.php`
}

const delPerm = () => {
  return ``
}

export default apiAdminManagePerm
