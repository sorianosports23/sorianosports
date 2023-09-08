import { Link } from "react-router-dom"
import assetsFolder from "../../utils/publicfolder"
import styles from "../../css/news/NewsCard.module.css"
import { BsPerson } from "react-icons/bs"

type TNewsCardProps = {
  title: string
  description: string
  date: string
  img: string
  id: number
  author?: string
}

const NewsCard = ({ title, description, date, img, author, id }: TNewsCardProps) => {

  const imgSrc = img.includes("https") 
                  ? img
                  : `${assetsFolder}/img/${img}`

  return (
    <Link to={`/noticias/${id}`} className={styles.card}>
      <div className={styles.img}>
        <img src={imgSrc} alt="news" />
      </div>

      <div className={styles.body}>
        <h3>{title}</h3>
        <p>{description}</p>
      </div>

      <div className={styles.footer}>
        <img src={assetsFolder + "/img/secretaria_deportes.svg"} alt="logo" />
        {
          author && <span><BsPerson/> {author}</span>
        }

        <span>{date}</span>
      </div>
    </Link>
  )
}

export type { TNewsCardProps }
export default NewsCard 
