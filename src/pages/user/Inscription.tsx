import Container from "../../components/templates/Container"
import User from "./User"
import styles from "../../css/inscription/Inscription.module.css"

const Inscription = () => {
  return (
    <User>
      <Container>
        <form className={styles.form}>
          <div>
            <label htmlFor="i_name">
              Nombres:
            </label>
            <input type="text" id="i_name"/>
          </div>

          <div>
            <label htmlFor="i_lastname">
              Apellidos:
            </label>
            <input type="text" id="i_lastname"/>
          </div>

          <div>
            <label htmlFor="i_birthday">
              Fecha de Nacimiento:
            </label>
            <input type="date" id="i_birthday" />
          </div>

          <div>
            <label htmlFor="i_ci">
              Cedula:
            </label>
            <input type="number" id="i_ci" min={0} maxLength={8} minLength={8}/>
          </div>

          <div>
            <label htmlFor="i_gender">
              Sexo:
            </label>
            <div>
              <label htmlFor="i_gender_m">M</label>
              <input type="radio" name="sex" id="i_gender_m" value="M"/>
            </div>
            <div>
              <label htmlFor="i_gender_f">F</label>
              <input type="radio" name="sex" id="i_gender_f" value="F"/>
            </div>
          </div>

          <div>
            <label htmlFor="#">
              Ficha Medica:
            </label>
            <div>
              <label htmlFor="i_fm_yes">Si</label>
              <input type="radio" name="fm" id="i_fm_yes" value="Y"/>
            </div>
            <div>
              <label htmlFor="i_fm_no">No</label>
              <input type="radio" name="fm" id="i_fm_no" value="N"/>
            </div>

            <div>
              <label htmlFor="i_fm_ex">Vence:</label>
              <input type="date" id="i_fm_ex"/>
            </div>
          </div>

          <div>
            <label htmlFor="i_citysport">Ciudad</label>
            <input type="text" id="i_citysport"/>
          </div>

          <div>
            <label htmlFor="i_direction">
              Domicilio:
            </label>
            <input type="text" id="i_direction"/>
          </div>

          <div>
            <label htmlFor="i_phone">
              Tel/Cel:
            </label>
            <input type="number" id="i_phone" min={0} minLength={8}/>
          </div>

          <div>
            <label htmlFor="i_email">
              Email:
            </label>
            <input type="text" id="i_email"/>
          </div>

          <div>
            <label htmlFor="i_schoolar_year">
              Año Escolar Que Cursa:
            </label>
            <input type="text" id="i_schoolar_year"/>
          </div>

          <div>
            <label htmlFor="i_phone_alt">
              Tel/Cel alternativo:
            </label>
            <input type="number" id="i_phone_alt" min={0} minLength={8} />
          </div>

          <div>
            <div>
              <label htmlFor="i_activity">
                Actividad que va a Desarrollar:
              </label>
              <input type="text" id="i_activity" />
            </div>

            <div>
              <label htmlFor="#">
                Horario de:
              </label>
              <input type="time" />
              a
              <input type="time" />
            </div>
          </div>

          <div>
            <label htmlFor="i_sportplace">Lugar donde se desarrollara el deporte:</label>
            <input type="text" id="i_sportplace"/>
          </div>

          <div>
            <div>
              <label htmlFor="i_other_act">
                Otros deportes que practica:
              </label>
              <input type="text" id="i_other_act"/>
            </div>

            <div>
              <label htmlFor="i_other_act_days">
                Dias:
              </label>
              <input type="text" id="i_other_act_days"/>
            </div>

            <div>
              <label htmlFor="i_other_act_c">
                Deportes que ha practicado:
              </label>
              <input type="text" id="i_other_act_c"/>
            </div>
          </div>


          <div>
            <div>
              <label htmlFor="#">
                Asistencia Médica:
              </label>
              <div>
                <label htmlFor="i_medical_yes">Si</label>
                <input type="radio" name="fm" id="i_medical_yes" value="Y"/>
              </div>
              <div>
                <label htmlFor="i_medical_no">No</label>
                <input type="radio" name="fm" id="i_medical_no" value="N"/>
              </div>
            </div>

            <div>
              <label htmlFor="i_medical_name">¿Cuál?:</label>
              <input type="text" id="i_medical_name"/>
            </div>

            <div>
              <label htmlFor="i_medical_phone">Teléfono:</label>
              <input type="number" id="i_medical_phone" min={0} minLength={8} />
            </div>
          </div>

          <div>
            <label htmlFor="i_medical_blood">Grupo de Sangre</label>
            <input type="text" id="i_medical_blood"/>
          </div>

          <div>
            <h4>Enfermedades que tiene o ha tenido:</h4>
            <div>
            <div className={styles.checkbox_healty}>
              <label htmlFor="#">Diabetes:</label>
              <div>
                <div>
                  <label htmlFor="i_healty_d_yes">Si</label>
                  <input type="radio" id="i_healty_d_yes" value="Y" name="healty_d"/>
                </div>
                <div>
                  <label htmlFor="i_healty_d_no">No</label>
                  <input type="radio" id="i_healty_d_no" value="N" name="healty_d"/>
                </div>
              </div>
            </div>
 
            <div className={styles.checkbox_healty}>
              <label htmlFor="#">Hipertensión:</label>
              <div>
                <div>
                  <label htmlFor="i_healty_h_yes">Si</label>
                  <input type="radio" id="i_healty_h_yes" value="Y" name="healty_h"/>
                </div>
                <div>
                  <label htmlFor="i_healty_h_no">No</label>
                  <input type="radio" id="i_healty_h_no" value="N" name="healty_h"/>
                </div>
              </div>
            </div>

            <div className={styles.checkbox_healty}>
              <label htmlFor="#">Fracturas:</label>
              <div>
                <div>
                  <label htmlFor="i_healty_fr_yes">Si</label>
                  <input type="radio" id="i_healty_fr_yes" value="Y" name="healty_f"/>
                </div>
                <div>
                  <label htmlFor="i_healty_fr_no">No</label>
                  <input type="radio" id="i_healty_fr_no" value="N" name="healty_f"/>
                </div>
              </div>
            </div>

            <div className={styles.checkbox_healty}>
              <label htmlFor="#">Alergias:</label>
              <div>
                <div>
                  <label htmlFor="i_healty_al_yes">Si</label>
                  <input type="radio" id="i_healty_al_yes" value="Y" name="healty_a"/>
                </div>
                <div>
                  <label htmlFor="i_healty_al_no">No</label>
                  <input type="radio" id="i_healty_al_no" value="N" name="healty_a"/>
                </div>
              </div>
            </div>

            <div className={styles.checkbox_healty}>
              <label htmlFor="#">Asma:</label>
              <div>
                <div>
                  <label htmlFor="i_healty_asm_yes">Si</label>
                  <input type="radio" id="i_healty_asm_yes" value="Y" name="healty_as"/>
                </div>
                <div>
                  <label htmlFor="i_healty_asm_no">No</label>
                  <input type="radio" id="i_healty_asm_no" value="N" name="healty_as"/>
                </div>
              </div>
            </div>

            <div>
              <label htmlFor="i_healty_others">Otros:</label>
              <input type="text" id="i_healty_others"/>
            </div>

            <div>
              <label htmlFor="#">Usa lentes:</label>
              <div>
                <label htmlFor="i_healty_g_yes">Si</label>
                <input type="radio" id="i_healty_g_yes" value="Y" name="healty_g"/>
              </div>
              <div>
                <label htmlFor="i_healty_g_no">No</label>
                <input type="radio" id="i_healty_g_no" value="N" name="healty_g"/>
              </div>

              <div>
                <label htmlFor="i_healty_g_type">de que tipo?</label>
                <input type="text" id="i_healty_g_type"/>
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
