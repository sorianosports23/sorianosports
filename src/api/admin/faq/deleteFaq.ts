import api from "../../apiRoute"

const apiAdminDeleteFaq = async ({ token, id }: {token:string,id:number}): Promise<TApiResponse> => {
  try {
    const res = await fetch (`${api}/faq/deleteFaq.php`, {
      method: "POST",
      headers: {
        Authorization: `SPToken ${token}`
      },
      body: JSON.stringify({id})
    })
    return await res.json() as TApiResponse
  } catch (error) {
    return {
      status: false,
      message: "Ocurrio un error inesperado"
    }
  }
}

export default apiAdminDeleteFaq
