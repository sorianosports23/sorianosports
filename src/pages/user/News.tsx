import NewsCard from "../../components/news/NewsCard"
import Container from "../../components/templates/Container"
import User from "./User"
import styles from "../../css/news/News.module.css"
import { FormEvent, useEffect, useState } from "react"
import NewsRecents from "../../components/news/NewsRecents"
import { BsList, BsNewspaper, BsSearch } from "react-icons/bs"
import { FaRegFaceFrown } from "react-icons/fa6"
import Loading from "../Loading"
import apiGetNews from "../../api/page/getNews"
import apiGetRecentNews from "../../api/page/getRecentNews"

const IMG_PLACEHOLDER = "img_placeholder.png"

type TFiltersBy = "Titulo" | "Autor" | "Fecha" | undefined
const FILTERSBY_INITIALSTATE: TFiltersBy[] = ["Titulo", "Autor", "Fecha"]
enum EFiltersBy {
  Titulo = "title",
  Autor = "author",
  Fecha = "date"
}

const News = () => {

  const [loading, setLoading] = useState(true)

  const [ recentsNews, setRecentsNews ] = useState<Array<TNews>>([])
  const [ allNews, setAllNews ] = useState<Array<TNews>>([])

  const [searchValue, setSearchValue] = useState("")
  const [newsResult, setNewsResult] = useState<Array<TNews>>([])
  const [newsSearched, setNewsSearched] = useState(false)

  const [ filtersOpen, setFiltersOpen ] = useState(false)
  const [ filterSelected, setFilterSelected ] = useState<TFiltersBy>(undefined)
  const [ filtersAvailable, setFiltersAvailable ] = useState<Array<TFiltersBy>>(FILTERSBY_INITIALSTATE)

  useEffect(() => {
    setFiltersAvailable(FILTERSBY_INITIALSTATE.filter(filter => filter !== filterSelected))
  }, [filterSelected])

  const handleSubmit = (ev: FormEvent) => {
    ev.preventDefault()
  }

  const getRecentsNewsFromApi = async () => {
    const news = await apiGetRecentNews()

    if (news.status) {
      console.log(news)
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

  useEffect(() => {
    console.log(recentsNews)
  }, [recentsNews])

  if (loading) {
    return <Loading/>
  }

  return (
    <User>
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
                    No hay mas noticias que cargar
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
              {/* <div className={styles.filters}>
                <form className={styles.filter_by} onSubmit={handleSubmit}>
                  <div className={styles.filters_by}
                    data-open={filtersOpen}
                  >
                    <button type="button"
                      onClick={() => setFiltersOpen(!filtersOpen)}
                    >
                      {
                        filterSelected
                          ? filterSelected
                          : <><BsList/>Filtrar por</>
                      }
                    </button>

                    <ul className={styles.filter_by_list}>
                      {
                        filtersAvailable.map((filter, i) => (
                          <li key={i}>
                            <button 
                              type="button"
                              onClick={() => {
                                setFiltersOpen(false)
                                setFilterSelected(filter)
                              }}
                            >
                              {filter}
                            </button>
                          </li>
                        ))
                      }
                    </ul>
                  </div>

                  <div>
                    <input type="text" 
                      value={searchValue}
                      onChange={(ev) => setSearchValue(ev.target.value)}
                    />
                  </div>

                  <div>
                    <button type="submit"><BsSearch/></button>
                  </div>
                </form>
              </div>

              <div className={styles.news_results}>
                {
                  newsSearched ? newsResult.length > 0
                    ? newsResult.map((news, i) => (
                      <NewsCard
                        {...news}
                      />
                    ))
                    : <div className={styles.no_results}>
                        <FaRegFaceFrown/>
                        No se encontraron resultados
                      </div>
                    : <></>
                }
              </div> */}
            </div>
          </div>
        </div>
      </Container>
    </User>
  )
}

export default News
