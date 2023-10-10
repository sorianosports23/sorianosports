import Admin from "./Admin"
import styles from "../../css/admin/news/addNews.module.css"
import { BsFillCloudUploadFill, BsListUl, BsTypeBold, BsTypeItalic, BsTypeUnderline } from "react-icons/bs"

const AddNews = () => {
  return (
    <Admin route_title="Agregar noticia">
      <div className={styles.news_info}>
        <h2>Información de la noticia</h2>
        <div className={styles.news_info_inputs}>
          <div>
            <label htmlFor="news_title">Título:</label>
            <input type="text" id="news_title"/>
          </div>

          <div>
            <label htmlFor="news_description">Descripción:</label>
            <textarea id="news_description"></textarea>
          </div>

          <div>
            <label htmlFor="news_img">Imagen destacada:</label>
            <label htmlFor="news_image">
              <BsFillCloudUploadFill/>
              Subir
            </label>
            <input type="file" id="news_image" />
          </div>
        </div>
      </div>

      <div className={styles.news_note}>
        <h2>Contenido</h2>
        <div className={styles.news_note_btns}>
          <button title="Negrita">
            <BsTypeBold/>
          </button>
          <button title="Italica">
            <BsTypeItalic/>
          </button>
          <button title="Subrayado">
            <BsTypeUnderline/>
          </button>
          <button title="Lista">
            <BsListUl/>
          </button>
        </div>

        <div className={styles.news_note_cont}>
          <textarea></textarea>
        </div>
      </div>

      <div className={styles.news_send}>
        <button>Subir noticia</button>
      </div>
    </Admin>
  )
}

export default AddNews
