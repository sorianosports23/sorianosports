import api from "../apiRoute"

const apiGetRecentNews = async (): Promise<TApiGetRecentNewsResponse> => {
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
