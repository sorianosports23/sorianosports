import { useEffect, useState } from "react"
import { FaRegFaceFrown } from "react-icons/fa6"
import styleBar from "../../css/header/SearchBar.module.css"
import { Link } from "react-router-dom"

const docs = [
  { title: "Inicio", keywords: ["index", "inicio"], to: "/", description: "Vuelve a la pagina inicial" },
  { title: "Mision", keywords: ["mision"], to: "/about/mission", description: "Informate sobre nuestra mision" },
  { title: "Deportes", keywords: ["deportes", "futbol", "basquetbol"], to: "/sports", description: "Acerca de los deportes que manejamos" },
  { title: "Eventos", keywords: ["eventos"], to: "/events", description: "Calendario de eventos proximos y pasados" },
  { title: "Registrarse", keywords: ["cuenta", "registrarse"], to: "/auth/register", description: "Registrate en la pagina" },
  { title: "Iniciar sesion", keywords: ["cuenta", "iniciar sesion"], to: "/auth/login", description: "Inicia sesion con tu cuenta" }
]

type TSearchBarProps = {
  search: string
  searchHover: boolean
}

const SearchBar = ({ search, searchHover }: TSearchBarProps) => {

  const [showResults, setShowResults] = useState(false)
  const [searchResults, setSearchResults] = useState<typeof docs>([])

  useEffect(() => {

    if (!search) {
      setShowResults(false)
      return
    }

    setShowResults(true)

    const results = [] as typeof docs
    docs.map(value => {
      const keys = value.keywords.filter(key => key.includes(search.toLowerCase()))
      if (keys.length > 0) results.push(value)

      return null
    })
    setSearchResults(results)
  }, [search])
  
  useEffect(() => {
    if (search) {
      setShowResults(searchHover)
    }
  }, [search, searchHover])

  return (
    <div className={styleBar.results}
    style={{
      display: showResults ? "initial" : "none"
    }}
    >
      {
        searchResults.length > 0 
          ?                
            searchResults.map((result, i) => (
              <Link key={i} to={result.to} className={styleBar.result}>
                <h3>{result.title}</h3>
                <p>{result.description}</p>
              </Link>
            ))
          : 
            <div className={styleBar.noresult}>
              <div>
                <FaRegFaceFrown/>
              </div>
              No se encontraron resultados
            </div>
      }
    </div>
  )
}

export default SearchBar