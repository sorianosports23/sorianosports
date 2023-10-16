import api from "../apiRoute"

const apiGetUserInfo = async ({ token }: TApiGetUserInfoRequest): Promise<TApiGetUserInfoResponse>  => {
  try {
    const SPToken = `SPToken ${token}`

    const req = await fetch(`${api}/users/getInfo.php`, {
      headers: {
        Authorization: SPToken
      }
    })

    const res = await req.json()

    return res as TApiGetUserInfoResponse
  } catch (error) {
    return {
      authorization: false
    }
  }
}

export default apiGetUserInfo