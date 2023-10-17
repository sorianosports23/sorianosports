import { BsUpload } from "react-icons/bs"
import Admin from "../Admin"
import { ChangeEvent, FormEvent, useContext, useState } from "react"
import { userSessionContext } from "../../../context/session/UserSessionContext"
import apiAdminAddDirective from "../../../api/admin/directive/addDirective"

const Directive = () => {

  const { token } = useContext(userSessionContext)

  const [directiveName, setDirectiveName] = useState("")
  const [directiveRank, setDirectiveRank] = useState("")
  const [directiveImg, setDirectiveImg] = useState<any>(null)
  const [directiveImgUrl, setDirectiveImgUrl] = useState("")

  const handleChangeImage = (ev: ChangeEvent<HTMLInputElement>) => {
    if (ev.target.files && ev.target.files[0]) {
      setDirectiveImg(ev.target.files[0])
      const urlImg = URL.createObjectURL(ev.target.files[0])
      setDirectiveImgUrl(urlImg)
    }
  }

  const handleSubmit = async (ev: FormEvent) => {
    ev.preventDefault()

    if (!directiveName || !directiveRank || !directiveImg) {
      return
    }

    const data: TApiAdminAddDirectiveRequest = {
      token,
      name: directiveName,
      rank: directiveRank,
      image: directiveImg
    }

    const res = await apiAdminAddDirective(data)
    console.log(res)
  }

  return (
    <Admin route_title="Agregar directiva">
      <form onSubmit={handleSubmit}>
        <div>
          {
            directiveImgUrl && <img src={directiveImgUrl} alt="img" />
          }
          <label htmlFor="add_img">Subir imagen</label>
          <input 
            type="file" 
            accept="image/png, image/jpeg, image/svg+xml, image/webp"
            className="hidden" 
            id="add_img"
            onChange={handleChangeImage}
          />
        </div>
        <div>
          <label htmlFor="d_name">Nombre</label>
          <input 
            type="text" 
            id="d_name"
            value={directiveName}
            onChange={(ev) => setDirectiveName(ev.target.value)}
          />
        </div>
        <div>
          <label htmlFor="d_rank">Rango:</label>
          <input 
            type="text" 
            id="d_rank"
            value={directiveRank}
            onChange={(ev) => setDirectiveRank(ev.target.value)}
          />
        </div>
        <div>
          <button type="submit"><BsUpload/> Publicar</button>
        </div>
      </form>
    </Admin>
  )
}

export default Directive
