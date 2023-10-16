import api from "../apiRoute"

const apiAdminAddNews = async ({ token, title, description, image, content, author }: TApiAddNewsRequest): Promise<TApiAddNewsResponse> => {
  try {
    const todayDate = new Date()
    const year = todayDate.getFullYear().toString()
    let month = (todayDate.getMonth()+1).toString()
    if (month.length < 2) month = `0${month}`
    let day = todayDate.getDate().toString()
    if (day.length < 2) day = `0${day}`
    const dateOfNews = `${year}${month}${day}`

    const newsData = new FormData()
    newsData.set("title", title)
    newsData.set("description", description)
    newsData.append("image", image)
    newsData.set("content", content)
    newsData.set("author", author)
    newsData.set("date", dateOfNews)

    const req = await fetch (`${api}/news/addNews.php`, {
      method: "POST",
      body: newsData
    })

    const res = await req.json()
    return res as TApiAddNewsResponse
  } catch (error) {
    return {
      status: false,
      message: ""
    }
  }
}

export default apiAdminAddNews
