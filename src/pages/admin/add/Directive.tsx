import { BsCloudUploadFill, BsImageFill, BsUpload } from "react-icons/bs"
import Admin from "../Admin"
import { ChangeEvent, FormEvent, useContext, useEffect, useState } from "react"
import { userSessionContext } from "../../../context/session/UserSessionContext"
import apiAdminAddDirective from "../../../api/admin/directive/addDirective"
import styles from "../../../css/admin/directive/Directive.module.css"
import SendModal from "../../../components/modal/SendModal"

const Directive = () => {

  const { token } = useContext(userSessionContext)

  const [directiveName, setDirectiveName] = useState("")
  const [directiveRank, setDirectiveRank] = useState("")
  const [directiveImg, setDirectiveImg] = useState<any>(null)
  const [directiveImgUrl, setDirectiveImgUrl] = useState("")

  //! modal
  const [modalMessage, setModalMessage] = useState("")
  const [modalSMessage, setModalSMessage] = useState("")
  const [modalOpen, setModalOpen] = useState(false)
  //!

  //! error inputs
  const [errorsInputs, setErrorInputs] = useState({
    name: "false",
    rank: "false",
    image: "false"
  })
  //!

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

    const data: TApiAdminAddDirectiveRequest = {
      token,
      name: directiveName,
      rank: directiveRank,
      image: directiveImg
    }

    const res = await apiAdminAddDirective(data)
    console.log(res)

    if (res.status) {
      setModalMessage(`Se añadio a ${directiveName}`)
      setModalOpen(true)
    } else if (!res.status && res.input) {
      setErrorInputs(prev => {
        const key = res.input as keyof typeof prev
        return {
          ...prev,
          [key]: "true"
        }
      })
    } else {
      setModalMessage("No se pudo añadir")
      setModalOpen(true)
    }
  }

  useEffect(() => {
    console.log(errorsInputs)
  }, [errorsInputs])

  return (
    <>
    <Admin route_title="Agregar directiva">
      <form onSubmit={handleSubmit} className={styles.form}>
        <div 
          className={styles.img_cont}
        >
          <div 
            className={styles.img}
            data-invalid={errorsInputs.image}
          >
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
            data-invalid={errorsInputs.name}
          />
        </div>
        <div>
          <label htmlFor="d_rank">Rango:</label>
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
            data-invalid={errorsInputs.rank}
          />
        </div>
        <div>
          <button type="submit"><BsCloudUploadFill/> Publicar</button>
        </div>
      </form>
    </Admin>

    <SendModal
      open={modalOpen}
      message={modalMessage}
      otherMessage={modalSMessage}
      close={() => setModalOpen(false)}
    />

    </>
  )
}

export default Directive
