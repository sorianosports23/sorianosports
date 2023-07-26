import { Link } from "react-router-dom"
import { BsSearch, BsFillChatSquareDotsFill, BsFillPersonFill, BsChevronDown } from "react-icons/bs"
import { FaRegFaceFrown } from "react-icons/fa6"
import styles from "../../css/header/CompHeader.module.css"
import styleBar from "../../css/header/SearchBar.module.css"
import { ChangeEvent, useEffect, useState } from "react"

const stylesName = {
  link_header2: `${styles.link} ${styles["link-header2"]}`
}

const useSearch = () => {
  
  const [value, setValue] = useState("")

  const onChange = (ev: ChangeEvent<HTMLInputElement>) => {
    setValue(ev.target.value)
  }

  return {
    value,
    onChange,
    placeholder: "¿Qué estas buscando?"
  }
}

const docs = [
  { title: "Inicio", keywords: ["index", "inicio"], to: "/" },
  { title: "Mision", keywords: ["mision"], to: "/about/mission" },
  { title: "Deportes", keywords: ["deportes", "futbol", "basquetbol"], to: "/sports" },
  { title: "Eventos", keywords: ["eventos"], to: "/events" },
  { title: "Registrarse", keywords: ["cuenta", "registrarse"], to: "/auth/register" },
  { title: "Iniciar sesion", keywords: ["cuenta", "iniciar sesion"], to: "/auth/login" }
]

const CompHeader = () => {

  const search = useSearch()

  const [activitiesDropdown, setActivitiesDropDown] = useState(false)
  const [aboutDropdown, setAboutDropDown] = useState(false)

  const [showResults, setShowResults] = useState(false)
  const [searchResults, setSearchResults] = useState<typeof docs>([])

  useEffect(() => {

    if (!search.value) {
      setShowResults(false)
      return
    }

    setShowResults(true)

    const results = [] as typeof docs
    docs.map(value => {
      const keys = value.keywords.filter(key => key.includes(search.value.toLowerCase()))
      if (keys.length > 0) results.push(value)

      return null
    })
    setSearchResults(results)
  }, [search.value])

  return (
    <header className={styles.header}>
      <div className={styles["header-top"]}>
        <div className={styles.logo}>
          <img src={process.env.PUBLIC_URL + "/assets/img/deportesyrecreacions.png"} alt="page-logo" />
        </div>

        <div className={styles["search-bar"]}>
          <div>
            <input {...search} />
            <button className={styles["search-bar__icon"]}>
              <BsSearch/>
            </button>

            <div className={styleBar.results}
              style={{
                display: showResults ? "initial" : "none"
              }}
            >
              {
                searchResults.length > 0 
                  ?                
                    searchResults.map((result, i) => (
                      <div key={i} className={styleBar.result}>{result.title}</div>
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
          </div>
        </div>

        <div className={styles["user-info"]}>
          <Link to="/" className={`${styles.link} ${styles["link-header"]}`}>
            <BsFillChatSquareDotsFill/>
            Ayuda
          </Link>

          <Link to="/" className={`${styles.link} ${styles["link-header"]}`}>
            <BsFillPersonFill/>
            Registrarse
          </Link>
        </div>
      </div>

      <div className={styles["header-bottom"]}>
        <nav className={styles["header-nav"]}>
          <Link to="/" className={stylesName.link_header2}>
            Inicio
          </Link>
          <button
            onClick={() => setActivitiesDropDown(prev => !prev)}
          >
            <p className={stylesName.link_header2}>
              <BsChevronDown style={{
                rotate: activitiesDropdown ? "-180deg" : "0deg"
              }}/> 
              Actividades
            </p>

            <ul className={styles["activities-list"]}
              style={{
                opacity: activitiesDropdown ? "1" : "0",
                transform: `translateY(${activitiesDropdown ? "5.2rem" : "0"})`
              }}            >
              <li>
                <Link to="/" tabIndex={activitiesDropdown ? 0 : -1}>
                  Deportes
                </Link>
              </li>
              <li>
                <Link to="/" tabIndex={activitiesDropdown ? 0 : -1}>
                  Escuelas
                </Link>
              </li>
            </ul>
          </button>
          <Link to="/" className={stylesName.link_header2}>
            Eventos
          </Link>
          <Link to="/" className={stylesName.link_header2}>
            Blog
          </Link>
          <button
            onClick={() => setAboutDropDown(prev => !prev)}
          >
            <p className={stylesName.link_header2}>
              <BsChevronDown style={{
                rotate: aboutDropdown ? "-180deg" : "0deg"
              }}/> 
              Institución
            </p>

            <ul className={styles["activities-list"]}
              style={{
                opacity: aboutDropdown ? "1" : "0",
                transform: `translateY(${aboutDropdown ? "10.2rem" : "0"})`
              }}
            >
              <li>
                <Link to="/" tabIndex={aboutDropdown ? 0 : -1}>
                  Nosotros
                </Link>
              </li>
              <li>
                <Link to="/" tabIndex={aboutDropdown ? 0 : -1}>
                  Contactos
                </Link>
              </li>
              <li>
                <Link to="/" tabIndex={aboutDropdown ? 0 : -1}>
                  Visión
                </Link>
              </li>
              <li>
                <Link to="/" tabIndex={aboutDropdown ? 0 : -1}>
                  Misión
                </Link>
              </li>
            </ul>
          </button>
        </nav>
      </div>
    </header>
  )
}

export default CompHeader
