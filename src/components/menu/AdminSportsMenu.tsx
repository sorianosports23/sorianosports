import { BsSearch } from "react-icons/bs"
import styles from "../../css/admin/sports/AdminSportsMenu.module.css"
import { useCallback, useEffect, useState } from "react"

type TSport = string

type TSportsMenuProps = {
  sports: Array<TSport>
  setSports: (sports: Array<TSport>) => void
}

const AdminSportsMenu = ({ sports, setSports }: TSportsMenuProps) => {

  const [ searchValue, setSearchValue ] = useState("")
  
  const handleChangeSports = useCallback(() => {
    if (searchValue) {
      setSports(sports.filter(sport => sport.toLowerCase().includes(searchValue.toLowerCase())))
    } else {
      setSports(sports)
    }
  }, [searchValue, sports, setSports])

  useEffect(() => {
    handleChangeSports()

    return () => {}
  }, [searchValue, handleChangeSports])

  return (
    <div className={styles.menu}>
      <div className={styles.search_cont}>
        <div className={styles.search}>
          <div className={styles.icon}>
            <BsSearch/>
          </div>

          <div className={styles.input}>
            <input type="text" placeholder="Buscar ciudad"
              value={searchValue}
              onChange={(ev) => setSearchValue(ev.target.value)}
            />
          </div>
        </div>
      </div>
    </div>
  )
}

export default AdminSportsMenu
