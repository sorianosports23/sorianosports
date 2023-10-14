import Admin from "./Admin"
import styles from "../../css/admin/news/News.module.css"
import { Link } from "react-router-dom"
import { BsPlus, BsPlusLg } from "react-icons/bs"
import { useEffect, useState } from "react"
import apiGetNews from "../../api/page/getNews"
import NewsCard from "../../components/admin/news/NewsCard"

const News = () => {

  const [news, setNews] = useState<TNews[]>([])

  const getNews = async (pag: number = 1) => {
    const allNews = await apiGetNews(pag)
    console.log(allNews)
    if (allNews.status) {
      setNews(allNews.data)
    }
  }

  useEffect(() => {
    getNews()
  }, [])

  return (
    <Admin route_title="Noticias">
      <div className={styles.management}>
        <Link to="/admin/news/add" className={styles.btn_add}><BsPlusLg/> Añadir noticia</Link>
      </div>

      <div className={styles.listNews}>
        {
          news.map((newsI, i) => (
            <NewsCard
              {...newsI}
              key={i}
            />
          ))
        }
      </div>
    </Admin>
  )
}

export default News
