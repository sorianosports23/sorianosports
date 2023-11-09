import Admin from "../Admin"
import { useParams } from "react-router-dom"
import { useState, useEffect, useCallback, FormEvent } from "react"
import Loading from "../../Loading"
import apiGetCitySports from "../../../api/page/sports/getCitySports"
import PageStyles from "../../../css/admin/page/Page.module.css"
import { BsPlusLg } from "react-icons/bs"
import styles from "../../../css/admin/page/EditCity.module.css"
import Sport from "../../../components/admin/edit/Sport"

const EditCity = () => {

  const { city } = useParams()
  const [citySports, setCitySports] = useState([])
  const [loading, setLoading] = useState(false)
  
  //

  const [sportInput, setSportInput] = useState("")

  const handleGetSports = useCallback(async () => {
    if (!city) return
    setLoading(true)
    const res = await apiGetCitySports(city)
    if (res.status) {
      setCitySports(res.data as typeof citySports)
    }
    setLoading(false)
  }, [city])

  useEffect(() => {
    handleGetSports()
  }, [handleGetSports])

  if (loading) {
    return (
      <Loading/>
    )
  }

  const handleSubmitSport = (ev: FormEvent) => {
    ev.preventDefault()
  }


  return (
    <Admin route_title="Editar ciudades">
      <div className={PageStyles.management}>
        <form onSubmit={handleSubmitSport} className={PageStyles.form_manage}>
          <input 
            type="text" 
            placeholder="Ingresar deporte"
            value={sportInput}
            onChange={(ev) => setSportInput(ev.target.value)}
            className={PageStyles.input}
          />
          <button 
            type="submit" 
            className={PageStyles.btn_add}
          >
            <BsPlusLg/> Añadir deporte
          </button>
        </form>
        <h2 style={{marginTop: "1rem"}}>{city}</h2>
      </div>

      <div className={styles.cities}>
        {
          citySports.map((city, i) => (
            <Sport
              key={i}
              sport={JSON.stringify(city)}
            />
          ))
        }
      </div>
    </Admin>
  )  
}

export default EditCity
