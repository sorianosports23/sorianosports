import NewsCard, { TNewsCardProps } from "../../components/news/NewsCard"
import Container from "../../components/templates/Container"
import User from "./User"
import styles from "../../css/news/News.module.css"
import { useEffect, useState } from "react"
import NewsRecents from "../../components/news/NewsRecents"
import { BsList, BsSearch } from "react-icons/bs"

const IMG_PLACEHOLDER = "../img_placeholder.png"

const NEWS_RECENTS_INITALSTATE: TNewsCardProps[] = [
  { title: "Titulo 1", description: "Descripcion 1", img: IMG_PLACEHOLDER, date: "12/02/23" },
  { title: "Titulo 2", description: "Descripcion 2", img: IMG_PLACEHOLDER, date: "12/05/23" },
  { title: "Titulo 3", description: "Descripcion 3", img: IMG_PLACEHOLDER, date: "17/09/23" }
]

type TFiltersBy = "Titulo" | "Autor" | "Fecha" | undefined
const FILTERSBY_INITIALSTATE: TFiltersBy[] = ["Titulo", "Autor", "Fecha"]

const News = () => {

  const [ recentsNews, setRecentsNews ] = useState<Array<TNewsCardProps>>(NEWS_RECENTS_INITALSTATE)

  const [ filtersOpen, setFiltersOpen ] = useState(false)
  const [ filterSelected, setFilterSelected ] = useState<TFiltersBy>(undefined)
  const [ filtersAvailable, setFiltersAvailable ] = useState<Array<TFiltersBy>>(FILTERSBY_INITIALSTATE)

  useEffect(() => {
    setFiltersAvailable(FILTERSBY_INITIALSTATE.filter(filter => filter !== filterSelected))
  }, [filterSelected])

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
                <form className={styles.filter_by}>
                  <div className={styles.filters_by}
                    data-open={filtersOpen}
                    onPointerLeave={() => setFiltersOpen(false)}
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
                              onClick={() => setFilterSelected(filter)}
                            >
                              {filter}
                            </button>
                          </li>
                        ))
                      }
                    </ul>
                  </div>

                  <div>
                    <input type="text" />
                  </div>

                  <div>
                    <button type="submit"><BsSearch/></button>
                  </div>
                </form>
              </div>
            </div>
          </div>
          {/* <NewsCard title={""} description={""} date={""} img={""}/>
          <NewsCard title={""} description={""} date={""} img={""}/>
          <NewsCard title={""} description={""} date={""} img={""}/>
          <NewsCard title={""} description={""} date={""} img={""}/>
          <NewsCard title={""} description={""} date={""} img={""}/>
          <NewsCard title={""} description={""} date={""} img={""}/>
          <NewsCard title={""} description={""} date={""} img={""}/>
          <NewsCard title={""} description={""} date={""} img={""}/>
          <NewsCard title={""} description={""} date={""} img={""}/>
          <NewsCard title={""} description={""} date={""} img={""}/> */}
        </div>
      </Container>
    </User>
  )
}

export default News
