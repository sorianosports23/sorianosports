import NewsCard from "../../components/news/NewsCard"
import Container from "../../components/templates/Container"
import User from "./User"
import styles from "../../css/news/News.module.css"
import { FormEvent, useEffect, useState } from "react"
import NewsRecents from "../../components/news/NewsRecents"
import { BsList, BsSearch } from "react-icons/bs"
import newsDemo from "../../utils/demo/news"
import { FaRegFaceFrown } from "react-icons/fa6"
import Loading from "../Loading"
import apiGetNews from "../../api/page/getNews"
import apiGetRecentNews from "../../api/page/getRecentNews"

const IMG_PLACEHOLDER = "img_placeholder.png"

const getNews = (id: number, author: boolean) => {
  if (author) {
    return newsDemo[id]
  } else {
    const { author, ...restOfProps } = newsDemo[id]
    return restOfProps
  }
}

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

  const [searchValue, setSearchValue] = useState("")
  const [newsResult, setNewsResult] = useState<Array<TNews>>([])
  const [newsSearched, setNewsSearched] = useState(false)

  const [ filtersOpen, setFiltersOpen ] = useState(false)
  const [ filterSelected, setFilterSelected ] = useState<TFiltersBy>(undefined)
  const [ filtersAvailable, setFiltersAvailable ] = useState<Array<TFiltersBy>>(FILTERSBY_INITIALSTATE)

  useEffect(() => {
    setFiltersAvailable(FILTERSBY_INITIALSTATE.filter(filter => filter !== filterSelected))
  }, [filterSelected])

  // const handleSearch = () => {
  //   setNewsSearched(true)
  //   if (!filterSelected || !searchValue) {
  //     setNewsResult([])
  //     return
  //   }
  //   const results: Array<TNewsCardProps> = []
  //   newsDemo.map((news) => {
  //     if (news[EFiltersBy[filterSelected as keyof typeof EFiltersBy]]
  //         .toLowerCase()
  //         .includes(searchValue.toLowerCase())) {
  //       results.push(news)
  //     }
  //     return null
  //   })

  //   console.log(newsDemo[0][EFiltersBy[filterSelected as keyof typeof EFiltersBy]])

  //   setNewsResult(results)
  // }

  const handleSubmit = (ev: FormEvent) => {
    ev.preventDefault()
    // handleSearch()
  }

  const getNewsFromApi = async () => {
    const news = await apiGetRecentNews()

    if (news.status) {
      console.log(news)
      setRecentsNews(news.data)
    }
    setLoading(false)
  }

  useEffect(() => {
    getNewsFromApi()
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
              <h2>Buscador</h2>
              <div className={styles.separator}></div>
            </div>

            <div className={styles.filters_cont}>
              <div className={styles.filters}>
                <form className={styles.filter_by} onSubmit={handleSubmit}>
                  <div className={styles.filters_by}
                    data-open={filtersOpen}
                    // onPointerLeave={() => setFiltersOpen(false)}
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
              </div>
            </div>
          </div>
        </div>
      </Container>
    </User>
  )
}

export default News
