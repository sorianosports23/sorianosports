import Container from "../../components/templates/Container"
import User from "./User"
import styles from "../../css/inscription/Inscription.module.css"
import { FormEvent, useContext, useState } from "react"
import { TInscription } from "../../api/admin/inscription/inscription.types"
import { userSessionContext } from "../../context/session/UserSessionContext"
import apiSendInscription from "../../api/admin/inscription/sendInscription"

const Inscription = () => {

  const { token } = useContext(userSessionContext)

  const [inscriptionData, setInscriptionData] = useState<Omit<TInscription, "state">>({
    name: "",
    lastname: "",
    birthday: "",
    ci: 0,
    gender: 0,
    medicalRecord: 0,
    imageMedicalRecord: "",
    city: "",
    residence: "",
    phone: 0,
    sportTimeStart: "",
    sportTimeEnd: "",
    activity: "",
    activityPlace: "",
    medicalAssitence: 0,
    diabetes: 0,
    hypertension: 0,
    fractures: 0,
    allergy: 0,
    asthma: 0,
    wearGlasses: 0
  })

  const handleUpdateInscriptionData = (attribute: keyof typeof inscriptionData, value: any) => {
    setInscriptionData(prev => ({
      ...prev,
      [attribute]: value
    }))
  }

  const handleSubmit = async (ev: FormEvent) => {
    ev.preventDefault()
    const data = {
      token,
      data: inscriptionData
    }

    const res = await apiSendInscription(data)

    console.log(res)
  }

  return (
    <User>
      <Container>
        <form className={styles.form} onSubmit={handleSubmit}>
          <div>
            <label htmlFor="i_name">
              Nombres:
            </label>
            <input 
              type="text" 
              id="i_name"
              value={inscriptionData.name}
              onChange={(ev) => handleUpdateInscriptionData("name", ev.target.value)}
            />
          </div>

          <div>
            <label htmlFor="i_lastname">
              Apellidos:
            </label>
            <input 
              type="text" 
              id="i_lastname"
              value={inscriptionData.lastname}
              onChange={(ev) => handleUpdateInscriptionData("lastname", ev.target.value)}
            />
          </div>

          <div>
            <label htmlFor="i_birthday">
              Fecha de Nacimiento:
            </label>
            <input 
              type="date" 
              id="i_birthday"
              value={inscriptionData.birthday}
              onChange={(ev) => handleUpdateInscriptionData("birthday", ev.target.value)} 
            />
          </div>

          <div>
            <label htmlFor="i_ci">
              Cedula:
            </label>
            <input 
              type="number" 
              id="i_ci" 
              min={0} 
              maxLength={8} 
              minLength={8}
              value={inscriptionData.ci}
              onChange={(ev) => handleUpdateInscriptionData("ci", ev.target.value)}
            />
          </div>

          <div>
            <label htmlFor="i_gender">
              Sexo:
            </label>
            <div>
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
            <div>
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

          <div>
            <label htmlFor="#">
              Ficha Medica:
            </label>
            <div>
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
            <div>
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

            <div>
              <label htmlFor="i_fm_ex">Vence:</label>
              <input 
                type="date" 
                id="i_fm_ex"
                value={inscriptionData.expiration}
                onChange={(ev) => handleUpdateInscriptionData("expiration", ev.target.value)}
              />
            </div>
          </div>

          <div>
            <label htmlFor="i_citysport">Ciudad</label>
            <input 
              type="text" 
              id="i_citysport"
              value={inscriptionData.city}
              onChange={(ev) => handleUpdateInscriptionData("city", ev.target.value)}
            />
          </div>

          <div>
            <label htmlFor="i_direction">
              Domicilio:
            </label>
            <input 
              type="text" 
              id="i_direction"
              value={inscriptionData.residence}
              onChange={(ev) => handleUpdateInscriptionData("residence", ev.target.value)}
            />
          </div>

          <div>
            <label htmlFor="i_phone">
              Tel/Cel:
            </label>
            <input 
              type="number" 
              id="i_phone" 
              min={0} 
              minLength={8}
              value={inscriptionData.phone}
              onChange={(ev) => handleUpdateInscriptionData("phone", ev.target.valueAsNumber)}
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
                Actividad que va a Desarrollar:
              </label>
              <input 
                type="text" 
                id="i_activity" 
                value={inscriptionData.activity}
                onChange={(ev) => handleUpdateInscriptionData("activity", ev.target.value)}
              />
            </div>

            <div>
              <label htmlFor="#">
                Horario de:
              </label>
              <input 
                type="time"
                value={inscriptionData.sportTimeStart}
                onChange={(ev) => handleUpdateInscriptionData("sportTimeStart", ev.target.value)} 
              />
              a
              <input 
                type="time" 
                value={inscriptionData.sportTimeEnd}
                onChange={(ev) => handleUpdateInscriptionData("sportTimeEnd", ev.target.value)}
              />
            </div>
          </div>

          <div>
            <label htmlFor="i_sportplace">Lugar donde se desarrollara el deporte:</label>
            <input 
              type="text" 
              id="i_sportplace"
              value={inscriptionData.activityPlace}
              onChange={(ev) => handleUpdateInscriptionData("activityPlace", ev.target.value)}/>
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
                Asistencia Médica:
              </label>
              <div>
                <label htmlFor="i_medical_yes">Si</label>
                <input 
                  type="radio" 
                  name="fm" 
                  id="i_medical_yes" 
                  value="Y"
                  checked={inscriptionData.medicalAssitence === 1}
                  onClick={() => handleUpdateInscriptionData("medicalAssitence", 1)}/>
              </div>
              <div>
                <label htmlFor="i_medical_no">No</label>
                <input 
                  type="radio" 
                  name="fm" 
                  id="i_medical_no" 
                  value="N"
                  checked={inscriptionData.medicalAssitence === 0}
                  onClick={() => handleUpdateInscriptionData("medicalAssitence", 0)}
                />
              </div>
            </div>

            <div>
              <label htmlFor="i_medical_name">¿Cuál?:</label>
              <input 
                type="text" 
                id="i_medical_name"
                value={inscriptionData.whatMedicalCare}
                onChange={(ev) => handleUpdateInscriptionData("whatMedicalCare", ev.target.value)}
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
          </div>

          <div>
            <label htmlFor="i_medical_blood">Grupo de Sangre</label>
            <input 
              type="text" 
              id="i_medical_blood"
              value={inscriptionData.bloodGroup}
              onChange={(ev) => handleUpdateInscriptionData("bloodGroup", ev.target.value)}
            />
          </div>

          <div>
            <h4>Enfermedades que tiene o ha tenido:</h4>
            <div>
            <div className={styles.checkbox_healty}>
              <label htmlFor="#">Diabetes:</label>
              <div>
                <div>
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
                <div>
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
                <div>
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
                <div>
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
                <div>
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
                <div>
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
                <div>
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
                <div>
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
                <div>
                  <label htmlFor="i_healty_asm_yes">Si</label>
                  <input 
                    type="radio" 
                    id="i_healty_asm_yes" 
                    value="Y" 
                    name="healty_as"
                    checked={inscriptionData.asthma === 1}
                    onClick={() => handleUpdateInscriptionData("asthma", 1)}/>
                </div>
                <div>
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

            <div>
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
              <div>
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
              <div>
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

              <div>
                <label htmlFor="i_healty_g_type">de que tipo?</label>
                <input 
                  type="text" 
                  id="i_healty_g_type"
                  value={inscriptionData.whatTypeGlasses}
                  onChange={(ev) => handleUpdateInscriptionData("whatTypeGlasses", ev.target.value)}
                />
              </div>
            </div>
            </div>
          </div>

          <div>
            <button type="submit">Inscribirse</button>
            <button type="button">Imprimir</button>
          </div>
        </form>
      </Container>
    </User>
  )
}

export default Inscription
