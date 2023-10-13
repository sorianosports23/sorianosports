import apiLoaded from "../../utils/apiLoaded"
import api from "../../utils/apiRoute"
import newsDemo from "../../utils/demo/news"

const apiGetRecentNews = async (): Promise<TApiGetRecentNewsResponse> => {

  if (!apiLoaded) {
    return {
      status: true,
      data: [
      ]
    }
  }

  try {
    const res = await fetch(`${api}/news/getRecentNews.php`)
    return await res.json() as TApiGetRecentNewsResponse
  } catch (error) {
    return {
      status: false,
      data: []
    }
  }
}

export default apiGetRecentNews
