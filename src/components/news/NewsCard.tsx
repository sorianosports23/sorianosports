import { Link } from "react-router-dom"
import assetsFolder from "../../utils/publicfolder"
import styles from "../../css/news/NewsCard.module.css"
import { BsPerson } from "react-icons/bs"
import api from "../../utils/apiRoute"

type TNewsCardProps = {
  name: string
  description: string
  date: string
  img: string
  id: number
  author?: string
}

const NewsCard = ({ name, description, image, id }: TNews) => {

  const imgSrc = api + image

  return (
    <Link to={`/noticias/leer/${id}`} className={styles.card}>
      <div className={styles.img}>
        <img src={imgSrc} alt="news" />
      </div>

      <div className={styles.body}>
        <h3>{name}</h3>
        <p>{description}</p>
      </div>

      <div className={styles.footer}>
        <img src={assetsFolder + "/img/secretaria_deportes.svg"} alt="logo" />
        {
          // author && <span><BsPerson/> {author}</span>
        }

        {/* <span>{date}</span> */}
      </div>
    </Link>
  )
}

export type { TNewsCardProps }
export default NewsCard 
