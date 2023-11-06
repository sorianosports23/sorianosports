import { BsPlusLg, BsTrash, BsXLg } from "react-icons/bs"
import modalStyles from "../../../css/Modal.module.css"
import { useCallback, useContext, useEffect, useState } from "react"
import apiGetKeywords from "../../../api/admin/search/getKeywords"
import apiAddKeyword from "../../../api/admin/search/addKeyword"
import { userSessionContext } from "../../../context/session/UserSessionContext"
import styles from "../../../css/modal/EditSearch.module.css"

interface ISearchModalProps {
  open: boolean
  close: () => void
  info: Omit<TSearch, "keywords">
}

const EditSearch = ({ open, close, info }: ISearchModalProps) => {

  const { token } = useContext(userSessionContext)

  const { name, description, id, url } = info

  const [searchName, setSearchName] = useState(name)
  const [searchDesc, setSearchDesc] = useState(description)
  const [searchUrl, setSearchUrl] = useState(url)
  const [searchKeywords, setSearchKeywords] = useState<string[]>([])
  const [newKeyword, setNewKeyword] = useState("")

  const handleGetKeywords = useCallback(async () => {
    const data = await apiGetKeywords(id)
    if (!data.status) {
      setSearchKeywords([])
      return
    }
    setSearchKeywords(data.data)
  }, [id])

  useEffect(() => {
    setSearchName(name)
    setSearchDesc(description)
    setSearchUrl(url)
    handleGetKeywords()
  }, [name, description, url, handleGetKeywords])

  const handleAddKeyword = async () => {
    const data = {
      token,
      idSearch: id,
      name: newKeyword
    }

    const res = await apiAddKeyword(data)
  
    if (res.status) {
      setNewKeyword("")
      handleGetKeywords()
    } else {
      setNewKeyword("")
    }
  }

  return (
    <div 
      className={modalStyles.cont}
      data-open={open}
    >
      <form className={modalStyles.modal}>
        <div className={modalStyles.header}>
          <h2>Editar busqueda</h2>
          <button 
            type="button"
            onClick={close}
          >
            <BsXLg/>
          </button>
        </div>
        
        <div className={styles.body}>
          <h3>{name}</h3>
          <div className={styles.input}>
            <label htmlFor="sm_desc">Descripcion:</label>
            <textarea
              id="sm_desc"
              value={searchDesc}
              onChange={(ev) => setSearchDesc(ev.target.value)}
            ></textarea>
          </div>

          <div className={styles.input}>
            <label htmlFor="sm_url">URL:</label>
            <input 
              id="sm_url"
              type="text" 
              value={searchUrl}
              onChange={(ev) => setSearchUrl(ev.target.value)}
            />
          </div>

          <div className={styles.kw_cont}>
            <div className={styles.newkw}>
              <label htmlFor="sm_newkw">Agregar keyword:</label>
              <div>
                <input 
                  type="text" 
                  value={newKeyword}
                  onChange={(ev) => setNewKeyword(ev.target.value)}
                />
                <button 
                  type="button"
                  onClick={handleAddKeyword}
                >
                  <BsPlusLg/>
                </button>
              </div>
            </div>

            <div className={styles.keywords_list}>
              {
                searchKeywords.map((keyword, i) => (
                  <div key={i}>
                    <p>{keyword}</p>
                    <button type="button"><BsTrash/></button>
                  </div>
                ))
              }
            </div>
          </div>
        </div>

        <div className={modalStyles.footer}>
          <button 
            type="button"
            onClick={close}
          >
            Cancelar
          </button>
          <button type="submit">
            Editar
          </button>
        </div>
      </form>
    </div>
  )
}

export default EditSearch
