import { BsCalendarDate, BsPenFill, BsPersonFill, BsThreeDots, BsTrashFill } from "react-icons/bs"
import api from "../../../api/apiRoute"
import styles from "../../../css/admin/news/NewsCard.module.css"
import { useCallback, useContext, useEffect, useState } from "react"
import { userSessionContext } from "../../../context/session/UserSessionContext"
import apiGetNewsId from "../../../api/page/getNewsId"

type TNewsCardProps = {
  data: TNews
  handleDelete: ({id, name}: {id:number, name:string}) => void
  handleOpenEdit: (id: number, name: string, description: string, note: string) => void
}

const NewsCard = ({ data, handleDelete, handleOpenEdit }: TNewsCardProps) => {

  const [note, setNote] = useState("")

  const { id, name, description, image, author, date } = data

  const getNewsID = useCallback(async () => {
    const news = await apiGetNewsId(id)
    setNote(news.data.note)
  }, [id])

  useEffect(() => {
    getNewsID()
  }, [getNewsID])

  const [showDropdown, setShowDropdown] = useState(false)

  const handlePointerLeave = () => {
    setShowDropdown(false)
  }

  return (
    <div className={styles.card}
      style={{
        zIndex: showDropdown ? 60 : "unset"
      }}
      onPointerLeave={handlePointerLeave}
    >
      <div className={styles.img}>
        <img src={api+image} alt={name} />
      </div>

      <div className={styles.info}>
        <div className={styles.id}>
          <span>{id}</span>
        </div>
        <div className={styles.ot_info}>
          <h3>{name}</h3>
          <span><BsPersonFill/> {author}</span>
          <span><BsCalendarDate/> {date}</span>
        </div>
      </div>

      <div className={styles.btns}>
        <div className={styles.dropdown}>
          <button onClick={() => setShowDropdown(!showDropdown)}><BsThreeDots/></button>

          <ul style={{display: showDropdown ? "flex" : "none"}}>
            <li>
              <button
                onClick={() => {
                  handleOpenEdit(id, name, description, note)
                }}
              >
                <BsPenFill/> Editar
              </button>
            </li>
            <li>
              <button
                onClick={() => handleDelete({id, name})}
              >
                <BsTrashFill/> Borrar
              </button>
            </li>
          </ul>
        </div>
      </div>
    </div>
  )
}

export default NewsCard
