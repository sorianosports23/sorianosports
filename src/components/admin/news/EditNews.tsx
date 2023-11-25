import { BsTypeBold, BsTypeItalic, BsTypeUnderline, BsUpload, BsXLg } from "react-icons/bs"
import modalStyles from "../../../css/Modal.module.css"
import styles from "../../../css/admin/news/EditNews.module.css"
import { FormEvent, useContext, useEffect, useState } from "react"
import Loader from "../../Loader"
import { userSessionContext } from "../../../context/session/UserSessionContext"
import apiAdminModifyNews from "../../../api/admin/news/modifyNews"
import useCloseModalKey from "../../../utils/useCloseModalKey"

type TEditNewsProps = {
  open: boolean
  close: () => void
  id: number
  name: string
  description: string
  note: string
  editNews: (status: boolean) => void
}

const EditNews = ({ open, close, id, name, description, note, editNews }: TEditNewsProps) => {

  const { token } = useContext(userSessionContext)

  const [newsName, setNewsName] = useState(name)
  const [newsDescription, setNewsDescription] = useState(description)
  const [newsNote, setNewsNote] = useState(note)
  const [newsImage, setNewsImage] = useState<any>(null)

  const [btnLoading, setBtnLoading] = useState(false)

  useEffect(() => {
    setNewsName(name)
    setNewsDescription(description)
    setNewsNote(note)
  }, [name, description, note])

  const addTextBold = () => {
    setNewsNote(prev => {
      return prev + '{bold=""}'
    })
  }

  const addTextItalic = () => {
    setNewsNote(prev => {
      return prev + '{italic=""}'
    })
  }

  const addTextUnderline = () => {
    setNewsNote(prev => {
      return prev + '{underline=""}'
    })
  }

  const handleSubmit = async (ev: FormEvent) => {
    ev.preventDefault()

    if (!newsName || !newsDescription || !newsNote) return

    const data: TApiAdminModifyNewsParams = {
      token,
      id,
      name: newsName,
      description: newsDescription,
      note: newsNote
    }

    if (newsImage) {
      data.img = newsImage
    }

    const req = await apiAdminModifyNews(data)

    editNews(req.status)
    setBtnLoading(false)
  }

  return (
    <div 
      className={modalStyles.cont} 
      data-open={open}
      {...useCloseModalKey({ open, close })}
    >
      <form className={modalStyles.modal} onSubmit={handleSubmit}>
        <div className={modalStyles.header}>
          <h2>Editar noticia</h2>
          <button
            onClick={() => close()}
            type="button"
          >
            <BsXLg/>
          </button>
        </div>

        <div className={styles.form}>
          <div>
            <label htmlFor="news_name">Nombre:</label>
            <input 
              type="text" 
              id="news_name"
              value={newsName}
              onChange={(ev) => setNewsName(ev.target.value)}
            />
          </div>

          <div>
            <label htmlFor="news_description">Descripcion:</label>
            <textarea 
              id="news_description"
              value={newsDescription}
              onChange={(ev) => setNewsDescription(ev.target.value)}
            >
            </textarea>
          </div>

          <div>
            <label htmlFor="news_img"><BsUpload/> Subir nueva imagen</label>
            {
              newsImage?.name && <span className={styles.imgname}>{newsImage.name}</span>
            }
            <input 
              type="file" 
              accept="image/png, image/jpeg, image/svg+xml, image/webp"
              className="hidden"
              id="news_img"
              onChange={(ev) => {
                if (ev.target.files) {
                  setNewsImage(ev.target.files[0])
                }
              }}
            />
          </div>

          <div>
            <div className={styles.btns}>
              <button
                title="Negrita"
                type="button"
                onClick={() => addTextBold()}
              >
                <BsTypeBold/>
              </button>
              <button
                title="Italica"
                type="button"
                onClick={() => addTextItalic()}
              >
                <BsTypeItalic/>
              </button>
              <button
                title="Subrayado"
                type="button"
                onClick={() => addTextUnderline()}
              >
                <BsTypeUnderline/>
              </button>
            </div>

            <div>
              <textarea
                value={newsNote}
                onChange={(ev) => setNewsNote(ev.target.value)}
              >
              </textarea>
            </div>
          </div>
        </div>

        <div className={`${modalStyles.footer} ${modalStyles.btns}`}>
          <button
            onClick={close}
            className={modalStyles.btn_cancel}
            type="button"
          >
            Cancelar
          </button>

          <button
            className={modalStyles.btn_accept}
            disabled={btnLoading}
            type="submit"
          >
            {
              btnLoading
                ? <Loader/>
                : "Aceptar"
            }
          </button>
        </div>
      </form>
    </div>
  )
}

export default EditNews
