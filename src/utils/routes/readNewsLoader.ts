import { LoaderFunction } from "react-router-dom";
import newsDemo from "../demo/news.json"

const readNewsLoader: LoaderFunction = ({ params }) => {
  if (!params.id) {
    throw new Response("Tienes que ingresar el ID de la noticia.")
  }

  const newsFind = newsDemo.find(news => news.id === Number(params.id))

  if (!newsFind) {
    throw new Response("El ID ingresado no pertence a ninguna noticia")
  }

  return newsFind
}

export default readNewsLoader
