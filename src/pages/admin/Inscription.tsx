import Admin from "./Admin"
import tableStyles from "../../css/admin/table.module.css"
import { useCallback, useContext, useEffect, useState } from "react"
import { TInscription } from "../../api/admin/inscription/inscription.types"
import apiAdminGetInscriptions from "../../api/admin/inscription/getInscriptions"
import { userSessionContext } from "../../context/session/UserSessionContext"
import { Link } from "react-router-dom"

const stateLabel: Readonly<{}> = {
  1: "Pendiente",
  2: "Inscrito",
  3: "Dado de baja"
} 

const Inscription = () => {

  const { token } = useContext(userSessionContext)

  const [inscriptionData, setInscriptionData] = useState<TInscription[]>([])

  const handleGetInscriptionData = useCallback(async () => {
    const res = await apiAdminGetInscriptions(token)

    if (res.status) {
      setInscriptionData(res.data)
    }
  }, [])

  useEffect(() => {
    handleGetInscriptionData()
  }, [handleGetInscriptionData])

  return (
    <Admin route_title="Inscripciones">
      <div className={tableStyles.table}>
        {
          inscriptionData.map((inscription) => (
            <div className={tableStyles.entry}>
              <div className={tableStyles.id}>
                <span>{inscription.id}</span>
              </div>

              <div className={tableStyles.a}>
                <p>{inscription.name} {inscription.lastname}</p>
                <p>{inscription.activity} - {inscription.activityPlace}</p>
              </div>

              <div>
                <span>{stateLabel[inscription.state as keyof typeof stateLabel]}</span>
              </div>

              <div className={tableStyles.btns}>
                <Link to={`/admin/inscription?id=${inscription.id}`}>
                  Ver mas
                </Link>
              </div>
            </div>
          ))
        }
      </div>
    </Admin>
  )
}

export default Inscription
