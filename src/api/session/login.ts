import apiLoaded from "../../utils/apiLoaded";
import api from "../../utils/apiRoute";

const apiLogin = async ({ username, password }: TApiLoginRequest): Promise<IApiLoginResponse> => {
  if (!apiLoaded) {
    return {
      status: true,
      message: ""
    }
  }
  
  try {
    const userData = {
      username,
      password
    }

    const req = await fetch(`${api}/auth/login.php`, {
      method: "POST",
      body: JSON.stringify(userData)
    })

    const res = await req.json() as IApiLoginResponse

    if (!res.status) throw new Error()

    return res
  } catch (error) {
    return {
      status: false,
      message: "Ocurrio un error al intentar iniciar sesión"
    }
  }
}

export default apiLogin