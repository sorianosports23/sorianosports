import { useState } from "react"
import styles from "../../../css/admin/page/EditCity.module.css"
import { BsPenFill, BsThreeDots, BsTrashFill } from "react-icons/bs"
import entryStyles from "../../../css/admin/page/Entry.module.css"

type TPlaceProps = {
  info: TPlace
  openEdit: (info: TPlace) => void
  deletePlace: (id: number) => void
}

const Place = ({info, openEdit, deletePlace }: TPlaceProps) => {

  const [showDropdown, setShowDropdown] = useState(false)

  return (
    <div className={styles.place_cont}>
      <p>{info.place}</p>
      <p>{info.sport}</p>

      <div className={entryStyles.btns}>
        <div className={entryStyles.dropdown}>
          <button onClick={() => setShowDropdown(!showDropdown)}><BsThreeDots/></button>

          <ul style={{display: showDropdown ? "flex" : "none"}}>
            <li>
              <button
                onClick={() => {
                  openEdit(info)
                }}
              >
                <BsPenFill/> Editar
              </button>
            </li>
            <li>
              <button
                onClick={() => deletePlace(info.id)}
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

export default Place
