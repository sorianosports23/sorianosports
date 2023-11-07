import { BsCheckLg, BsClockFill, BsEnvelopeAtFill, BsFacebook, BsHouseFill, BsInstagram, BsPhoneFill, BsYoutube } from "react-icons/bs"
import Admin from "../Admin"
import { FaXTwitter } from "react-icons/fa6"
import styles from "../../../css/admin/page/Social.module.css"
import { FormEvent, useContext, useEffect, useState } from "react"
import Loading from "../../Loading"
import apiGetSocialMedia from "../../../api/admin/media/getSocialMedia"
import { userSessionContext } from "../../../context/session/UserSessionContext"
import apiAdminModifySocialMedia from "../../../api/admin/media/modifySocialMedia"
import SendModal from "../../../components/modal/SendModal"

type TSocialMediaProps = {
  icon: JSX.Element
  social: string
  value: string
  handleSubmit: (social: string, value: string) => void
}

const socialMediaList = {
  Facebook: { name: "Facebook", icon: <BsFacebook/> },
  Twitter: { name: "X (Twitter)", icon: <FaXTwitter/> },
  Instagram: { name: "Instagram", icon: <BsInstagram/> },
  Youtube: { name: "Youtube", icon: <BsYoutube/> },
  Direccion: { name: "Direccion", icon: <BsHouseFill/> },
  Correo: { name: "Correo", icon: <BsEnvelopeAtFill/> },
  Telefono: { name: "Telefono", icon: <BsPhoneFill/> },
  Horario: { name: "Horario", icon: <BsClockFill/> }
}

const SocialMedia = ({ icon, social, value, handleSubmit }: TSocialMediaProps) => {
  
  const [socialValue, setSocialValue] = useState(value)

  useEffect(() => {
    setSocialValue(value)
  }, [value])

  const handleSubmitForm = (ev: FormEvent) => {
    ev.preventDefault()
    handleSubmit(social, socialValue)
  }
  
  return (
    <div className={styles.social}>
      <div className={styles.icon}>
        { icon }
        { social }
      </div>

      <form className={styles.input} onSubmit={handleSubmitForm}>
        <input 
          type="text"
          value={socialValue}
          onChange={(ev) => setSocialValue(ev.target.value)}
        />

        <button type="submit"><BsCheckLg/></button>
      </form>
    </div>
  )
}

const Social = () => {

  const {token} = useContext(userSessionContext)

  const [socialMediaFromApi, setSocialMediaFromApi] = useState<TSocial[]>([])
  const [loading, setLoading] = useState(true)

  
  const handleGetSocialFromApi = async () => {
    setLoading(true)
    const data = await apiGetSocialMedia()
    if (data.status) {
      setSocialMediaFromApi(data.data)
    }

    setLoading(false)
  }

  useEffect(() => {
    handleGetSocialFromApi()
  }, [])

  //!MODAL
  const [sendModal, setSendModal] = useState(false)
  const [sendModalMsg, setSendModalMsg] = useState("")
  const [sendModalOtMsg, setSendModalOtMsg] = useState("")
  //!

  const handleSubmitSocial = async (name: string, value: string) => {
    const data = {
      token,
      name,
      newLink: value
    }

    const res = await apiAdminModifySocialMedia(data)

    if (res.status) {
      setSendModalMsg("Se edito correctamente")
      setSendModalOtMsg("")
    } else {
      setSendModalMsg("No se pudo editar")
      setSendModalOtMsg(res.message)
    }

    setSendModal(true)
  }

  if (loading) {
    return <Loading/>
  }

  return (
    <Admin route_title="Editar redes sociales">
      <div className={styles.cont}>
        {
          socialMediaFromApi.map((social, i) => (
            <SocialMedia
              social={socialMediaList[social.name as keyof typeof socialMediaList].name}
              icon={socialMediaList[social.name as keyof typeof socialMediaList].icon}
              value={social.link}
              handleSubmit={handleSubmitSocial}
              key={i}
            />
          ))
        }
      </div>

      <SendModal
        open={sendModal}
        close={() => setSendModal(false)}
        message={sendModalMsg}
        otherMessage={sendModalOtMsg}
      />
    </Admin>
  )
}

export default Social
