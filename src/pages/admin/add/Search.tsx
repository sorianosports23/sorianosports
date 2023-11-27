import { BsCloudUpload } from "react-icons/bs"
import Admin from "../Admin"
import styles from "../../../css/admin/page/Search.module.css"
import SendModal from "../../../components/modal/SendModal"
import { FormEvent, useContext, useState } from "react"
import { userSessionContext } from "../../../context/session/UserSessionContext"
import apiAdminAddSearch from "../../../api/admin/search/addSearch"

const Search = () => {

  const { token } = useContext(userSessionContext)

  //! modal
  const [modalOpen, setModalOpen] = useState(false)
  const [modalMsg, setModalMsg] = useState("")
  const [modalOtMsg, setModalOtMsg] = useState("")
  //!

  //! formulario
  const [canSubmit, setCanSubmit] = useState(true)
  const [searchName, setSearchName] = useState("")
  const [searchDescription, setSearchDescription] = useState("")
  const [searchUrl, setSearchUrl] = useState("")
  //!

  const handleSubmit = async (ev: FormEvent) => {
    ev.preventDefault()
    setCanSubmit(false)

    const data: TApiAdminAddSearchRequest = {
      token,
      name: searchName,
      description: searchDescription,
      url: searchUrl
    }

    const res = await apiAdminAddSearch(data)

    if (res.status) {
      setModalMsg("Se añadio la busqueda")
    } else {
      setModalMsg("No se pudo añadir la noticia")
      setModalOtMsg(res.message)
    }

    setModalOpen(true)
    setCanSubmit(true)
  }
 
  return (
    <Admin route_title="Agregar busqueda">
      <form className={styles.form_inputs} onSubmit={handleSubmit}>
        <div>
          <label htmlFor="s_name">Nombre</label>
          <input 
            type="text" 
            id="s_name"
            value={searchName}
            onChange={(ev) => setSearchName(ev.target.value)}
          />
        </div>
        <div>
          <label htmlFor="s_description">Descripcion</label>
          <textarea 
            id="s_description"
            value={searchDescription}
            onChange={(ev) => setSearchDescription(ev.target.value)}
          ></textarea>
        </div>
        <div>
          <label htmlFor="s_url">URL</label>
          <input 
            type="text" 
            id="s_url"
            value={searchUrl}
            onChange={(ev) => setSearchUrl(ev.target.value)}
          />
        </div>
        <div className={styles.form_send}>
          <button 
            type="submit"
            disabled={!canSubmit}
          >
            <BsCloudUpload/> Publicar
          </button>
        </div>
      </form>

      <SendModal
        open={modalOpen}
        close={() => setModalOpen(false)}
        message={modalMsg}
        otherMessage={modalOtMsg}
      />
    </Admin>
  )
}

export default Search
