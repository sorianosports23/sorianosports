import CompContainer from "../../components/templates/CompContainer"
import PageUser from "./PageUser"
import { useParams } from "react-router-dom"

const PageSport = () => {

  const { city, sport } = useParams()

  return (
    <PageUser>
      <CompContainer>
        <div>
          <div>
            <h1>{sport} - {city}</h1>
          </div>

          <div>
            <img src="" alt="" />
          </div>
        </div>

        <div>
          <h3>Seleccionar ciudad</h3>

          <div>
            Ciudad
          </div>
        </div>

        <div>
          <div>
            <h4>Escuelas</h4>
            <ul>
              <li>Escuela 1</li>
            </ul>
          </div>

          <div></div>

          <div>
            <h4>Eventos</h4>
            <ul>
              <li>Evento 1</li>
            </ul>
          </div>
        </div>
      </CompContainer>
    </PageUser>
  )
}

export default PageSport
