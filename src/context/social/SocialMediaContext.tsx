import { PropsWithChildren, createContext, useEffect, useState } from "react"
import apiGetSocialMedia from "../../api/admin/media/getSocialMedia"

const DEFAULT_VALUE: TSocialContext = {
  Facebook: "", Twitter: "", Instagram: "", Youtube: "", Direccion: "", Telefono: "", Horario: "", Correo: ""
}

const socialMediaContext = createContext<TSocialMediaContext>({
  socialMedia: DEFAULT_VALUE
})


const SocialMediaProvider = ({children}: PropsWithChildren) => {
  
  const [social, setSocial] = useState<TSocialMediaContext["socialMedia"]>(DEFAULT_VALUE)

  useEffect(() => {
    (async () => {
      const data = await apiGetSocialMedia()
      if (data.status) {
        data.data.map((social) => {
          setSocial(prev => ({
            ...prev,
            [social.name as keyof TSocialContext]: social.link
          }))
          return null
        })
      }
    })()
  }, [])
  
  return (
    <socialMediaContext.Provider
      value={{
        socialMedia: social
      }}
    >
      {children}
    </socialMediaContext.Provider>
  )
}

export { SocialMediaProvider, socialMediaContext }