import { useEffect } from "react"
import { Link, useNavigate, useRouteError } from "react-router-dom"
import styles from "../css/Error.module.css"

const Error = () => {

  const error = useRouteError() as {data: string, internal: boolean, status: number, statusText: string}
  const navigate = useNavigate()

  useEffect(() => {
    console.log(error)
  }, [error])

  return (
    <div className={styles.main}>
      <h1>Error</h1>
      <p>
        {
          error 
            ? error.data
            : "Ocurrio un error inesperado"

        }
      </p>
      <div className={styles.btn}>
        <button onClick={() => navigate(-1)}>Volver</button>
        <Link to="/">Inicio</Link>
      </div>

      <div className={styles.text}>
        <p>
          Si el error continua apareciendo, manda un mensaje usando el formulario de contacto.
          <Link to="/acerca/contacto">Formulario de contacto</Link>
        </p>
      </div>
    </div>
  )
}

export default Error
