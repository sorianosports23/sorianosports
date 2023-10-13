import { useLoaderData, useParams } from "react-router-dom"
import User from "./User"
import { useEffect } from "react"
import { BsPersonFill } from "react-icons/bs"
import styles from "../../css/news/ReadNews.module.css"
import Container from "../../components/templates/Container"
import api from "../../utils/apiRoute"

const ReadNews = () => {
  
  const newsParams = useParams()
  const loaderData = useLoaderData() as INews

  useEffect(() => {
    console.log(loaderData)
  }, [loaderData])
  
  return (
    <User>
      <Container>
        <div className={styles.news_cont}>
          <div className={styles.news_img}>
            <img src={api + loaderData.image} alt={`Imagén de noticia ${newsParams.id}`} />
          </div>
          <div className={styles.info}>
            <h1>{loaderData.name}</h1>
            <span>
              <BsPersonFill/>
              {/* {loaderData.author}, {loaderData.date} */}
            </span>
          </div>
          <div className={styles.note}>
            {
              loaderData.note
            }
          </div>
        </div>
      </Container>
    </User>
  )
}

export default ReadNews
