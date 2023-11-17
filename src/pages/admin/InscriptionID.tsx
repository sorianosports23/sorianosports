import { useContext, useEffect, useId, useState } from "react"
import Admin from "./Admin"
import { useParams } from "react-router-dom"
import Loading from "../Loading"
import apiGetInscription from "../../api/admin/inscription/getInscription"
import { userSessionContext } from "../../context/session/UserSessionContext"
import { TInscription } from "../../api/admin/inscription/inscription.types"
import SendModal from "../../components/modal/SendModal"
import api from "../../api/apiRoute"
import styles from "../../css/admin/page/Inscription.module.css"
import apiAdminEditStatus from "../../api/admin/contact/editStatus"
import { TApiAdminEditStatusInsc } from "../../api/admin/inscription/types"
import apiAdminEditStatusInsc from "../../api/admin/inscription/editInscription"

const ShowInfo = ({title, content}: {title: string, content: string | number}) => {
  
  const id = useId()
  
  return (
    <div>
      <label htmlFor={id}>{title}</label>
      <input 
        type="text" 
        value={content}
        id={id}
        readOnly
      />
    </div>
  )
}

// eslint-disable-next-line sonarjs/cognitive-complexity
const InscriptionID = () => {
  
  const params = useParams()

  const {token} = useContext(userSessionContext)
  
  const [inscriptionID, setInscriptionID] = useState(0)
  const [routeName, setRouteName] = useState("")
  const [loading, setLoading] = useState(true)

  const [inscriptionData, setInscriptionData] = useState<TInscription>({
    id: 0,
    name: "",
    lastname: "",
    birthday: "",
    ci: 0,
    gender: 0,
    medicalRecord: 0,
    city: "",
    residence: "",
    phone: 0,
    sportTimeStart: "",
    sportTimeEnd: "",
    activity: "",
    activityPlace: "",
    medicalAssistence: 0,
    diabetes: 0,
    hypertension: 0,
    fractures: 0,
    allergy: 0,
    asthma: 0,
    wearGlasses: 0,
    state: 1
  })

  //! MODAL
  const [sendModal, setSendModal] = useState(false)
  const [sendModalMsg, setSendModalMsg] = useState("")
  const [sendModalOtMsg, setSendModalOtMsg] = useState("")
  const [sendModalRedirect, setSendModalRedirect] = useState("")
  //!

  const handleShowModal = (msg: string, otMsg: string, redirect?: boolean) => {
    setSendModalMsg(msg)
    setSendModalOtMsg(otMsg)
    if (redirect) setSendModalRedirect("/admin")
    setSendModal(true)
  }

  useEffect(() => {
    const params = new URLSearchParams(window.location.search)
    if (!params || !params.get("id")) handleShowModal("No se indico el ID del formulario", "", true)
    const id = params.get("id")
    if (isNaN(Number(id))) handleShowModal("El ID no es valido", "", true);

    (async () => {
      const res = await apiGetInscription({ token, id: Number(id) })
      if (res.status) {
        if (!res.data) {
          handleShowModal("El ID indicado no existe", "", true)
        } else 
        setInscriptionData(res.data)
        setInscriptionID(res.data?.id as number)
      } else {
        handleShowModal(res.message, "", true)
      }
      setLoading(false)
    })()
  }, [])


  useEffect(() => {
    setRouteName(`Inscripcion ${inscriptionID}`)
  }, [inscriptionID])

  const handleShowBoolean = (value: 1|0, msg?: string) => {
    const label = Number(value) === 1 ? "Si" : "No"
    let message = label
    if (msg) message += ` - ${msg}`
    return message
  }

  type state = "waiting" | "accepted" | "exited"

  const handleCheckState = (): state => {
    const num = Number(inscriptionData.state)
    const stateLabel: Record<number, state> = {
      1: "waiting",
      2: "accepted",
      3: "exited"
    }
    return stateLabel[num as keyof typeof stateLabel] as state || "waiting"
  }

  const isAccepted = handleCheckState() === "accepted"
  const isExit = handleCheckState() === "exited"
  const isWaiting = handleCheckState() === "waiting"

  const handleEditStatus = async (state: 2|3) => {
    const data: TApiAdminEditStatusInsc = {
      token,
      id: inscriptionData.id,
      state
    }

    const res = await apiAdminEditStatusInsc(data)

    if (res.status) {
      handleShowModal("Se edito correctamente", "")
    } else {
      handleShowModal("No se pudo editar", res.message)
    }
  }


  if (loading) {
    return <Loading/>
  }

  return (
    <Admin route_title={routeName}>
      {
        inscriptionData
        && (
          <div className={styles.cont}>
            {
              !isExit
              && (
                <div className={styles.info}>
                  <h2>Acciones</h2>
                  {
                    isWaiting
                    && (
                      <>
                        <button
                          onClick={() => handleEditStatus(2)}
                        >
                          Aceptar inscripcion
                        </button>

                        <button
                          onClick={() => handleEditStatus(3)}
                        >
                          Denegar inscripcion
                        </button>
                      </>
                    )
                  }
                  {
                    isAccepted
                    && (
                      <button
                        onClick={() => handleEditStatus(3)}
                      >
                        Dar de baja
                      </button>
                    )
                  }
                </div>
              )
            }

            <div className={styles.info}>
              <h2>Información personal</h2>
              <ShowInfo
                title="Nombre completo"
                content={`${inscriptionData.name} ${inscriptionData.lastname}`}
              />

              <ShowInfo
                title="Fecha de nacimiento"
                content={inscriptionData.birthday}
              />

              <ShowInfo
                title="Genero"
                content={inscriptionData.gender === 1 ? "Mujer" : "Hombre"}
              />

              <ShowInfo
                title="Telefono"
                content={inscriptionData.phone}
              />

              {
                inscriptionData.alternativePhone && 
                  <ShowInfo
                    title="Telefono alternativo"
                    content={inscriptionData.alternativePhone}
                  />
              }

              <ShowInfo
                title="Cedula"
                content={inscriptionData.ci}
              />

            </div>

            <div className={styles.info}>
              <h2>Información medica</h2>
              
              <ShowInfo
                title="Ficha medica"
                content={handleShowBoolean(inscriptionData.medicalRecord)}
              />

              {
                inscriptionData.medicalRecord === 1
                && <>
                  <ShowInfo
                    title="Vencimiento"
                    content={inscriptionData.expiration as string}
                  />
                </>
              }

              <ShowInfo
                title="Asistencia medica"
                content={handleShowBoolean(inscriptionData.medicalAssistence, inscriptionData.whatMedicalCare)}
              />

              {
                inscriptionData.medicalAssistencePhone
                &&
                <ShowInfo
                  title="Telefono"
                  content={inscriptionData.medicalAssistencePhone}
                />
              }

              {
                inscriptionData.bloodGroup
                &&
                <ShowInfo
                  title="Grupo de sangre"
                  content={inscriptionData.bloodGroup}
                />
              }

              <ShowInfo
                title="Diabetes"
                content={handleShowBoolean(inscriptionData.diabetes)}
              />

              <ShowInfo
                title="Hipertension"
                content={handleShowBoolean(inscriptionData.hypertension)}
              />
              
              <ShowInfo
                title="Fracturas"
                content={handleShowBoolean(inscriptionData.fractures)}
              />
              
              <ShowInfo
                title="Alergias"
                content={handleShowBoolean(inscriptionData.allergy)}
              />
              
              <ShowInfo
                title="Asma"
                content={handleShowBoolean(inscriptionData.asthma)}
              />
              
              <ShowInfo
                title="Diabetes"
                content={handleShowBoolean(inscriptionData.diabetes)}
              />
              
              {
                inscriptionData.otherDiseases
                && 
                <ShowInfo
                  title="Otros"
                  content={inscriptionData.otherDiseases}
                />
              }

              <ShowInfo
                title="Lentes"
                content={handleShowBoolean(inscriptionData.wearGlasses, inscriptionData.whatTypeGlasses)}
              />
              
            </div>

            <div className={styles.info}>
              <h2>Residencia</h2>

              <ShowInfo
                title="Ciudad"
                content={inscriptionData.city}
              />

              <ShowInfo
                title="Dirección"
                content={inscriptionData.residence}
              />

            </div>

            <div className={styles.info}>
              <h2>Información deportiva</h2>
              
              <ShowInfo
                title="Actividad que va a desarrollar"
                content={inscriptionData.activity}
              />

              <ShowInfo
                title="Horario"
                content={`${inscriptionData.sportTimeStart} - ${inscriptionData.sportTimeEnd}`}
              />

              <ShowInfo
                title="Lugar"
                content={inscriptionData.activityPlace}
              />

              {
                inscriptionData.anotherSports
                &&
                <ShowInfo
                  title="Otros deportes"
                  content={inscriptionData.anotherSports}
                />
              }
              
              {
                inscriptionData.oldPractisedSport
                &&
                <ShowInfo
                  title="Deportes anteriormente"
                  content={inscriptionData.oldPractisedSport}
                />
              }
            </div>

            {
              isAccepted || isExit
              && (
                <div className={styles.info}>
                  <h2>Inscripcion</h2>
                  <ShowInfo
                    title="Fecha de inscripcion"
                    content={inscriptionData.startInscription as string}
                  />

                  {
                    inscriptionData.endInscription
                    && <ShowInfo title="Dado de baja" content={inscriptionData.endInscription}/>
                  }
                </div>
              )
            }


            <div className={styles.imgs}>
              <div>
                <h2>Cedula</h2>
                <img 
                  src={`${api}/inscription/getCiImage.php?id=${inscriptionID}`} 
                  alt="ci" 
                />
              </div>

              {
                Number(inscriptionData.medicalAssistence) === 1
                &&
                <div>
                  <h2>Ficha medica</h2>
                  <img 
                    src={`${api}/inscription/getMRImage.php?id=${inscriptionID}`} 
                    alt="fm" 
                  />
                </div>
              }
            </div>
          </div>
        )
      }

      <SendModal
        open={sendModal}
        close={() => setSendModal(false)}
        message={sendModalMsg}
        otherMessage={sendModalOtMsg}
        redirect={sendModalRedirect}
      />
    </Admin>
  )
}

export default InscriptionID
