import { LoaderFunction, LoaderFunctionArgs } from "react-router-dom";
import cityList from "../cityList";
import sportList from "../sportList";

const sportLoader: LoaderFunction = ({ params }: LoaderFunctionArgs) => {
  const city = params.city
  const sport = params.sport

  if (!city || !sport) {
    throw new Response("Tienes que indicar la ciudad y el deporte")
  }

  if (!cityList.includes(city)) {
    throw new Response("La ciudad indicada no existe o no tenemos información de la misma")
  }

  if (!sportList.includes(sport)) {
    throw new Response("El deporte indicado no existe o no tenemos información del mismo")
  }
  
  return true
}

export default sportLoader