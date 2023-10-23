import { Link } from "react-router-dom"
import Admin from "../Admin"
import { BsPenFill, BsPlusLg, BsTrashFill, BsXLg } from "react-icons/bs"
import stylesPage from "../../../css/admin/page/Page.module.css"
import { useEffect, useState } from "react"
import Loading from "../../Loading"
import apiGetDirective from "../../../api/page/directive/getDirective"
import api from "../../../api/apiRoute"
import styles from "../../../css/admin/directive/PageDirective.module.css"
import OptionModal from "../../../components/modal/OptionModal"
import SendModal from "../../../components/modal/SendModal"
import DirectiveProfile from "../../../components/admin/edit/DirectiveProfile"

const Directive = () => {

  const [loading, setLoading] = useState(true)
  const [data, setData] = useState<TDirective[]>([])

  //!modal

  const [modalOpen, setModalOpen] = useState(false)
  const [modalTitle, setModalTitle] = useState("")

  const [deletedModal, setDeletedModal] = useState(false)
  const [deletedModalMsg, setDeletedModalMsg] = useState("")

  const [editOpen, setEditOpen] = useState(false)
  const [editName, setEditName] = useState("")
  const [editRank, setEditRank] = useState("")
  const [editImg, setEditImg] = useState("")

  const handleDeleteProfile = () => {
    console.log(modalTitle)
    setModalOpen(false)
    setDeletedModal(true)
    setDeletedModalMsg(`Se elimino a ${modalTitle}`)
  }

  //!

  useEffect(() => {
    (async () => {
      const directiveApi = await apiGetDirective()
      if (directiveApi.status) setData(directiveApi.data)
      setLoading(false)      
    })()
  }, [])

  if (loading) {
    return <Loading/>
  }


  return (
    <Admin route_title="/institucion/directiva">
      <div className={stylesPage.management}>
        <Link to="/admin/add/directive" className={stylesPage.btn_add}><BsPlusLg/> Agregar</Link>
      </div>
    
      <div className={styles.profiles}>
        {
          data.map((profile, i) => (
            <div key={i} className={styles.profile}>
              <div>
                <img src={api+profile.image} alt={profile.name + " img"} />
              </div>
              <div>
                <h4>{profile.name}</h4>
                <span>{profile.rank}</span>
              </div>
              <div>
                <button
                  onClick={() => {
                    setEditName(profile.name)
                    setEditRank(profile.rank)
                    setEditImg(api+profile.image)
                    setEditOpen(true)
                  }}
                >
                  <BsPenFill/>
                  Editar
                </button>
                <button
                  onClick={() => {
                    setModalTitle(profile.name)
                    setModalOpen(true)
                  }}
                >
                  <BsTrashFill/>
                  Borrar
                </button>
              </div>
            </div>
          ))
        }
      </div>

      <OptionModal
        option="Eliminar"
        optionName={modalTitle}
        open={modalOpen}
        close={() => setModalOpen(false)}
        acceptFunction={handleDeleteProfile}
      />

      <SendModal
        open={deletedModal}
        close={() => setDeletedModal(false)}
        message={deletedModalMsg}
      />

      <DirectiveProfile
        open={editOpen}
        close={() => setEditOpen(false)}
        name={editName}
        rank={editRank}
        img={editImg}
      />
    </Admin>
  )
}

export default Directive
