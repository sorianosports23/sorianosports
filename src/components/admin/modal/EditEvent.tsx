import { BsChevronDown, BsUpload, BsXLg } from "react-icons/bs"
import modalStyles from "../../../css/Modal.module.css"
import styles from "../../../css/admin/events/EditEvent.module.css"
import { ChangeEvent, FormEvent, useEffect, useState } from "react"
import LoaderComp from "../../LoaderComp"
import Loader from "../../Loader"
import api from "../../../api/apiRoute"
import cityList from "../../../utils/cityList"
import useCloseModalKey from "../../../utils/useCloseModalKey"

type TEditEventProps = {
  open: boolean
  close: () => void
  info: IEventID
  submitting: boolean
  handleSubmit: ({ id, name, description, place, sport, time, date_ev, city, extraInfo, inscriptionInfo, rules, urlUbi, image }: Omit<IApiAdminModifyEventRequest, "token">) => void
}

const EditEvent = ({ open, close, info, submitting, handleSubmit }: TEditEventProps) => {
  
  const [editName, setEditName] = useState(info.name)
  const [editDesc, setEditDesc] = useState(info.description) 
  const [editSport, setEditSport] = useState(info.sport) 
  const [editPlace, setEditPlace] = useState(info.place) 
  const [editDate, setEditDate] = useState(info.date_ev) 
  const [editTime, setEditTime] = useState(info.time) 
  const [editCity, setEditCity] = useState(info.city)
  const [editRules, setEditRules] = useState(info.rules)
  const [editInscInfo, setEditInscInfo] = useState(info.inscriptionInfo)
  const [editExtraInfo, setEditExtraInfo] = useState(info.extraInfo)
  const [editUrl, setEditUrl] = useState(info.urlUbi)
  const [editImage, setEditImage] = useState<File | undefined>(undefined)

  useEffect(() => {
    setEditName(info.name)
    setEditDesc(info.description)
    setEditSport(info.sport)
    setEditPlace(info.place)
    setEditDate(info.date_ev)
    setEditTime(info.time)
    setEditCity(info.city)
    setEditRules(info.rules)
    setEditInscInfo(info.inscriptionInfo)
    setEditExtraInfo(info.extraInfo)
    setEditUrl(info.urlUbi)
    setEditImage(undefined)
  }, [info])

  const handleSubmitEv = (ev: FormEvent) => {
    ev.preventDefault()
    const data: Omit<IApiAdminModifyEventRequest, "token"> = {
      id: info.id,
      name: editName,
      description: editDesc,
      sport: editSport,
      place: editPlace,
      date_ev: editDate,
      time: editTime,
      city: editCity,
      extraInfo: editExtraInfo,
      inscriptionInfo: editInscInfo,
      rules: editRules,
      urlUbi: editUrl,
      image: editImage
    }
    handleSubmit(data)
  }

  const handleChangeImage = (ev: ChangeEvent<HTMLInputElement>) => {
    if (ev.target.files) {
      setEditImage(ev.target.files[0])
    }
  }

  return (
    <div 
      className={modalStyles.cont}
      data-open={open}
      {...useCloseModalKey({ open, close })}
    >
      <form className={modalStyles.modal} onSubmit={handleSubmitEv}>
        <div className={modalStyles.header}>
          <h2>Editar evento</h2>
          <button
            type="button"
            onClick={close}
          >
            <BsXLg/>
          </button>
        </div>

        <div className={styles.edit}>
          <div>
            <label htmlFor="es_name">Nombre:</label>
            <input 
              type="text" 
              id="es_name"
              value={editName}
              onChange={(ev) => setEditName(ev.target.value)}
            />
          </div>
          <div>
            <img 
              src={`${api}/events/getImage.php?id=${info.id}`} 
              alt={editName + " img"} 
            />
            <label htmlFor="edit_img" className={styles.btn_img}>
              <BsUpload/>
              Cargar imagen
            </label>

            <span>
              {
                editImage && editImage.name
              }
            </span>

            <input 
              type="file" 
              id="edit_img"
              className="hidden"
              onChange={handleChangeImage}
              accept="image/png, image/jpeg, image/svg+xml, image/webp"
            />
          </div>
          <div className={styles.textarea}>
            <label htmlFor="es_description">Descripcion:</label>
            <textarea 
              id="es_description"
              value={editDesc}
              onChange={(ev) => setEditDesc(ev.target.value)}
            ></textarea>
          </div>
          <div>
            <label htmlFor="es_sport">Deporte:</label>
            <input 
              type="text" 
              id="es_sport"
              value={editSport}
              onChange={(ev) => setEditSport(ev.target.value)}
            />
          </div>
          <div>
            <label htmlFor="es_place">Lugar:</label>
            <input 
              type="text" 
              id="es_place" 
              value={editPlace}
              onChange={(ev) => setEditPlace(ev.target.value)}
            />
          </div>
          <div>
            <label htmlFor="es_date">Fecha:</label>
            <input 
              type="date" 
              id="es_date"
              value={editDate}
              onChange={(ev) => setEditDate(ev.target.value)}
            />
          </div>
          <div>
            <label htmlFor="es_time">Duración:</label>
            <input 
              type="text" 
              id="es_time"
              value={editTime}
              onChange={(ev) => setEditTime(ev.target.value)}
            />
          </div>
          <div>
            <label htmlFor="es_city">Ciudad:</label>
            <div className="custom_select">
              <select 
                id="es_city"
                value={editCity}
                onChange={(ev) => setEditCity(ev.target.value)}  
              >
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
            <label htmlFor="es_rules">Reglas:</label>
            <textarea 
              id="es_rules" 
              value={editRules}
              onChange={(ev) => setEditRules(ev.target.value)}
            ></textarea>
          </div>
          <div>
            <label htmlFor="es_info_inscr">Información sobre inscripción:</label>
            <textarea 
              id="es_info_inscr" 
              value={editInscInfo}
              onChange={(ev) => setEditInscInfo(ev.target.value)}
            ></textarea>
          </div>
          <div>
            <label htmlFor="es_extrainfo">Información extra:</label>
            <textarea 
              id="es_extrainfo" 
              value={editExtraInfo}
              onChange={(ev) => setEditExtraInfo(ev.target.value)}
            ></textarea>
          </div>
          <div>
            <label htmlFor="es_url">IFrame Google Maps:</label>
            <input 
              type="text" 
              id="es_url"
              value={editUrl}
              onChange={(ev) => setEditUrl(ev.target.value)}
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
            disabled={submitting}
            className={modalStyles.btn_accept}
          >
            {
              submitting
                ? <Loader/>
                : "Editar"
            }
          </button>
        </div>
      </form>
    </div>
  )
}

export default EditEvent
