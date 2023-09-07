import { Link } from "react-router-dom"
import assetsFolder from "../../utils/publicfolder"
import styles from "../../css/news/NewsCard.module.css"

const NewsCard = () => {
  return (
    <Link to="/noticias" className={styles.card}>
      <div className={styles.img}>
        <img src={assetsFolder + "/img/img_placeholder.png"} alt="news" />
      </div>

      <div className={styles.body}>
        <h3>Titulo</h3>
        <p>Descripcion de noticia para describir la noticia resumidamente asi a alguien le puede atraer y dar click a la noticia para leer la nota completa y de esta forma informarse sobre esta noticia</p>
      </div>

      <div className={styles.footer}>
        <img src={assetsFolder + "/img/secretaria_deportes.svg"} alt="logo" />
        <span>12/08/2023</span>
      </div>
    </Link>
  )
}

export default NewsCard 
