import { useContext, useEffect, useState } from "react"
import styles from "../../../css/session/account/Inscriptions.module.css"
import { userSessionContext } from "../../../context/session/UserSessionContext"
import apiGetInscriptionFromUsername from "../../../api/admin/inscription/getInscriptionUsername"
import { InscriptionStatusLabel, TInscription } from "../../../api/admin/inscription/inscription.types"
import apiGetCityPlace from "../../../api/admin/city/getPlace"
import SendModal from "../../modal/SendModal"
import apiAdminEditStatusInscUser from "../../../api/admin/inscription/editInscriptionUser"

const IncriptionRecord = ({ sport, signedUp, dateStart, dateEnd, teacher, place, city, exitSport }: TInscriptionRecord) => {
  
  const [placesInfo, setPlacesInfo] = useState<TPlace[]>([])
  const [teacherName, setTeacherName] = useState("")

  useEffect(() => {
    (async () => {
      const res = await apiGetCityPlace(city)
      if (res.data) setPlacesInfo(res.data)
    })()
  }, [])

  useEffect(() => {
    if (placesInfo.length>0) {
      console.log("places", placesInfo)
      console.log(sport)
      const sportPlaces = placesInfo.filter(place => place.sport === `${sport}`)
      console.log(sportPlaces)

      if (sportPlaces.length>0) {
        const teacherFromPlace = sportPlaces.find(value => value.place === place)
        console.log(teacherFromPlace)
        if (teacherFromPlace) setTeacherName(teacherFromPlace.teacher)
      }

    }
  }, [placesInfo])
  
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
            signedUp && <button onClick={exitSport}>Dar de baja</button>
          }
        </span>
      </div>
      
      {
        Number(signedUp) === 2
        && (
          <div>
            <p>Fecha de inscripción</p>
            <span>
              {dateStart}
              {Number(signedUp) === 3 && ` - ${dateEnd}`}
            </span>
          </div>
        )
      }


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
    (async () => {
      const res = await apiGetInscriptionFromUsername({token,username})
      if (res.data) setInscriptionData(res.data)
    })()
  }, [])

  //!MODAL
  const [sendModal, setSendModal] = useState(false)
  const [sendMsg, setSendMsg] = useState("")
  const [sendOtMsg, setSendOtMsg] = useState("")
  const [sendRedirect, setSendRedirect] = useState("")
  
  const handleShowModal = (msg: string, otMsg: string, redirect?: string) => {
    setSendMsg(msg)
    setSendOtMsg(otMsg)
    if (redirect) setSendRedirect(redirect)
    else setSendRedirect("")
    setSendModal(true)
  }
  //!

  const handleExit = async (id: number) => {
    const res = await apiAdminEditStatusInscUser({token, id, state: 3})
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
        {/* <IncriptionRecord
          sport="Futbol"
          signedUp={true}
          dateStart="27/09/23"
          teacher="Prof X"
          place="CRM"
        />

        <IncriptionRecord
          sport="Basquetbol"
          signedUp={false}
          dateStart="27/09/23"
          dateEnd="29/10/23"
          teacher="Prof X"
          place="CRM"
        /> */}

        {
          inscriptionData.map((inscription, i) => (
            <IncriptionRecord
              sport={inscription.activity}
              signedUp={inscription.state}
              dateStart={``}
              dateEnd=""
              place={inscription.activityPlace}
              teacher=""
              city={inscription.city}
              exitSport={() => handleExit(inscription.id)}
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
    </>
  )
}

export default Inscriptions