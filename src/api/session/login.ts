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

    if (!res.status) throw new Error(JSON.stringify({ message: res.message, err: res.err }), {cause: "php"})

    return res
  } catch (error: any) {
    if (error.cause === "php") {
      const err = JSON.parse(error.message)
      return {
        status: false,
        message: err.message,
        err: err.err
      }
    }
    return {
      status: false,
      message: "Ocurrio un error inesperado",
      err: "unknown"
    }
  }
}

export default apiLogin