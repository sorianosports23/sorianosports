import { Link } from "react-router-dom"
import Admin from "../Admin"
import { BsPenFill, BsPlusLg, BsTrashFill } from "react-icons/bs"
import stylesPage from "../../../css/admin/page/Page.module.css"
import { useContext, useEffect, useState } from "react"
import Loading from "../../Loading"
import apiGetDirective from "../../../api/page/directive/getDirective"
import api from "../../../api/apiRoute"
import styles from "../../../css/admin/directive/PageDirective.module.css"
import OptionModal from "../../../components/modal/OptionModal"
import SendModal from "../../../components/modal/SendModal"
import DirectiveProfile from "../../../components/admin/edit/DirectiveProfile"
import apiAdminDeleteDirective from "../../../api/admin/directive/deleteDirective"
import { userSessionContext } from "../../../context/session/UserSessionContext"
import Loader from "../../../components/Loader"

const Directive = () => {

  const [loading, setLoading] = useState(true)
  const [data, setData] = useState<TDirective[]>([])

  const { token } = useContext(userSessionContext)

  //!modal

  const [modalOpen, setModalOpen] = useState(false)
  const [modalTitle, setModalTitle] = useState("")
  const [profileToDelete, setProfileToDelete] = useState(0)

  const [deletedModal, setDeletedModal] = useState(false)
  const [deletedModalMsg, setDeletedModalMsg] = useState("")

  const [editOpen, setEditOpen] = useState(false)
  const [editName, setEditName] = useState("")
  const [editRank, setEditRank] = useState("")
  const [editImg, setEditImg] = useState("")
  const [editId, setEditId] = useState(0)

  const [buttonLoading, setButtonLoading] = useState(false)

  const handleDeleteProfile = async () => {
    
    const profileToDeleteData = {
      token,
      id: profileToDelete
    }
    
    setButtonLoading(true)
    const res = await apiAdminDeleteDirective(profileToDeleteData)
    setModalOpen(false)

    if (res.status) {
      setDeletedModal(true)
      setDeletedModalMsg(`Se elimino a ${modalTitle}`)
      handleUpdateProfiles()
    } else {
      setDeletedModal(true)
      setDeletedModalMsg(`No se pudo eliminar a ${modalTitle}`)
    }

    setButtonLoading(false)

  }

  const handleEditProfile = (status: boolean) => {
    if (status) {
      setDeletedModalMsg("Se edito correctamente")
      setDeletedModal(true)
      handleUpdateProfiles()
      setEditOpen(false)
    } else {
      setDeletedModalMsg("No se pudo editar")
      setDeletedModal(true)
    }
  }

  //!

  const handleUpdateProfiles = async () => {
    setLoading(true)
    const res = await apiGetDirective()
    if (res.status) {
      setData(res.data)
    }
    setLoading(false)
  }

  useEffect(() => {
    handleUpdateProfiles()
  }, [])

  if (loading) {
    return <Loading/>
  }


  return (
    <Admin route_title="Nuestro Equipo">
      <div className={stylesPage.management}>
        <Link to="/admin/add/directive" className={stylesPage.btn_add}><BsPlusLg/> Agregar</Link>
      </div>
    
      <div className={styles.profiles}>
        {
          data.map((profile, i) => (
            <div key={i} className={styles.profile}>
              <div className={styles.profile_img}>
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
                    setEditId(profile.id)
                    setEditOpen(true)
                  }}
                  disabled={buttonLoading}
                >
                  {
                    buttonLoading
                      ? <Loader/>
                      : <><BsPenFill/> Editar</>
                  }
                </button>
                <button
                  onClick={() => {
                    setProfileToDelete(profile.id)
                    setModalTitle(profile.name + ` (${profile.id})`)
                    setModalOpen(true)
                  }}
                  disabled={buttonLoading}
                >
                  {
                    buttonLoading
                      ? <Loader/>
                      : <><BsTrashFill/> Borrar</>
                  }
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
        id={editId}
        handleEdit={handleEditProfile}
      />
    </Admin>
  )
}

export default Directive
