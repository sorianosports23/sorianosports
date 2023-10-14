import api from "../../utils/apiRoute"

const apiGetNewsId = async (id: number): Promise<TApiGetNewsIdResponse> => {
  try {
    const req = await fetch(`${api}/news/getNewsID.php?newsid=${id}`)
    return await req.json()
  } catch (error) {
    return {
      status: false,
      data: {
        name: "",
        description: "",
        note: "",
        image: "",
        id: 0,
        author: "",
        date: "",
      }
    }
  }
}

export default apiGetNewsId
