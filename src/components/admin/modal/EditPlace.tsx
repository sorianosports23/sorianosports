import { BsXLg } from "react-icons/bs"
import modalStyles from "../../../css/Modal.module.css"
import { FormEvent, useContext, useEffect, useState } from "react"
import edit from "../../../css/admin/page/EditCity.module.css"
import { userSessionContext } from "../../../context/session/UserSessionContext"
import apiAdminModifyPlace from "../../../api/admin/city/modifyPlace"

type TEditPlaceProps = {
  open: boolean
  close: () => void
  info: TPlace
  openModal: (msg: string, otMsg?: string) => void
  sports: TCityRes[]
  reloadPlaces: () => void
}

const EditPlace = ({ open, close, sports, info, openModal, reloadPlaces }: TEditPlaceProps) => {

  const { token } = useContext(userSessionContext)

  const [name, setName] = useState("")
  const [sport, setSport] = useState("")
  const [age, setAge] = useState("")
  const [teacher, setTeacher] = useState("")
  const [date, setDate] = useState("")
  const [time, setTime] = useState("")

  useEffect(() => {
    setName(info.place)
    setSport(info.sport)
    setAge(info.age)
    setTeacher(info.teacher)
    setDate(info.date)
    setTime(info.time)
  }, [info])
  
  const handleSubmit = async (ev: FormEvent) => {
    ev.preventDefault()

    const data: TApiAdminModifyPlaceRequest = {
      token,
      info: {
        id: info.id,
        age,
        date,
        place: name,
        sport,
        teacher,
        time
      }
    }

    const res = await apiAdminModifyPlace(data)

    if (res.status) {
      close()
      openModal("Se edito correctamente")
      reloadPlaces()
    } else {
      openModal("No se pudo editar", res.message)
    }
  }

  return (
    <div 
      className={modalStyles.cont}
      data-open={open}
    >
      <form 
        className={modalStyles.modal}
        onSubmit={handleSubmit}
      >
        <div className={modalStyles.header}>
          <h2>Editar lugar</h2>
          <button
            onClick={close}
            type="button"
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
              placeholder="De 13 a 18 años"
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

        <div className={`${modalStyles.footer} ${modalStyles.btns}`}>
          <button
            type="button"
            onClick={close}
            className={modalStyles.btn_cancel}
          >
            Cancelar
          </button>

          <button
            type="submit"
            onClick={() => {}}
            className={modalStyles.btn_accept}
          >
            Editar
          </button>
        </div>
      </form>
    </div>
  )
}

export default EditPlace
