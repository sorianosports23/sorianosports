import Admin from "../Admin"
import PageStyles from "../../../css/admin/page/Page.module.css"
import { Link } from "react-router-dom"
import { BsPlusLg } from "react-icons/bs"
import { useContext, useEffect, useState } from "react"
import apiGetSearch from "../../../api/admin/search/getSearch"
import KWEntry from "../../../components/admin/entry/KWEntry"
import EditSearch from "../../../components/admin/modal/EditSearch"
import { userSessionContext } from "../../../context/session/UserSessionContext"
import apiAdminModifySearch from "../../../api/admin/search/modifySearch"
import SendModal from "../../../components/modal/SendModal"
import apiAdminDeleteSearch from "../../../api/admin/search/deleteSearch"
import OptionModal from "../../../components/modal/OptionModal"

const DEFAULT_SEARCH: Omit<TSearch, "keywords"> = {
  id: 0,
  name: "",
  description: "",
  url: ""
}

const Keywords = () => {

  const { token } = useContext(userSessionContext)

  const [searchList, setSearchList] = useState<TSearch[]>([])
  const [submitting, setSubmitting] = useState(false)

  useEffect(() => {
    handleGetSearch()
  }, [])

  const handleGetSearch = async () => {
    const data = await apiGetSearch()
    if (!data.status) return
    setSearchList(data.data)
  }

  //! modal edit
  const [modalEditOpen, setModalEditOpen] = useState(false)
  const [modalEditSearch, setModalEditSearch] = useState<Omit<TSearch, "keywords">>(DEFAULT_SEARCH)
  
  const openEdit = (info: TSearch) => {
    setModalEditSearch(info)
    setModalEditOpen(true)
  }
  //!

  //! modal send
  const [modalSOpen, setModalSOpen] = useState(false)
  const [modalSMsg, setModalSMsg] = useState("")
  const [modalSOtherMsg, setModalSOtherMsg] = useState("")
  //!

  //! modal option
  const [modalOptOpen, setModalOptOpen] = useState(false)
  const [modalOptName, setModalOptName] = useState("")
  const [modalOptId, setModalOptId] = useState(0)
  //!

  const handleEditSearch = async ({ id, description, url }: Omit<TApiAdminModifySearchRequest, "token">) => {
    setSubmitting(true)
    
    const data = {
      token,
      id,
      description,
      url
    }

    const res = await apiAdminModifySearch(data)

    if (res.status) {
      setModalSMsg("Se edito correctamente")
      setModalSOtherMsg("")
      setModalEditOpen(false)
      handleGetSearch()
    } else {
      setModalSMsg("No se pudo editar")
      setModalSOtherMsg(res.message)
    }

    setModalSOpen(true)
    setSubmitting(false)
  }

  const handleDeleteSearch = async () => {
    const res = await apiAdminDeleteSearch({token,id: modalOptId})

    if (res.status) {
      setModalSMsg("Se elimino correctamente")
      setModalSOtherMsg("")      
    } else {
      setModalSMsg("No se pudo eliminar")
      setModalSOtherMsg(res.message)
    }

    setModalSOpen(true)
  }

  const handleOpenDelete = (id: number, name: string) => {
    setModalOptName(`${name} (${id})`)
    setModalOptId(id)
    setModalOptOpen(true)
  }

  return (
    <Admin route_title="Editar busqueda">
      <div className={PageStyles.management}>
        <Link to="/admin/add/search" className={PageStyles.btn_add}><BsPlusLg/> Agregar nueva busqueda</Link>
      </div>
      <div style={{
        margin: "1rem 0"
      }}>
        <h2>Busquedas:</h2>

        <div className={PageStyles.tableList}>
          {
            searchList.map((search, i) => (
              <KWEntry
                {
                  ...search
                }
                key={i}
                openEdit={openEdit}
                openDelete={handleOpenDelete}
              />
            ))
          }
        </div>
      </div>

      <EditSearch
        open={modalEditOpen}
        close={() => setModalEditOpen(false)}
        info={modalEditSearch as TSearch}
        submitting={submitting}
        handleSubmit={handleEditSearch}
      />

      <SendModal
        open={modalSOpen}
        close={() => setModalSOpen(false)}
        message={modalSMsg}
        otherMessage={modalSOtherMsg}
      />

      <OptionModal
        open={modalOptOpen}
        close={() => setModalOptOpen(false)}
        option="Eliminar"
        optionName={modalOptName}
        acceptFunction={handleDeleteSearch}
      />
    </Admin>
  )
}

export default Keywords
