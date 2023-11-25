import api from "../apiRoute";

const apiLogin = async ({ username, password }: TApiLoginRequest): Promise<IApiLoginResponse> => {
  try {
    const userData = {
      username,
      password
    }

    const req = await fetch(`${api}/auth/login.php`, {
      method: "POST",
      body: JSON.stringify(userData)
    })

    return await req.json() as IApiLoginResponse
  } catch (error: any) {
    console.log("Catch error", error)
    return {
      status: false,
      message: "Ocurrio un error inesperado",
      err: "unknown"
    }
  }
}

export default apiLogin