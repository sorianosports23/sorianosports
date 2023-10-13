import api from "../../utils/apiRoute"

const apiAdminAddNews = async ({ token, title, description, image, content }: TApiAddNewsRequest) => {
  try {
    const newsData = new FormData()
    newsData.set("title", title)
    newsData.set("description", description)
    newsData.append("image", image)
    newsData.set("content", content)

    const req = await fetch (`${api}/news/addNews.php`, {
      method: "POST",
      body: newsData
    })

    const res = await req.json()

    console.log(res)
  } catch (error) {
    
  }
}

export default apiAdminAddNews
