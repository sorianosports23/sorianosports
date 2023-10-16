import api from "../apiRoute";

const apiChangePassword = async ({ username, password, newPassword, token }: TApiChangePasswordRequest): Promise<IApiChangePasswordResponse> => {
  try {
    const userData = {
      username,
      password,
      newPassword
    }

    const req = await fetch(`${api}/users/modifyPass.php`, {
      method: "PUT",
      body: JSON.stringify(userData),
      headers: {
        "Authorization": `SPToken ${token}`
      }
    })

    const res = await req.json() as IApiChangePasswordResponse

    if (!res.status) throw new Error(String(res.err), { cause: "php" })

    return res
  } catch (error: any) {

    if (error?.cause && error.cause === "php") {
      return {
        status: false,
        message: "Ocurrio un error al intentar iniciar sesión",
        err: error.message
      }
    }

    return {
      status: false,
      message: "Ocurrio un error al intentar cambiar la contraseña",
    }
  }
}

export default apiChangePassword