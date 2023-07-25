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
  { text: "Inicio" },
  { text: "Mision" },
  { text: "Deportes" },
  { text: "Eventos" },
  { text: "Registrarse" },
  { text: "Iniciar sesion" }
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
    setSearchResults(docs.filter(value => value.text.toLowerCase().includes(search.value.toLowerCase())))
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
                      <div key={i} className={styleBar.result}>{result.text}</div>
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
          <div
            onMouseEnter={() => setActivitiesDropDown(true)}
            onMouseLeave={() => setActivitiesDropDown(false)}
          >
            <p className={stylesName.link_header2}>
              <BsChevronDown/> 
              Actividades
            </p>

            <ul className={styles["activities-list"]}
              style={{
                opacity: activitiesDropdown ? "1" : "0",
                transform: `translateY(${activitiesDropdown ? "5.2rem" : "0"})`
              }}
            >
              <li>
                <Link to="/">
                  Deportes
                </Link>
              </li>
              <li>
                <Link to="/">
                  Escuelas
                </Link>
              </li>
            </ul>
          </div>
          <Link to="/" className={stylesName.link_header2}>
            Eventos
          </Link>
          <Link to="/" className={stylesName.link_header2}>
            Blog
          </Link>
          <div
            onMouseEnter={() => setAboutDropDown(true)}
            onMouseLeave={() => setAboutDropDown(false)}
          >
            <p className={stylesName.link_header2}>
              <BsChevronDown/> 
              Institución
            </p>

            <ul className={styles["activities-list"]}
              style={{
                opacity: aboutDropdown ? "1" : "0",
                transform: `translateY(${aboutDropdown ? "10.2rem" : "0"})`
              }}
            >
              <li>
                <Link to="/">
                  Nosotros
                </Link>
              </li>
              <li>
                <Link to="/">
                  Contactos
                </Link>
              </li>
              <li>
                <Link to="/">
                  Visión
                </Link>
              </li>
              <li>
                <Link to="/">
                  Misión
                </Link>
              </li>
            </ul>
          </div>
        </nav>
      </div>
    </header>
  )
}

export default CompHeader
