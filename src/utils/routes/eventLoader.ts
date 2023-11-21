import { LoaderFunction } from "react-router-dom";
import apiGetEvent from "../../api/page/events/getEvent"

const eventLoader: LoaderFunction = async ({ params }) => {
  if (!params.id) {
    throw new Response("Tienes que ingresar el ID del evento.")
  }

  if (isNaN(Number(params.id))) {
    throw new Response("El ID no es valido.")
  }

  // const newsFind = await apiGetNewsId(Number(params.id))

  // if (newsFind.status) {
  //   throw new Response("El ID ingresado no pertence a ninguna noticia")
  // }

  const eventRes = await apiGetEvent(Number(params.id))

  if (!eventRes.status) {
    throw new Response(`Ocurrio un error al cargar el evento - ${eventRes.message}`)
  }

  if (!eventRes.data) {
    throw new Response("No se encontro el evento")
  }

  return eventRes.data
}

export default eventLoader
