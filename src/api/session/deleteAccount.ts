import api from "../apiRoute";

const apiDeleteAccount = async ({ token, password }: TApiDeleteAccountRequest): Promise<IApiDeleteAccountResponse>  => {
  try {
    const SPToken = `SPToken ${token}`

    const userData = {
      password
    }

    const req = await fetch(`${api}/users/deleteAccount.php`, {
      method: "DELETE",
      headers: {
        Authorization: SPToken
      },
      body: JSON.stringify(userData)
    })

    const res = await req.json()

    if (!res.status) throw new Error(res.message, {cause: "php"})

    return res as IApiDeleteAccountResponse
  } catch (error: any) {
    return {
      authorization: false,
      message: error.message,
      status: false
    }
  }
}

export default apiDeleteAccount