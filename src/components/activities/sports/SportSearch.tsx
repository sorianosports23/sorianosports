import { Link } from "react-router-dom"
import styles from "../../../css/index/SportInscription.module.css"
import { BsSearch, BsXLg } from "react-icons/bs"
import { useState } from "react"

type TSportSearchProps = {
  open: boolean
  sport: string
  close: () => void
  cityList: string[]
}


const SportSearch = ({ open, sport, close, cityList }: TSportSearchProps) => {

  const [selectValue, setSelectValue] = useState("")

  return (
    <div className={styles.modal} data-open={open}>
      <div>
        <div className={styles.header}>
          <button onClick={() => close()}><BsXLg/></button>
        </div>

        <div className={styles.body}>
          <p>Elige una ciudad donde practicar <span>{sport}</span></p>
          <div>
            <div className={styles.custom_select}>
              <select onChange={(ev) => setSelectValue(ev.target.value)}>
                <option value="#">Seleccionar</option>
                {
                  cityList.map((city, i) => (
                    <option value={city} key={i}>{city}</option>
                  ))
                }
              </select>
            </div>

            <button 
              disabled={selectValue === "#" || selectValue === ""}
            >
              <Link to={`/info/${selectValue}/${sport}`}><BsSearch/> Buscar</Link>
            </button>
          </div>
        </div>   
      </div>
    </div>
  )  
}

export default SportSearch
