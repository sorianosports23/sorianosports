import { useContext, useEffect, useState } from "react"
import styles from "../../../css/session/account/Inscriptions.module.css"
import { userSessionContext } from "../../../context/session/UserSessionContext"
import apiGetInscriptionFromUsername from "../../../api/admin/inscription/getInscriptionUsername"
import { InscriptionStatusLabel, TInscription } from "../../../api/admin/inscription/inscription.types"
import apiGetCityPlace from "../../../api/admin/city/getPlace"
import SendModal from "../../modal/SendModal"
import apiAdminEditStatusInscUser from "../../../api/admin/inscription/editInscriptionUser"
import OptionModal from "../../modal/OptionModal"

const IncriptionRecord = ({ sport, signedUp, dateStart, dateEnd, teacher, place, city, exitSport }: TInscriptionRecord) => {
  
  const [placesInfo, setPlacesInfo] = useState<TPlace[]>([])
  const [teacherName, setTeacherName] = useState("")

  useEffect(() => {
    (async () => {
      const res = await apiGetCityPlace(city)
      if (res.data) setPlacesInfo(res.data)
    })()
  }, [city])

  useEffect(() => {
    if (placesInfo.length>0) {      const sportPlaces = placesInfo.filter(place => place.sport === `${sport}`)

      if (sportPlaces.length>0) {
        const teacherFromPlace = sportPlaces.find(value => value.place === place)
        if (teacherFromPlace) setTeacherName(teacherFromPlace.teacher)
      }

    }
  }, [placesInfo, place, sport])
  
  return (
    <li className={styles.inscription}>
      <div>
        <p>Deporte</p>
        <span>{sport}</span>
      </div>

      <div>
        <p>
          <div data-signedup={signedUp}/>
          {
            InscriptionStatusLabel[Number(signedUp) as keyof typeof InscriptionStatusLabel]
          }
        </p>
        <span>
          {
            signedUp === 2 && <button onClick={exitSport}>Dar de baja</button>
          }
        </span>
      </div>
      
      <div>
        <p>Fecha de inscripción</p>
        <span>
          {
            Number(signedUp) !== 1
            ? 
            <>
            {dateStart}
            {Number(signedUp) === 3 && ` - ${dateEnd}`}
            </>
            :
            <>-</>
          }
        </span>
      </div>

      <div>
        <p>Profesor</p>
        <span>{teacherName}</span>
      </div>

      <div>
        <p>Lugar</p>
        <span>{place} - {city}</span>
      </div>
    </li>
  )
}

const Inscriptions = () => {

  const {token, username} = useContext(userSessionContext)
  const [inscriptionData, setInscriptionData] = useState<TInscription[]>([])

  useEffect(() => {
    if (!token || !username) return
    (async () => {
      const res = await apiGetInscriptionFromUsername({token,username})
      if (res.data) setInscriptionData(res.data)
    })()
  }, [token, username])

  //!MODAL
  const [sendModal, setSendModal] = useState(false)
  const [sendMsg, setSendMsg] = useState("")
  const [sendOtMsg, setSendOtMsg] = useState("")
  const [sendRedirect, setSendRedirect] = useState("")

  const [optionModal, setOptionModal] = useState(false)
  const optionName = "Dar de baja"
  const [optionOpt, setOptionOpt] = useState("")

  const [idToExit, setIdToExit] = useState(0)

  const handleExitInscription = (id: number, sportName: string) => {
    setOptionOpt(sportName)
    setIdToExit(id)
    setOptionModal(true)
  }
  
  const handleShowModal = (msg: string, otMsg: string, redirect?: string) => {
    setSendMsg(msg)
    setSendOtMsg(otMsg)
    if (redirect) setSendRedirect(redirect)
    else setSendRedirect("")
    setSendModal(true)
  }
  //!

  const handleExit = async () => {
    const res = await apiAdminEditStatusInscUser({token, id: idToExit, state: 3})
    if (res.status) {
      handleShowModal("Te diste de baja", "", "/")
    } else {
      handleShowModal("No se pudo dar de baja", res.message)
    }
  }

  return (
    <>
    <div>
      <ul className={styles.inscription_ul}>
        {
          inscriptionData.map((inscription, i) => (
            <IncriptionRecord
              sport={inscription.activity}
              signedUp={inscription.state}
              dateStart={inscription.state === 2 ? inscription.startInscription as string : ""}
              dateEnd={inscription.state === 3  ? inscription.endInscription as string : ""}
              place={inscription.activityPlace}
              teacher=""
              city={inscription.city}
              exitSport={() => handleExitInscription(inscription.id, inscription.activity)}
              key={i}
            />
          ))
        }
      </ul>
    </div>
    
    <SendModal
      open={sendModal}
      close={() => setSendModal(false)}
      message={sendMsg}
      otherMessage={sendOtMsg}
      redirect={sendRedirect}
    />

    <OptionModal
      open={optionModal}
      close={() => setOptionModal(false)}
      option={optionName}
      optionName={optionOpt}
      acceptFunction={handleExit}
    />
    </>
  )
}

export default Inscriptions