import { BsPenFill, BsThreeDots, BsTrashFill } from "react-icons/bs"
import styles from "../../../css/admin/page/Entry.module.css"
import { useState } from "react"

interface IKWEntryProps extends TSearch {
  openEdit: (info: TSearch) => void
  openDelete: (id: number, name: string) => void
}

const KWEntry = ({ id, name, description, url, keywords, openEdit, openDelete }: IKWEntryProps) => {

  const [showDropdown, setShowDropdown] = useState(false)

  return (
    <div className={styles.entry}>
      <div className={styles.info}>
        <h3>{name}</h3>
        <p>URL: <span>"{url}"</span></p>
        <p>{description}</p>
        <p>{keywords.length} palabras claves</p>
      </div>

      <div className={styles.btn}>
        <div className={styles.dropdown}>
          <button onClick={() => setShowDropdown(!showDropdown)}><BsThreeDots/></button>

          <ul style={{display: showDropdown ? "flex" : "none"}}>
            <li>
              <button
                onClick={() => {
                  openEdit({
                    id,
                    name,
                    description,
                    keywords,
                    url
                  })
                }}
              >
                <BsPenFill/> Editar
              </button>
            </li>
            <li>
              <button
                onClick={() => openDelete(id, name)}
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

export default KWEntry
