import NewsCard from "../../components/news/NewsCard"
import Container from "../../components/templates/Container"
import User from "./User"
import styles from "../../css/news/News.module.css"
import { useEffect, useState } from "react"
import NewsRecents from "../../components/news/NewsRecents"
import { BsNewspaper} from "react-icons/bs"
import Loading from "../Loading"
import apiGetNews from "../../api/page/getNews"
import apiGetRecentNews from "../../api/page/getRecentNews"

const News = () => {

  const [loading, setLoading] = useState(true)

  const [ recentsNews, setRecentsNews ] = useState<Array<TNews>>([])
  const [ allNews, setAllNews ] = useState<Array<TNews>>([])

  const getRecentsNewsFromApi = async () => {
    const news = await apiGetRecentNews()

    if (news.status) {
      setRecentsNews(news.data)
    }
  }

  const [responseData, setResponseData] = useState({
    totalPages: 0,
    currentPage: 0
  })

  const getNewsFromApi = async (pag: number = 1) => {
    const news = await apiGetNews(pag)
    if (news.status) {
      setAllNews(prev => [...prev, ...news.data])
      setResponseData(news.pagination)
    }
  }

  useEffect(() => {
    (async () => {
      await getRecentsNewsFromApi()
      await getNewsFromApi()
      setLoading(false)
    })()
  }, [])

  if (loading) {
    return <Loading/>
  }

  return (
    <User pageTitle="Noticias">
      <Container>

        <div className={styles.recents}>
          <div>
            <h2>Noticias recientes</h2>
            <div className={styles.separator}></div>
          </div>
          <NewsRecents news={recentsNews}/>
        </div>

        <div className={styles.news_cont}>
          <div className={styles.news_filter}>
            <div>
              <h2>Noticias</h2>
              <div className={styles.separator}></div>
            </div>

            <div className={styles.filters_cont}>
              <div className={styles.news_results}>
                {
                  allNews.map((news, i) => (
                    <NewsCard 
                      {...news} 
                      key={i}
                    />
                  ))
                }
              </div>
              <div className={styles.res_info}>
                {
                  responseData.currentPage === responseData.totalPages
                  ?
                  <div className={styles.no_more}>
                    <BsNewspaper/>
                    No hay más noticias que cargar
                  </div>
                  :
                  <button 
                    className={styles.load_more}
                    onClick={() => getNewsFromApi(responseData.currentPage+1)}
                  >
                    CARGAR MAS
                  </button>
                }
              </div>
            </div>
          </div>
        </div>
      </Container>
    </User>
  )
}

export default News
