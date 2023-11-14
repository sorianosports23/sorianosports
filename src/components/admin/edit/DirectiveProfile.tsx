import { BsImageFill, BsUpload, BsXLg } from "react-icons/bs"
import modalStyles from "../../../css/Modal.module.css"
import formStyles from "../../../css/admin/directive/Directive.module.css"
import { ChangeEvent, FormEvent, useContext, useEffect, useState } from "react"
import apiAdminModifyDirective from "../../../api/admin/directive/modifyDirective"
import { userSessionContext } from "../../../context/session/UserSessionContext"
import Loader from "../../Loader"

type TDirectiveProfileProps = {
  open: boolean
  close: () => void
  name: string
  rank: string
  img: string
  id: number
  handleEdit: (status: boolean) => void
}

const DirectiveProfile = ({ open, close, id, name, rank, img, handleEdit }: TDirectiveProfileProps) => {

  const { token } = useContext(userSessionContext)

  const [directiveName, setDirectiveName] = useState(name)
  const [directiveRank, setDirectiveRank] = useState(rank)
  const [directiveImg, setDirectiveImg] = useState<any>(null)
  const [directiveImgUrl, setDirectiveImgUrl] = useState(img)

  const [btnLoading, setBtnLoading] = useState(false)

  useEffect(() => {
    if (open) {
      setDirectiveName(name)
      setDirectiveRank(rank)
      setDirectiveImgUrl(img)
    }
  }, [open, name, rank, img])

  const [errorsInputs, setErrorInputs] = useState({
    name: "false",
    rank: "false",
    image: "false"
  })

  const handleChangeImage = (ev: ChangeEvent<HTMLInputElement>) => {
    if (ev.target.files && ev.target.files[0]) {
      setDirectiveImg(ev.target.files[0])
      const urlImg = URL.createObjectURL(ev.target.files[0])
      setDirectiveImgUrl(urlImg)
      setErrorInputs(prev => {
        const { image, ...rest } = prev
        return {
          image: "false",
          ...rest
        }
      })
    }
  }

  const handleSubmit = async (ev: FormEvent) => {
    ev.preventDefault()

    setBtnLoading(true)

    const data: TApiAdminModifyDirectiveParams = {
      token,
      id,
      name: directiveName,
      rank: directiveRank
    }

    if (directiveImg) {
      data.img = directiveImg
    }

    const req = await apiAdminModifyDirective(data)
    if (req.status) {
      handleEdit(true)
    } else {
      handleEdit(false)
    }

    setBtnLoading(false)
  }

  return (
    <div className={modalStyles.cont} data-open={open}>
      <form className={modalStyles.modal} onSubmit={handleSubmit}>
        <div className={modalStyles.header}>
          <h2>Editar perfil</h2>
          <button>
            <BsXLg/>
          </button>
        </div>

        <div>
          <div className={formStyles.form}>
            <div className={formStyles.img_cont}>
              <div className={formStyles.img}>
                {
                  directiveImgUrl
                    ? <img src={directiveImgUrl} alt="img" />
                    : <BsImageFill/>
                } 
              </div>
              <label htmlFor="add_img"><BsUpload/> Subir imagen</label>
              <input 
                type="file"
                accept="image/png, image/jpeg, image/svg+xml, image/webp"
                className="hidden"
                id="add_img"
                onChange={handleChangeImage}
              />
            </div>
            <div>
              <label htmlFor="d_name">Nombre:</label>
              <input 
                type="text" 
                id="d_name"
                value={directiveName}
                onChange={(ev) => {
                  setDirectiveName(ev.target.value)
                  setErrorInputs(prev => {
                    const { name, ...rest } = prev
                    return {
                      name: "false",
                      ...rest
                    }
                  })
                }}
              />
            </div>
            <div>
              <label htmlFor="d_rank">Rango/Función:</label>
              <input 
                type="text" 
                id="d_rank"
                value={directiveRank}
                onChange={(ev) => {
                  setDirectiveRank(ev.target.value)
                  setErrorInputs(prev => {
                    const { rank, ...rest } = prev
                    return {
                      rank: "false",
                      ...rest
                    }
                  })
                }}
              />
            </div>
          </div>
        </div>

        <div className={`${modalStyles.footer} ${modalStyles.btns}`}>
          <button
            className={modalStyles.btn_cancel}
            onClick={close}
            type="button"
          >
            Cancelar
          </button>

          <button
            className={modalStyles.btn_accept}
            type="submit"
            disabled={btnLoading}
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

export default DirectiveProfile
