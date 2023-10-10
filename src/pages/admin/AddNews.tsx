import Admin from "./Admin"
import styles from "../../css/admin/news/addNews.module.css"
import { BsFillCloudUploadFill, BsListUl, BsTypeBold, BsTypeItalic, BsTypeUnderline } from "react-icons/bs"
import { useState } from "react"
import PrevNews from "./PrevNews"

const AddNews = () => {

  const [newsContent, setNewsContent] = useState("")
  const [modalPrev, setModalPrev] = useState(true)

  const addTextBold = () => {
    setNewsContent(prev => {
      return prev + '{bold=""}'
    })
  }

  const addTextItalic = () => {
    setNewsContent(prev => {
      return prev + '{italic=""}'
    })
  }

  const addTextUnderline = () => {
    setNewsContent(prev => {
      return prev + '{underline=""}'
    })
  }

  return (
    <>
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
          <button 
            title="Negrita"
            onClick={() => addTextBold()}
          >
            <BsTypeBold/>
          </button>
          <button 
            title="Italica"
            onClick={() => addTextItalic()}
          >
            <BsTypeItalic/>
          </button>
          <button 
            title="Subrayado"
            onClick={() => addTextUnderline()}
          >
            <BsTypeUnderline/>
          </button>
          <button title="Lista">
            <BsListUl/>
          </button>
        </div>

        <div className={styles.news_note_cont}>
          <textarea value={newsContent} onChange={(ev) => setNewsContent(ev.target.value)}></textarea>
        </div>
      </div>

      <div className={styles.news_send}>
        <button onClick={() => setModalPrev(true)}>Subir noticia</button>
      </div>
    </Admin>

    <PrevNews
      text={newsContent}
      open={modalPrev}
      close={() => setModalPrev(false)}
    />
    </>
  )
}

export default AddNews
