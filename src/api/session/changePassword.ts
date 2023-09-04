import apiLoaded from "../../utils/apiLoaded";
import api from "../../utils/apiRoute";

const apiChangePassword = async ({ username, password, newPassword }: TApiChangePasswordRequest): Promise<IApiChangePasswordResponse> => {
  if (!apiLoaded) {
    return {
      status: true,
      message: ""
    }
  }

  try {
    const userData = {
      username,
      password,
      newPassword
    }

    const req = await fetch(`${api}/usuario/cambiarcontraseña.php`, {
      method: "PUT",
      body: JSON.stringify(userData)
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