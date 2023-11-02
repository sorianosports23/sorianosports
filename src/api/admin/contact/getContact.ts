import api from "../../apiRoute"

const apiAdminGetContact = async ({ token, pag = 1 }: TApiAdminGetContactRequest): Promise<IApiAdminGetContactResponse> => {
  try {
    const res = await fetch(`${api}/contact/getcontactform.php?pag=${pag}`, {
      headers: {
        Authorization: `SPToken ${token}`
      }
    })
    return await res.json() as IApiAdminGetContactResponse
  } catch (error) {
    return {
      status: false,
      message: "Ocurrio un error inesperado",
      data: [],
      pagination: {
        totalPages: 0,
        currentPage: 0
      }
    }
  }
}

export default apiAdminGetContact
