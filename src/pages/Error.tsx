import { useEffect } from "react"
import { Link, useRouteError } from "react-router-dom"

const Error = () => {

  const error = useRouteError() as {data: string, internal: boolean, status: number, statusText: string}

  useEffect(() => {
    console.log(error)
  }, [error])

  return (
    <div>
      {
        error 
          ? error.data
          : "Ocurrio un error inesperado"

      }
      <Link to="/">Volver a /</Link>
    </div>
  )
}

export default Error
