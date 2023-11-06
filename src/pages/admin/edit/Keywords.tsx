import Admin from "../Admin"
import PageStyles from "../../../css/admin/page/Page.module.css"
import { Link } from "react-router-dom"
import { BsPlusLg, BsThreeDots } from "react-icons/bs"
import { useEffect, useState } from "react"
import apiGetSearch from "../../../api/admin/search/getSearch"
import entryStyles from "../../../css/admin/page/Entry.module.css"
import KWEntry from "../../../components/admin/entry/KWEntry"
import EditSearch from "../../../components/admin/modal/EditSearch"

const DEFAULT_SEARCH: Omit<TSearch, "keywords"> = {
  id: 0,
  name: "",
  description: "",
  url: ""
}

const Keywords = () => {

  const [searchList, setSearchList] = useState<TSearch[]>([])

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

  return (
    <Admin route_title="Editar busqueda">
      <div className={PageStyles.management}>
        <Link to="/admin/add/search" className={PageStyles.btn_add}><BsPlusLg/> Agregar nueva busqueda</Link>
      </div>
      <div>
        <h2>Busquedas:</h2>

        <div>
          {
            searchList.map((search, i) => (
              <KWEntry
                {
                  ...search
                }
                key={i}
                openEdit={openEdit}
              />
            ))
          }
        </div>
      </div>

      <EditSearch
        open={modalEditOpen}
        close={() => setModalEditOpen(false)}
        info={modalEditSearch as TSearch}
      />
    </Admin>
  )
}

export default Keywords
