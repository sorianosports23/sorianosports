import apiLoaded from "../../utils/apiLoaded"
import api from "../../utils/apiRoute"
import newsDemo from "../../utils/demo/news"

const apiGetNews = async (pag: number = 1): Promise<TApiGetNewsResponse> => {

  if (!apiLoaded) {
    return {
      status: true,
      data: [],
      pagination: {
        totalPages: 1,
        currentPage: 1
      }
    }
  }

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
