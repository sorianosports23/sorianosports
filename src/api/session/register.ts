import api from "../apiRoute"

const apiRegister = async ({ username, fullname, password, email, age, phone, ci }: TApiRegisterRequest): Promise<TApiResponse> => {  
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

    return res
  } catch (error) {
    return {
      status: false,
      message: "Ocurrio un error al registrarse"
    }
  }
}

export default apiRegister