import api from "../../apiRoute"

const apiAdminAddFaq = async ({ question, response, token }: TApiAdminAddFaqRequest): Promise<TApiResponse> => {
  try {
    const data = {
      name: question,
      response
    }

    const res = await fetch (`${api}/faq/addFaq.php`, {
      method: "POST",
      headers: {
        Authorization: `SPToken ${token}`
      },
      body: JSON.stringify(data)
    })

    return await res.json() as TApiResponse
  } catch (error) {
    return {
      status: false,
      message: "Ocurrio un error inesperado"
    }
  }
}

export default apiAdminAddFaq
