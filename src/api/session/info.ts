import apiLoaded from "../../utils/apiLoaded";
import api from "../../utils/apiRoute";

const apiGetUserInfo = async ({ token }: TApiGetUserInfoRequest): Promise<TApiGetUserInfoResponse>  => {
  if (!apiLoaded) {
    return {
      authorization: false
    }
  }

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