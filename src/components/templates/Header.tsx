import { Link } from "react-router-dom"
import { BsSearch, BsFillChatSquareDotsFill, BsFillPersonFill, BsChevronDown, BsFillHouseFill, BsCalendarDateFill, BsList, BsPersonFillUp } from "react-icons/bs"
import styles from "../../css/header/Header.module.css"
import { ChangeEvent, MutableRefObject, useRef, useState, useContext } from "react"
import SearchBar from "../header/SearchBar"
import assetsFolder from "../../utils/publicfolder"
import HeaderMobile from "./HeaderMenuMobile"
import { userSessionContext } from "../../context/session/UserSessionContext"

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

const Header = () => {
  const search = useSearch()

  const [menuMobileOpen, setMenuMobileOpen] = useState(false)

  const { username, logout } = useContext(userSessionContext)

  const [activitiesDropdown, setActivitiesDropDown] = useState(false)
  const [aboutDropdown, setAboutDropDown] = useState(false)
  const [searchBarHover, setSearchBarHover] = useState(false)
  const [searchBarTabletHover, setSearchBarTabletHover] = useState(false)
  
  const activitiesDropdownUL = useRef<HTMLUListElement>(null) as MutableRefObject<HTMLUListElement>

  const handleLogout = () => {
    logout()
    // eslint-disable-next-line no-self-assign
    window.location.href = window.location.href
  }
  
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

            <SearchBar search={search.value} searchHover={searchBarHover}/>

          </div>
        </div>

        <div className={styles["user-info"]}>
          {/* eslint-disable-next-line sonarjs/no-duplicate-string */ }
          <Link to="/faq" className={`${styles.link} ${styles["link-header"]}`}>
            <BsFillChatSquareDotsFill/>
            Ayuda
          </Link>


          {
            username 
              ? (
                <div className={styles.user}>
                  <button><p>{username}</p> <BsChevronDown/></button>

                  <ul>
                    <li><Link to="/auth/perfil">Perfil</Link></li>
                    <li>
                      <button
                        onClick={handleLogout}
                      >Cerrar sesión</button>
                    </li>
                  </ul>
                </div>
              )
              : (
                <>
                <Link to="/auth/registro" className={`${styles.link} ${styles["link-header"]}`}>
                  <BsFillPersonFill/>
                  Registrarse
                </Link>

                <Link to="/auth/login" className={`${styles.link} ${styles["link-header"]}`}>
                  <BsPersonFillUp/>
                  Iniciar sesión
                </Link>
                </>
              )
          }

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

          <SearchBar search={search.value} searchHover={searchBarTabletHover}/>

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
                <Link to="/acerca/misionvision" tabIndex={aboutDropdown ? 0 : -1}>
                  Misión y Visión
                </Link>
              </li>
            </ul>
          </button>
        </nav>
      </div>

      <HeaderMobile 
        open={menuMobileOpen}
        closeMenu={() => setMenuMobileOpen(false)}
      />
    </header>
  )
}

export default Header
