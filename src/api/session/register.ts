import apiLoaded from "../../utils/apiLoaded"
import api from "../../utils/apiRoute"
import { registerUserInfo } from "../useDemo"

const apiRegister = async ({ username, fullname, password, email, age, phone, ci }: TApiRegisterRequest): Promise<TApiResponse> => {
  console.log(apiLoaded)
  if (!apiLoaded) {
    console.log("??")
    registerUserInfo({ username, fullname, password, email, age, phone, ci })

    return {
      status: true,
      message: ""
    }
  }  
  
  try {
    const userData = {
      username,
      fullname,
      password,
      email,
      age,
      phone,
      ci
    }

    console.log("MANDANDO PETICION")

    const req = await fetch(`${api}/users/addUser.php`, {
      method: "POST",
      body: JSON.stringify(userData)
    })

    console.log("PETICION RECIBIDA")

    const res = await req.json() as TApiResponse

    console.log("PETICION PARSEADA A JSON")

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