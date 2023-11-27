import Container from "../../components/templates/Container"
import User from "./User"
import styles from "../../css/inscription/Inscription.module.css"
import { FormEvent, useCallback, useContext, useEffect, useState } from "react"
import { TInscription } from "../../api/admin/inscription/inscription.types"
import { userSessionContext } from "../../context/session/UserSessionContext"
import apiSendInscription from "../../api/admin/inscription/sendInscription"
import { BsChevronDown, BsUpload } from "react-icons/bs"
import SendModal from "../../components/modal/SendModal"
import apiGetUserInfo from "../../api/session/info"
import cityList from "../../utils/cityList"
import apiGetCitySports from "../../api/page/sports/getCitySports"
import apiGetCityPlace from "../../api/admin/city/getPlace"
import TimeRangePicker from "@wojtekmaj/react-timerange-picker"
import useSearchParams from "../../utils/useSearchParams"

const Inscription = () => {

  const { token } = useContext(userSessionContext)
  const searchData = useSearchParams()

  const [timePlace, setTimePlace] = useState<TTimePickerValue>(["00:00", "00:00"])

  const [inscriptionData, setInscriptionData] = useState<Omit<TInscription, "state" | "id">>({
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
    wearGlasses: 0
  })

  const handleUpdateInscriptionData = useCallback((attribute: keyof typeof inscriptionData, value: any) => {
    if (attribute === "city") {
      handleUpdateInscriptionData("activity", "")
      handleUpdateInscriptionData("activityPlace", "")
    }

    if (attribute === "activity") {
      setPlaces([])
    }
    
    setInscriptionData(prev => ({
      ...prev,
      [attribute]: value
    }))
  }, [])

  //! MODAL
  const [modalSend, setModalSend] = useState(false)
  const [modalSendMsg, setModalSendMsg] = useState("")
  const [modalSendOtMsg, setModalSendOtMsg] = useState("")
  const [modalSendRedirect, setModalSendRedirect] = useState<string | undefined>(undefined)
  
  const handleShowModal = (msg: string, otMsg: string = "", redirect?: boolean) => {
    setModalSendMsg(msg)
    setModalSendOtMsg(otMsg)
    if (redirect) setModalSendRedirect("/auth/perfil?location=inscripciones")
    setModalSend(true)
  }
  
  //!

  const handleSubmit = async (ev: FormEvent) => {
    ev.preventDefault()
    const data = {
      token,
      data: inscriptionData
    }

    const res = await apiSendInscription(data)

    if (res.status) {
      handleShowModal("Se envio el formulario", "", true)
    } else {
      handleShowModal("No se pudo enviar el formulario", res.message)
    }
  }

  //! LOAD DATA FROM USER
  useEffect(() => {
    if (token) {
      (async () => {
        const userData = await apiGetUserInfo({token})
        if (userData.data) {
          const data = userData.data
          setInscriptionData(prev => ({
            ...prev,
            email: data.email,
            phone: data.phone,
            ci: data.ci
          }))
        }
      })()
    }
  }, [token])
  //!

  //! LOAD SPORTS DATA FROM API
  const [sports, setSports] = useState<string[]>([])

  const handleGetSportsFromCity = useCallback(async () => {
    if (!inscriptionData.city) {
      setSports([])
      return
    }

    const data = await apiGetCitySports(inscriptionData.city)

    if (data.data) {
      setSports(data.data.map(city => city.name))
    }
  }, [inscriptionData.city])

  useEffect(() => {
    handleGetSportsFromCity()
  }, [handleGetSportsFromCity])

  const [places, setPlaces] = useState<TPlace[]>([])
  
  const handleGetPlacesFromSport = useCallback(async () => {
    if (!inscriptionData.activity) {
      setPlaces([])
      return
    }

    const data = await apiGetCityPlace(inscriptionData.city)

    if (data.data) {
      setPlaces(data.data.filter(place => place.sport === inscriptionData.activity))
    }
  }, [inscriptionData.activity])

  useEffect(() => {
    handleGetPlacesFromSport()
  }, [handleGetPlacesFromSport])

  //!

  //! SELECT OPTION IN PLACE
  const handleSelectPlace = useCallback(() => {
    if (inscriptionData.activityPlace) {
      const place = places.find(placeInfo => placeInfo.place === inscriptionData.activityPlace)
      if (!place) return
      const timePlace = place.time.replaceAll(" ", "").split("-")
      handleUpdateInscriptionData("sportTimeStart", timePlace[0])
      handleUpdateInscriptionData("sportTimeEnd", timePlace[1])
      setTimePlace([timePlace[0], timePlace[1]])
    }
  }, [inscriptionData.activityPlace, handleUpdateInscriptionData, places])

  useEffect(() => {
    handleSelectPlace()
  }, [handleSelectPlace])
  //!

  const [paramsLoaded, setParamsLoaded] = useState(false)

  useEffect(() => {
    if (paramsLoaded) return
    if (searchData.searchParams && searchData.params) {
      const { params } = searchData
      if (params.city) {
        handleUpdateInscriptionData("city", params.city)

        if (params.activity) {
          handleUpdateInscriptionData("activity", params.activity)
        }

        if (params.place) {
          handleUpdateInscriptionData("activityPlace", params.place)
        }
      }
    }
    setParamsLoaded(true)
  }, [searchData, handleUpdateInscriptionData, paramsLoaded])

  return (
    <User pageTitle="Inscripciones">
      <Container>
        <form className={styles.form} onSubmit={handleSubmit}>
          <div>
            <p className={styles.required_text}>Los campos con un <span>*</span> son requeridos</p>
          </div>
          <div>
            <label htmlFor="i_name">
              Nombres: *
            </label>
            <input 
              type="text" 
              id="i_name"
              value={inscriptionData.name}
              onChange={(ev) => handleUpdateInscriptionData("name", ev.target.value)}
              required
            />
          </div>

          <div>
            <label htmlFor="i_lastname">
              Apellidos: *
            </label>
            <input 
              type="text" 
              id="i_lastname"
              value={inscriptionData.lastname}
              onChange={(ev) => handleUpdateInscriptionData("lastname", ev.target.value)}
              required
            />
          </div>

          <div>
            <label htmlFor="i_birthday">
              Fecha de Nacimiento: *
            </label>
            <input 
              type="date" 
              id="i_birthday"
              value={inscriptionData.birthday}
              onChange={(ev) => handleUpdateInscriptionData("birthday", ev.target.value)} 
              required
            />
          </div>

          <div>
            <label htmlFor="i_ci">
              Cedula: *
            </label>
            <input 
              type="number" 
              id="i_ci" 
              min={0} 
              maxLength={8} 
              minLength={8}
              value={inscriptionData.ci}
              onChange={(ev) => handleUpdateInscriptionData("ci", ev.target.value)}
              required
            />
          </div>

          <div className={styles.upload_cont}>
            <label 
              htmlFor="i_ci_img"
              className={styles.upload_img}
            >
              <BsUpload/> Cargar imagen de cedula *
            </label>
            <input 
              type="file"
              className="hidden" 
              accept="image/png, image/jpeg, image/webp"
              id="i_ci_img"
              onChange={(ev) => {
                if (ev.target.files) handleUpdateInscriptionData("imageCI", ev.target.files[0])
              }}
            />
            <p className={styles.upload_img_label}>
              {
                inscriptionData.imageCI && inscriptionData.imageCI.name
              }
            </p>
          </div>

          <div>
            <label htmlFor="i_gender">
              Sexo: *
            </label>
            <div className={styles.input_rad}>
              <label htmlFor="i_gender_m">M</label>
              <input 
                type="radio" 
                name="sex" 
                id="i_gender_m" 
                value="M"
                checked={inscriptionData.gender === 0}              
                onClick={() => handleUpdateInscriptionData("gender", 0)}
              />
            </div>
            <div className={styles.input_rad}>
              <label htmlFor="i_gender_f">F</label>
              <input 
                type="radio" 
                name="sex" 
                id="i_gender_f" 
                value="F"
                checked={inscriptionData.gender === 1}
                onClick={() => handleUpdateInscriptionData("gender", 1)}
              />
            </div>
          </div>

          <div className={styles.cont_img}>
            <label htmlFor="#">
              Ficha Medica: *
            </label>
            <div className={styles.input_rad}>
              <label htmlFor="i_fm_yes">Si</label>
              <input 
                type="radio" 
                name="m_fm" 
                id="i_fm_yes" 
                value="Y"
                checked={inscriptionData.medicalRecord === 1}
                onClick={() => handleUpdateInscriptionData("medicalRecord", 1)}
              />
            </div>
            <div className={styles.input_rad}>
              <label htmlFor="i_fm_no">No</label>
              <input 
                type="radio" 
                name="m_fm" 
                id="i_fm_no" 
                value="N"
                checked={inscriptionData.medicalRecord === 0}
                onClick={() => handleUpdateInscriptionData("medicalRecord", 0)}
              />
            </div>
            
            {
              inscriptionData.medicalRecord === 1 
              && 
              <>
              <div>
                <label htmlFor="i_fm_ex">Vence: *</label>
                <input 
                  type="date" 
                  id="i_fm_ex"
                  value={inscriptionData.expiration}
                  onChange={(ev) => handleUpdateInscriptionData("expiration", ev.target.value)}
                  required
                />
              </div>

              <div className={styles.upload_cont}>
                <label 
                  htmlFor="i_fm_img"
                  className={styles.upload_img}
                >
                  <BsUpload/> Cargar imagen de ficha medica *
                </label>

                <input 
                  type="file"
                  id="i_fm_img" 
                  className="hidden"
                  accept="image/png, image/jpeg, image/webp"  
                  onChange={(ev) => {
                    if (ev.target.files) handleUpdateInscriptionData("imageMedicalRecord", ev.target.files[0])
                  }}
                />

                <p className={styles.upload_img_label}>
                  { 
                    inscriptionData.imageMedicalRecord && inscriptionData.imageMedicalRecord.name
                  }
                </p>
              </div>
              </>
            }
          </div>

          <div>
            <label htmlFor="i_citysport">Ciudad: *</label>
            {/* <input 
              type="text" 
              id="i_citysport"
              value={inscriptionData.city}
              onChange={(ev) => handleUpdateInscriptionData("city", ev.target.value)}
              required
            /> */}
            <div className={styles.custom_select}>
              <select
                value={inscriptionData.city}
                onChange={(ev) => handleUpdateInscriptionData("city", ev.target.value)}
              >
                <option value="">Seleccionar</option>
                {
                  cityList.map((city, i) => (
                    <option value={city} key={i}>{city}</option>
                  ))
                }
              </select>
              <div>
                <BsChevronDown/>
              </div>
            </div>
          </div>

          <div>
            <label htmlFor="i_direction">
              Domicilio: *
            </label>
            <input 
              type="text" 
              id="i_direction"
              value={inscriptionData.residence}
              onChange={(ev) => handleUpdateInscriptionData("residence", ev.target.value)}
              required
            />
          </div>

          <div>
            <label htmlFor="i_phone">
              Tel/Cel: *
            </label>
            <input 
              type="number" 
              id="i_phone" 
              min={0} 
              minLength={8}
              value={inscriptionData.phone}
              onChange={(ev) => handleUpdateInscriptionData("phone", ev.target.valueAsNumber)}
              required
            />
          </div>

          <div>
            <label htmlFor="i_email">
              Email:
            </label>
            <input 
              type="text" 
              id="i_email"
              value={inscriptionData.email}
              onChange={(ev) => handleUpdateInscriptionData("email", ev.target.value)}
            />
          </div>

          <div>
            <label htmlFor="i_schoolar_year">
              Año Escolar Que Cursa:
            </label>
            <input 
              type="text" 
              id="i_schoolar_year"
              value={inscriptionData.schoolYear}
              onChange={(ev) => handleUpdateInscriptionData("schoolYear", ev.target.value)}
            />
          </div>

          <div>
            <label htmlFor="i_phone_alt">
              Tel/Cel alternativo:
            </label>
            <input 
              type="number" 
              id="i_phone_alt" 
              min={0} 
              minLength={8} 
              value={inscriptionData.alternativePhone}
              onChange={(ev) => handleUpdateInscriptionData("alternativePhone", ev.target.valueAsNumber)}
            />
          </div>

          <div>
            <div>
              <label htmlFor="i_activity">
                Actividad que va a Desarrollar: *
              </label>
              {/* <input 
                type="text" 
                id="i_activity" 
                value={inscriptionData.activity}
                onChange={(ev) => handleUpdateInscriptionData("activity", ev.target.value)}
                required
              /> */}
              <div className={styles.custom_select} style={{marginTop: "1rem"}}>
                <select 
                  value={inscriptionData.activity}
                  onChange={(ev) => handleUpdateInscriptionData("activity", ev.target.value)}
                >
                  <option value="">Seleccionar</option>
                  {
                    sports.map((sport, i) => (
                      <option key={i} value={sport}>{sport}</option>
                    ))
                  }
                </select>
                <div>
                  <BsChevronDown/>
                </div>
              </div>
            </div>

            <div>
              <label htmlFor="#"
                style={{
                  display: "flex",
                }}
              >
                Horario de: *
              </label>
              {/* <input 
                type="time"
                value={inscriptionData.sportTimeStart}
                onChange={(ev) => handleUpdateInscriptionData("sportTimeStart", ev.target.value)} 
                required
              />
              a
              <input 
                type="time" 
                value={inscriptionData.sportTimeEnd}
                onChange={(ev) => handleUpdateInscriptionData("sportTimeEnd", ev.target.value)}
                required
              /> */}
              <TimeRangePicker
                disableClock
                value={timePlace}
                locale="es-UY"
                required
                disabled
              />
            </div>
          </div>

          <div>
            <label htmlFor="i_sportplace">
              Lugar donde se desarrollara el deporte: *
            </label>
            {/* <input 
              type="text" 
              id="i_sportplace"
              value={inscriptionData.activityPlace}
              onChange={(ev) => handleUpdateInscriptionData("activityPlace", ev.target.value)}
              required
            /> */}
            <div className={styles.custom_select}>
              <select
                value={inscriptionData.activityPlace}
                onChange={(ev) => handleUpdateInscriptionData("activityPlace", ev.target.value)}
              >
                <option value="">Seleccionar</option>
                {
                  places.map((place, i) => (
                    <option key={i} value={place.place}>{place.place}</option>
                  ))
                }
              </select>
              <div>
                <BsChevronDown/>
              </div>
            </div>
          </div>

          <div>
            <div>
              <label htmlFor="i_other_act">
                Otros deportes que practica:
              </label>
              <input 
                type="text" 
                id="i_other_act"
                value={inscriptionData.anotherSports}
                onChange={(ev) => handleUpdateInscriptionData("anotherSports", ev.target.value)}
              />
            </div>

            <div>
              <label htmlFor="i_other_act_days">
                Dias:
              </label>
              <input 
                type="text" 
                id="i_other_act_days"
                // value={inscriptionData}
                // onChange={(ev) => handleUpdateInscriptionData}
              />
            </div>

            <div>
              <label htmlFor="i_other_act_c">
                Deportes que ha practicado:
              </label>
              <input 
                type="text" 
                id="i_other_act_c"
                value={inscriptionData.oldPractisedSport}
                onChange={(ev) => handleUpdateInscriptionData("oldPractisedSport", ev.target.value)}
              />
            </div>
          </div>


          <div>
            <div>
              <label htmlFor="#">
                Asistencia Médica: *
              </label>
              <div className={styles.input_rad}>
                <label htmlFor="i_medical_yes">Si</label>
                <input 
                  type="radio" 
                  name="fm" 
                  id="i_medical_yes" 
                  value="Y"
                  checked={inscriptionData.medicalAssistence === 1}
                  onClick={() => handleUpdateInscriptionData("medicalAssistence", 1)}/>
              </div>
              <div className={styles.input_rad}>
                <label htmlFor="i_medical_no">No</label>
                <input 
                  type="radio" 
                  name="fm" 
                  id="i_medical_no" 
                  value="N"
                  checked={inscriptionData.medicalAssistence === 0}
                  onClick={() => handleUpdateInscriptionData("medicalAssistence", 0)}
                />
              </div>
            </div>

            {
              inscriptionData.medicalAssistence === 1
              && <>
                <div>
                  <label htmlFor="i_medical_name">
                    ¿Cuál?: *
                  </label>
                  <input 
                    type="text" 
                    id="i_medical_name"
                    value={inscriptionData.whatMedicalCare}
                    onChange={(ev) => handleUpdateInscriptionData("whatMedicalCare", ev.target.value)}
                    required
                  />
                </div>

                <div>
                  <label htmlFor="i_medical_phone">Teléfono:</label>
                  <input 
                    type="number" 
                    id="i_medical_phone" 
                    min={0} 
                    minLength={8}
                    value={inscriptionData.medicalAssistencePhone}
                    onChange={(ev) => handleUpdateInscriptionData("medicalAssistencePhone", ev.target.valueAsNumber)}
                  />
                </div>
              </>
            }
          </div>

          <div>
            <label htmlFor="i_medical_blood">
              Grupo de Sangre:
            </label>
            <input 
              type="text" 
              id="i_medical_blood"
              value={inscriptionData.bloodGroup}
              onChange={(ev) => handleUpdateInscriptionData("bloodGroup", ev.target.value)}
            />
          </div>

          <div className={styles.checkbox_cont}>
            <h4>Enfermedades que tiene o ha tenido: *</h4>
            <div className={styles.checkbox_inputs_cont}>
            <div className={styles.checkbox_healty}>
              <label htmlFor="#">Diabetes:</label>
              <div>
                <div className={styles.div_radio}>
                  <label htmlFor="i_healty_d_yes">Si</label>
                  <input 
                    type="radio" 
                    id="i_healty_d_yes" 
                    value="Y" 
                    name="healty_d"
                    checked={inscriptionData.diabetes === 1}
                    onClick={() => handleUpdateInscriptionData("diabetes", 1)}
                  />
                </div>
                <div className={styles.div_radio}>
                  <label htmlFor="i_healty_d_no">No</label>
                  <input 
                    type="radio" 
                    id="i_healty_d_no" 
                    value="N" 
                    name="healty_d"
                    checked={inscriptionData.diabetes === 0}
                    onClick={() => handleUpdateInscriptionData("diabetes", 0)}
                  />
                </div>
              </div>
            </div>
 
            <div className={styles.checkbox_healty}>
              <label htmlFor="#">Hipertensión:</label>
              <div>
                <div className={styles.div_radio}>
                  <label htmlFor="i_healty_h_yes">Si</label>
                  <input 
                    type="radio" 
                    id="i_healty_h_yes" 
                    value="Y" 
                    name="healty_h"
                    checked={inscriptionData.hypertension === 1}
                    onClick={() => handleUpdateInscriptionData("hypertension", 1)}
                  />
                </div>
                <div className={styles.div_radio}>
                  <label htmlFor="i_healty_h_no">No</label>
                  <input 
                    type="radio" 
                    id="i_healty_h_no" 
                    value="N" 
                    name="healty_h"
                    checked={inscriptionData.hypertension === 0}
                    onClick={() => handleUpdateInscriptionData("hypertension", 0)}
                  />
                </div>
              </div>
            </div>

            <div className={styles.checkbox_healty}>
              <label htmlFor="#">Fracturas:</label>
              <div>
                <div className={styles.div_radio}>
                  <label htmlFor="i_healty_fr_yes">Si</label>
                  <input 
                    type="radio" 
                    id="i_healty_fr_yes" 
                    value="Y" 
                    name="healty_f"
                    checked={inscriptionData.fractures === 1}
                    onClick={() => handleUpdateInscriptionData("fractures", 1)}
                  />
                </div>
                <div className={styles.div_radio}>
                  <label htmlFor="i_healty_fr_no">No</label>
                  <input 
                    type="radio" 
                    id="i_healty_fr_no" 
                    value="N" 
                    name="healty_f"
                    checked={inscriptionData.fractures === 0}
                    onClick={() => handleUpdateInscriptionData("fractures", 0)}
                  />
                </div>
              </div>
            </div>

            <div className={styles.checkbox_healty}>
              <label htmlFor="#">Alergias:</label>
              <div>
                <div className={styles.div_radio}>
                  <label htmlFor="i_healty_al_yes">Si</label>
                  <input 
                    type="radio" 
                    id="i_healty_al_yes" 
                    value="Y" 
                    name="healty_a"
                    checked={inscriptionData.allergy === 1}
                    onClick={() => handleUpdateInscriptionData("allergy", 1)}
                  />
                </div>
                <div className={styles.div_radio}>
                  <label htmlFor="i_healty_al_no">No</label>
                  <input 
                    type="radio" 
                    id="i_healty_al_no" 
                    value="N" 
                    name="healty_a"
                    checked={inscriptionData.allergy === 0}
                    onClick={() => handleUpdateInscriptionData("allergy", 0)}
                  />
                </div>
              </div>
            </div>

            <div className={styles.checkbox_healty}>
              <label htmlFor="#">Asma:</label>
              <div>
                <div className={styles.div_radio}>
                  <label htmlFor="i_healty_asm_yes">Si</label>
                  <input 
                    type="radio" 
                    id="i_healty_asm_yes" 
                    value="Y" 
                    name="healty_as"
                    checked={inscriptionData.asthma === 1}
                    onClick={() => handleUpdateInscriptionData("asthma", 1)}/>
                </div>
                <div className={styles.div_radio}>
                  <label htmlFor="i_healty_asm_no">No</label>
                  <input 
                    type="radio" 
                    id="i_healty_asm_no" 
                    value="N" 
                    name="healty_as"
                    checked={inscriptionData.asthma === 0}
                    onClick={() => handleUpdateInscriptionData("asthma", 0)}
                  />
                </div>
              </div>
            </div>

            <div className={styles.div_radio}>
              <label htmlFor="i_healty_others">Otros:</label>
              <input 
                type="text" 
                id="i_healty_others"
                value={inscriptionData.otherDiseases}
                onChange={(ev) => handleUpdateInscriptionData("otherDiseases", ev.target.value)}
              />
            </div>

            <div>
              <label htmlFor="#">Usa lentes:</label>
              <div className={styles.div_radio}>
                <label htmlFor="i_healty_g_yes">Si</label>
                <input 
                  type="radio" 
                  id="i_healty_g_yes" 
                  value="Y" 
                  name="healty_g"
                  checked={inscriptionData.wearGlasses === 1}
                  onClick={() => handleUpdateInscriptionData("wearGlasses", 1)}
                />
              </div>
              <div className={styles.div_radio}>
                <label htmlFor="i_healty_g_no">No</label>
                <input 
                  type="radio" 
                  id="i_healty_g_no" 
                  value="N" 
                  name="healty_g"
                  checked={inscriptionData.wearGlasses === 0}
                  onClick={() => handleUpdateInscriptionData("wearGlasses", 0)}
                />
              </div>

              {
                inscriptionData.wearGlasses === 1
                &&               
                <div className={styles.div_radio}>
                  <label htmlFor="i_healty_g_type">de que tipo?</label>
                  <input 
                    type="text" 
                    id="i_healty_g_type"
                    value={inscriptionData.whatTypeGlasses}
                    onChange={(ev) => handleUpdateInscriptionData("whatTypeGlasses", ev.target.value)}
                    required
                  />
                </div>
              }


            </div>
            </div>
          </div>

          <div>
            <button type="submit">Inscribirse</button>
            <button type="button">Imprimir</button>
          </div>
        </form>
      </Container>

      <SendModal
        open={modalSend}
        close={() => setModalSend(false)}
        message={modalSendMsg}
        otherMessage={modalSendOtMsg}
        redirect={modalSendRedirect}
      />
    </User>
  )
}

export default Inscription
