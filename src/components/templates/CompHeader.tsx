import { Link } from "react-router-dom"
import { BsSearch, BsFillChatSquareDotsFill, BsFillPersonFill, BsChevronDown, BsFillHouseFill, BsCalendarDateFill, BsList } from "react-icons/bs"
import styles from "../../css/header/CompHeader.module.css"
import { ChangeEvent, MutableRefObject, useRef, useState } from "react"
import CompSearchBar from "../header/CompSearchBar"
import assetsFolder from "../../utils/publicfolder"
import CompHeaderMobile from "./CompHeaderMobile"

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

const CompHeader = () => {

  const search = useSearch()

  const [menuMobileOpen, setMenuMobileOpen] = useState(false)

  
  const [activitiesDropdown, setActivitiesDropDown] = useState(false)
  const [aboutDropdown, setAboutDropDown] = useState(false)
  const [searchBarHover, setSearchBarHover] = useState(false)
  const [searchBarTabletHover, setSearchBarTabletHover] = useState(false)
  
  const activitiesDropdownUL = useRef<HTMLUListElement>(null) as MutableRefObject<HTMLUListElement>
  
  return (
    <header className={styles.header}>
      <div className={styles["header-top"]}>
        <div className={styles.logo}>
          <img src={assetsFolder + "/img/deportesyrecreaciones.png"} alt="page-logo" />
        </div>

        <div 
          className={styles["search-bar"]} 
          onPointerEnter={() => setSearchBarHover(true)} 
          onPointerLeave={() => setSearchBarHover(false)}
        >
          <div>
            <input {...search} />
            <button className={styles["search-bar__icon"]}>
              <BsSearch/>
            </button>

            <CompSearchBar search={search.value} searchHover={searchBarHover}/>

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

          <button className={styles.menu_mobile}
            onClick={() => setMenuMobileOpen(true)}
          >
            <BsList/>
          </button>
        </div>
      </div>

      <div className={styles.header_searchbar_tablet}>
        <div
          onPointerEnter={() => setSearchBarTabletHover(true)} 
          onPointerLeave={() => setSearchBarTabletHover(false)}
        >
          <input {...search} />
          <button className={styles["search-bar__icon"]}>
            <BsSearch/>
          </button>

          <CompSearchBar search={search.value} searchHover={searchBarTabletHover}/>

        </div>
      </div>

      <div className={styles["header-bottom"]}>
        <nav className={styles["header-nav"]}>
          <Link to="/" className={stylesName.link_header2}>
            <BsFillHouseFill/>
            Inicio
          </Link>
          <button
            onClick={() => setActivitiesDropDown(prev => !prev)}
          >
            <p className={stylesName.link_header2}>
              <BsChevronDown style={{
                // rotate: activitiesDropdown ? "-180deg" : "0deg"
              }}/> 
              Actividades
            </p>

            <ul className={styles["activities-list"]}
              // style={{
              //   opacity: activitiesDropdown ? "1" : "0",
              //   transform: `translateY(${activitesDropdownTransformValue})`
              // }}
              ref={activitiesDropdownUL}
            >
              <li>
                <Link to="/actividades/ciudades" tabIndex={activitiesDropdown ? 0 : -1}>
                  Ciudades
                </Link>
              </li>
              <li>
                <Link to="/actividades/deportes" tabIndex={activitiesDropdown ? 0 : -1}>
                  Deportes
                </Link>
              </li>
              <li>
                <Link to="/actividades/escuelas" tabIndex={activitiesDropdown ? 0 : -1}>
                  Escuelas
                </Link>
              </li>
            </ul>
          </button>
          <Link to="/eventos" className={stylesName.link_header2}>
            <BsCalendarDateFill/>
            Eventos
          </Link>
          <button
            onClick={() => setAboutDropDown(prev => !prev)}
          >
            <p className={stylesName.link_header2}>
              <BsChevronDown style={{
                // rotate: aboutDropdown ? "-180deg" : "0deg"
              }}/> 
              Institución
            </p>

            <ul className={styles["activities-list"]}
              // style={{
              //   opacity: aboutDropdown ? "1" : "0",
              //   transform: `translateY(${aboutDropdown ? "10.2rem" : "0"})`
              // }}
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

      <CompHeaderMobile 
        open={menuMobileOpen}
        closeMenu={() => setMenuMobileOpen(false)}
      />
    </header>
  )
}

export default CompHeader
