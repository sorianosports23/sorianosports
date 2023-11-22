import api from "../apiRoute"

const apiGetPermissions = async (token: string): Promise<TApiGetPermissions> => {
  try {
    const res = await fetch(`${api}/users/getMyPermissions.php`, {
      headers: {
        Authorization: `SPToken ${token}`
      }
    })
    return await res.json() as TApiGetPermissions
  } catch (error) {
    return {
      username: "",
      permissions: []
    }
  }
}

export default apiGetPermissions
