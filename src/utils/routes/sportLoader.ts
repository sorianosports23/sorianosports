import { LoaderFunction, LoaderFunctionArgs } from "react-router-dom";
import cityList from "../cityList";
import apiGetCitySports from "../../api/page/sports/getCitySports";

const sportLoader: LoaderFunction = async ({ params }: LoaderFunctionArgs) => {
  const city = params.city
  const sport = params.sport

  if (!city || !sport) {
    throw new Response("Tienes que indicar la ciudad y el deporte")
  }

  if (!cityList.includes(city)) {
    throw new Response("La ciudad indicada no existe o no tenemos información de la misma")
  }

  const citySports = await apiGetCitySports(city)

  if (!citySports.status) {
    throw new Response("Ocurrio un error al cargar los deportes")
  }

  if (!citySports.data.includes(sport)) {
    throw new Response("El deporte indicado no existe o no tenemos información del mismo")
  }
  
  return true
}

export default sportLoader