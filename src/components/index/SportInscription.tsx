import { BsSearch, BsXLg } from "react-icons/bs"
import styles from "../../css/index/SportInscription.module.css"
import cityList from "../../utils/cityList"
import { useState } from "react"
import { Link } from "react-router-dom"

type TSportInscriptionProps = {
  open: boolean
  sport: string
  close: () => void
}

const SportInscription = ({ open, sport, close }: TSportInscriptionProps) => {

  const [selectValue, setSelectValue] = useState("")

  return (
    <div className={styles.modal} data-open={open}>
      <div>
        <div className={styles.header}>
          <button onClick={() => close()}><BsXLg/></button>
        </div>

        <div className={styles.body}>
          <p>Busca lugar donde inscribirse para <span>{sport}</span> en:</p>
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

export default SportInscription
