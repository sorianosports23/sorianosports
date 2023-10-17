import api from "../../apiRoute"

const apiGetDirective = async (): Promise<TApiGetDirectiveResponse> => {
  try {
    const req = await fetch(`${api}/directive/getDirective.php`)
    return await req.json() as TApiGetDirectiveResponse
  } catch (error) {
    return {
      status: false,
      data: []
    }
  }
}

export default apiGetDirective
