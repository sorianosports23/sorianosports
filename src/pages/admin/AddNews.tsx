import Admin from "./Admin"
import styles from "../../css/admin/news/addNews.module.css"
import { BsCloudUploadFill, BsTypeBold, BsTypeItalic, BsTypeUnderline, BsUpload } from "react-icons/bs"
import { MutableRefObject, useContext, useEffect, useRef, useState } from "react"
import PrevNews from "./PrevNews"
import { userSessionContext } from "../../context/session/UserSessionContext"
import apiAdminAddNews from "../../api/admin/addNews"
import SendModal from "../../components/modal/SendModal"

const AddNews = () => {

  const { token, username } = useContext(userSessionContext)

  const [modalPrev, setModalPrev] = useState(false)

  const [newsTitle, setNewsTitle] = useState("")
  const [newsDescription, setNewsDescription] = useState("")
  const [newsImage, setNewsImage] = useState<any>(null)
  const [newsContent, setNewsContent] = useState("")

  const editorText = useRef<HTMLTextAreaElement>(null) as MutableRefObject<HTMLTextAreaElement>

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

  //!modal
  const [modalMessage, setModalMessage] = useState("")
  const [modalOpen, setModalOpen] = useState(false)
  //!

  const handleSubmitNews = async () => {
    if (!newsTitle ||!newsDescription ||!newsImage ||!newsContent) {
      alert("Preencha todos os campos")
    } else {
      const data = {
        title: newsTitle,
        description: newsDescription,
        image: newsImage,
        content: newsContent,
        token,
        author: username
      }

      const newsRes = await apiAdminAddNews(data)
      setModalPrev(false)

      if (newsRes.status) {
        setModalMessage("Se añadio la noticia")
        setModalOpen(true)
      } else {
        setModalMessage("No se pudo añadir la noticia")
        setModalOpen(true)
      }
    }
  }

  useEffect(() => {
    console.log(newsImage)
  }, [newsImage])

  useEffect(() => {
    const linesOfText = newsContent.split("\n").length

    if (editorText) {
      editorText.current.style.height = `${linesOfText > 3 ? linesOfText+4 : 6}rem`
    }
  }, [newsContent])

  return (
    <>
    <Admin route_title="Agregar noticia">
      <div className={styles.news_info}>
        <h2>Información de la noticia</h2>
        <div className={styles.news_info_inputs}>
          <div>
            <label htmlFor="news_title">Título:</label>
            <input type="text" id="news_title"
              value={newsTitle}
              onChange={ev => setNewsTitle(ev.target.value)}
            />
          </div>

          <div>
            <label htmlFor="news_description">Descripción:</label>
            <textarea id="news_description"
              value={newsDescription}
              onChange={ev => setNewsDescription(ev.target.value)}
            ></textarea>
          </div>

          <div>
            <label htmlFor="news_img">Portada:</label>
            <label htmlFor="news_image">
              <BsUpload/>
              Subir imagen
            </label>
            {
              newsImage?.name && <span className={styles.imgname}>{newsImage.name}</span>
            }
            <input type="file" id="news_image" 
              onChange={ev => {
                if (ev.target.files) {
                  setNewsImage(ev.target.files[0])
                }
              }}
              accept="image/png, image/jpeg, image/svg+xml, image/webp"
            />
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
        </div>

        <div className={styles.news_note_cont}>
          <textarea ref={editorText} value={newsContent} onChange={(ev) => setNewsContent(ev.target.value)}></textarea>
        </div>
      </div>

      <div className={styles.news_send}>
        <button 
          onClick={() => {
            setModalPrev(true)
          }}
        >
          <BsCloudUploadFill/> Publicar
        </button>
      </div>
    </Admin>

    <PrevNews
      text={newsContent}
      open={modalPrev}
      close={() => setModalPrev(false)}
      send={() => handleSubmitNews()}
    />

    <SendModal
      message={modalMessage}
      open={modalOpen}
      close={() => setModalOpen(false)}
    />
    </>
  )
}

export default AddNews
