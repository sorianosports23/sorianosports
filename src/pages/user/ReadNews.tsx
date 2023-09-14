import { useLoaderData, useParams } from "react-router-dom"
import User from "./User"
import { useEffect } from "react"
import { BsPersonFill } from "react-icons/bs"
import styles from "../../css/news/ReadNews.module.css"
import Container from "../../components/templates/Container"

const ReadNews = () => {
  
  const newsParams = useParams()
  const loaderData = useLoaderData() as News

  useEffect(() => {
    console.log(loaderData)
  }, [loaderData])
  
  return (
    <User>
      <Container>
        <div className={styles.news_cont}>
          <div className={styles.news_img}>
            <img src={loaderData.img} alt={`Imagén de noticia ${newsParams.id}`} />
          </div>
          <div className={styles.info}>
            <h1>{loaderData.title}</h1>
            <span>
              <BsPersonFill/>
              {loaderData.author}, {loaderData.date}
            </span>
          </div>
          <div className={styles.note}>
            {
              loaderData.fullNote
            }
          </div>
        </div>
      </Container>
    </User>
  )
}

export default ReadNews
