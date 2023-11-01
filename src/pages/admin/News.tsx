import Admin from "./Admin"
import styles from "../../css/admin/news/News.module.css"
import { Link } from "react-router-dom"
import { BsPlus, BsPlusLg } from "react-icons/bs"
import { useContext, useEffect, useState } from "react"
import apiGetNews from "../../api/page/getNews"
import NewsCard from "../../components/admin/news/NewsCard"
import { userSessionContext } from "../../context/session/UserSessionContext"
import apiAdminDeleteNews from "../../api/admin/news/deleteNews"
import OptionModal from "../../components/modal/OptionModal"
import SendModal from "../../components/modal/SendModal"
import EditNews from "../../components/admin/news/EditNews"

const News = () => {

  const { token } = useContext(userSessionContext)

  const [news, setNews] = useState<TNews[]>([])

  const getNews = async (pag: number = 1) => {
    const allNews = await apiGetNews(pag)
    console.log(allNews)
    if (allNews.status) {
      setNews(allNews.data)
    }
  }

  useEffect(() => {
    getNews()
  }, [])

  //! modal
  const [modalOpen, setModalOpen] = useState(false)
  const [modalMsg, setModalMsg] = useState("")
  //!

  //! DELETE
  const [deleteOpen, setDeleteOpen] = useState(false)
  const [deleteName, setDeleteName] = useState("")
  const [deleteId, setDeleteId] = useState(0)

  const handleOpenDelete = ({ id, name }: {id:number, name: string}) => {
    setDeleteName(name)
    setDeleteId(id)
    setDeleteOpen(true)
  }

  const handleDeleteNews = async () => {
    const data: TApiAdminDeleteNewsRequest = {
      token,
      id: deleteId
    }

    const res = await apiAdminDeleteNews(data)

    if (res.status) {
      setModalMsg("Se elimino la noticia")
      setDeleteOpen(false)
      setModalOpen(true)
    } else {
      setDeleteOpen(false)
      setModalMsg("No se pudo eliminar la noticia")
      setModalOpen(true)
    }
  }
  //!

  //! EDITAR

  const [newsEdit, setNewsEdit] = useState(false)
  const [newsEditName, setNewsEditName] = useState("")
  const [newsEditDescription, setNewsEditDescription] = useState("")
  const [newsEditNote, setNewsEditNote] = useState("")
  const [newsEditId, setNewsEditId] = useState(0)

  const handleEditNews = (status: boolean) => {
    if (status) {
      setModalMsg("Se edito la noticia")
      setNewsEdit(false)
      setModalOpen(true)
    } else {
      setModalMsg("No se pudo editar la noticia")
    }
  }

  const handleOpenEditNews = (id: number, name: string, description: string, note: string) => {
    setNewsEditId(id)
    setNewsEditName(name)
    setNewsEditDescription(description)
    setNewsEditNote(note)
    setNewsEdit(true)
  }

  //!

  return (
    <Admin route_title="Noticias">
      <div className={styles.management}>
        <Link to="/admin/news/add" className={styles.btn_add}><BsPlusLg/> Añadir noticia</Link>
      </div>

      <div className={styles.listNews}>
        {
          news.map((newsI, i) => (
            <NewsCard
              data={newsI}
              handleDelete={handleOpenDelete}
              handleOpenEdit={handleOpenEditNews}
              key={i}
            />
          ))
        }
      </div>

      <OptionModal
        open={deleteOpen}
        option="Eliminar"
        optionName={deleteName}
        close={() => setDeleteOpen(false)}
        acceptFunction={handleDeleteNews}
      />

      <SendModal
        open={modalOpen}
        close={() => setModalOpen(false)}
        message={modalMsg}
      />

      <EditNews
        open={newsEdit}
        close={() => setNewsEdit(false)}
        name={newsEditName}
        description={newsEditDescription}
        note={newsEditNote}
        id={newsEditId}
        editNews={handleEditNews}
      />
    </Admin>
  )
}

export default News
