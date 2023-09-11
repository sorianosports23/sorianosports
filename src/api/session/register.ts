import apiLoaded from "../../utils/apiLoaded"
import api from "../../utils/apiRoute"

const apiRegister = async ({ username, password, email, phone, ci }: TApiRegisterRequest): Promise<TApiResponse> => {
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
      email,
      phone,
      ci
    }

    const req = await fetch(`${api}/usuario/register.php`, {
      method: "POST",
      body: JSON.stringify(userData)
    })

    const res = await req.json() as TApiResponse

    if (!res.status) {
      throw new Error()
    }

    return res
  } catch (error) {
    return {
      status: false,
      message: "Ocurrio un error al registrarse"
    }
  }
}

export default apiRegister