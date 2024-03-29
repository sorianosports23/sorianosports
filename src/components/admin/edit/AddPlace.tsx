import { BsXLg } from "react-icons/bs"
import modalStyles from "../../../css/Modal.module.css"
import { FormEvent, useContext, useState } from "react"
import edit from "../../../css/admin/page/EditCity.module.css"
import { userSessionContext } from "../../../context/session/UserSessionContext"
import apiAdminAddPlace from "../../../api/admin/city/addPlace"
import useCloseModalKey from "../../../utils/useCloseModalKey"

type TAddPlaceProps = {
  open: boolean
  close: () => void
  city: string
  sports: TCityRes[]
  showModal: (msg: string, otMsg?: string) => void
  reloadPlaces: () => void
}


const AddPlace = ({ open, close, city, sports, showModal, reloadPlaces }: TAddPlaceProps) => {
  
  const { token } = useContext(userSessionContext)

  const [name, setName] = useState("")
  const [sport, setSport] = useState("")
  const [age, setAge] = useState("")
  const [teacher, setTeacher] = useState("")
  const [date, setDate] = useState("")
  const [time, setTime] = useState("")

  const handleSubmit = async (ev: FormEvent) => {
    ev.preventDefault()

    const data = {
      token,
      placeData: {
        city,
        sport,
        age,
        teacher,
        place: name,
        date,
        time
      }
    }

    const res = await apiAdminAddPlace(data)

    if (res.status) {
      showModal("Se añadio el lugar", "")
      reloadPlaces()
      close()
    } else {
      showModal("No se pudo añadir el lugar", res.message)
    }
  }
  
  return (
    <div 
      className={modalStyles.cont} 
      data-open={open}
      {...useCloseModalKey({ open, close })}
    >
      <form
        onSubmit={handleSubmit}
        className={modalStyles.modal}
      >
        <div
          className={modalStyles.header}
        >
          <h2>Añadir lugar</h2>
          <button
            type="button"
            onClick={close}
          >
            <BsXLg/>
          </button>
        </div>

        <div className={edit.inputs}>
          <div>
            <label htmlFor="place_name">Nombre del lugar:</label>
            <input 
              type="text" 
              id="place_name"
              value={name}
              onChange={(ev) => setName(ev.target.value)}
            />
          </div>

          <div>
            <label htmlFor="place_sport">Deporte:</label>
            <select id="place_sport"
              value={sport}
              onChange={(ev) => setSport(ev.target.value)}
            >
              <option value="#">-</option>
              {
                sports.map((sport, i) => (
                  <option value={sport.name} key={i}>{sport.name} - {sport.type === "summer" ? "Verano" : "Anual"}</option>
                ))
              }
            </select>
          </div>

          <div>
            <label htmlFor="place_age">Rango de Edad:</label>
            <input 
              type="text" 
              placeholder="Ej:De 12 a 16"
              id="place_age" 
              min={1}
              max={100}
              maxLength={60}
              value={age}
              onChange={(ev) => setAge(ev.target.value)}
            />
          </div>

          <div>
            <label htmlFor="place_teacher">Profesor:</label>
            <input 
              type="text" 
              id="place_teacher"
              value={teacher}
              onChange={(ev) => setTeacher(ev.target.value)}
            />
          </div>

          <div>
            <label htmlFor="place_date">Fecha:</label>
            <input 
              type="text" 
              id="place_date"
              placeholder="Ej: Cada jueves"
              value={date}
              onChange={(ev) => setDate(ev.target.value)}
            />
          </div>

          <div>
            <label htmlFor="place_time">Horario:</label>
            <input 
              type="text" 
              id="place_time"
              placeholder="Ej: 15:00 - 17:00"
              value={time}
              onChange={(ev) => setTime(ev.target.value)}
            />
          </div>
        </div>

        <div
          className={`${modalStyles.footer} ${modalStyles.btns}`}
        >
          <button
            type="button"
            onClick={close}
            className={modalStyles.btn_cancel}
          >
            Cancelar
          </button>
          <button
            type="submit"
            className={modalStyles.btn_accept}
          >
            Añadir
          </button>
        </div>
      </form>
    </div>
  )
}

export default AddPlace
