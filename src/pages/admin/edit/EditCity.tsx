import Admin from "../Admin"
import { useParams } from "react-router-dom"
import { useState, useEffect, useCallback, FormEvent, useContext } from "react"
import Loading from "../../Loading"
import apiGetCitySports from "../../../api/page/sports/getCitySports"
import PageStyles from "../../../css/admin/page/Page.module.css"
import { BsPlusLg } from "react-icons/bs"
import styles from "../../../css/admin/page/EditCity.module.css"
import Sport from "../../../components/admin/edit/Sport"
import AddPlace from "../../../components/admin/edit/AddPlace"
import { userSessionContext } from "../../../context/session/UserSessionContext"
import apiAdminAddSport from "../../../api/admin/city/addSport"
import SendModal from "../../../components/modal/SendModal"
import apiAdminDeleteSport from "../../../api/admin/city/deleteSport"
import apiGetCityPlace from "../../../api/admin/city/getPlace"
import Place from "../../../components/admin/edit/Place"

const EditCity = () => {

  const { token } = useContext(userSessionContext)
  const { city } = useParams()
  const [citySports, setCitySports] = useState([])
  const [cityPlaces, setCityPlaces] = useState([])
  const [loading, setLoading] = useState(false)
  
  //

  const [sportInput, setSportInput] = useState("")

  //! MODAL SUBMIT PLACE
  const [modalAddPlace, setModalAddPlace] = useState(false)
  //!

  //! MODAL SEND
  const [sendModal, setSendModal] = useState(false)
  const [sendMsg, setSendMsg] = useState("")
  const [sendOtMsg, setSendOtMsg] = useState("")
  //!

  const handleGetSports = useCallback(async (skipLoading?: boolean) => {
    if (!city) return
    if (!skipLoading) setLoading(true)
    const res = await apiGetCitySports(city)
    if (res.status) {
      setCitySports(res.data as typeof citySports)
    }
    setLoading(false)
  }, [city])

  const handleGetPlaces = useCallback(async () => {
    if (!city) return
    const res = await apiGetCityPlace(city)
    if (res.status) {
      setCityPlaces(res.data as typeof cityPlaces)
    }
  }, [city])

  useEffect(() => {
    handleGetSports()
    handleGetPlaces()
  }, [handleGetSports, handleGetPlaces])

  if (loading) {
    return (
      <Loading/>
    )
  }

  const handleSubmitSport = async (ev: FormEvent) => {
    ev.preventDefault()

    const data = {
      token,
      city: city as string,
      sport: sportInput
    }

    const res = await apiAdminAddSport(data)
  
    if (res.status) {
      handleGetSports(true)
      setSportInput("")
    } else {
      setSendMsg("No se pudo añadir el deporte")
      setSendOtMsg(res.message)
      setSendModal(true)
    }
  }

  const handleOpenSendModal = (msg: string, otMsg?: string) => {
    setSendMsg(msg)
    setSendOtMsg(otMsg || "")
    setSendModal(true)
  }

  const handleDeleteSport = async (sport: string) => {
    const data = {
      token,
      city: city as string,
      sport
    }
    
    const res = await apiAdminDeleteSport(data)

    if (res.status) {
      handleGetSports(true)
    } else {
      handleOpenSendModal("No se pudo eliminar", res.message)
    }
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
        <button
          className={PageStyles.btn_add}
          onClick={() => setModalAddPlace(true)}
        >
          <BsPlusLg/> Añadir lugar a {city}
        </button>
        <h2>{city}</h2>
      </div>
      
      <div className={styles.content}>
        <div>
          <h2>Deportes</h2>
          <div className={styles.cities}>
            {
              citySports.map((city, i) => (
                <Sport
                  key={i}
                  sport={city}
                  deleteSport={handleDeleteSport}
                />
              ))
            }
          </div>
        </div>

        <div>
          <h2>Lugares</h2>
          <div className={styles.places}>
            {
              cityPlaces.map((place, i) => (
                <Place
                  info={place}
                  openEdit={() => {}}
                  deletePlace={() => {}}
                  key={i}
                />
              ))
            }
          </div>
        </div>
      </div>


      <AddPlace
        open={modalAddPlace}
        close={() => setModalAddPlace(false)}
        city={city as string}
        sports={citySports}
        showModal={handleOpenSendModal}
      />

      <SendModal
        open={sendModal}
        close={() => setSendModal(false)}
        message={sendMsg}
        otherMessage={sendOtMsg}
      />
    </Admin>
  )  
}

export default EditCity
