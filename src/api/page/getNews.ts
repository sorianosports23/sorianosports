import api from "../apiRoute"

const apiGetNews = async (pag: number = 1): Promise<TApiGetNewsResponse> => {
  try {
    const res = await fetch(`${api}/news/getNews.php?pag=${pag}`)
    return await res.json() as TApiGetNewsResponse
  } catch (error) {
    return {
      status: false,
      data: [],
      pagination: {
        totalPages: 0,
        currentPage: 0
      }
    }
  }
}

export default apiGetNews
