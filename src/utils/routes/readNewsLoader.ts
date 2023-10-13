import { LoaderFunction } from "react-router-dom";
import newsDemo from "../demo/news"
import apiGetNewsId from "../../api/page/getNewsId";

const readNewsLoader: LoaderFunction = async ({ params }) => {
  if (!params.id) {
    throw new Response("Tienes que ingresar el ID de la noticia.")
  }

  const newsFind = await apiGetNewsId(Number(params.id))

  if (newsFind.status) {
    throw new Response("El ID ingresado no pertence a ninguna noticia")
  }

  return newsFind.data
}

export default readNewsLoader
