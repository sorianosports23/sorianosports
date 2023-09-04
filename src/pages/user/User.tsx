import { PropsWithChildren } from "react"
import Header from "../../components/templates/Header"
import SocialAside from "../../components/templates/SocialAside"
import Footer from "../../components/templates/Footer"

const User = ({ children }: PropsWithChildren) => {
  return (
    <>
    <Header/>
    <SocialAside/>

    <main className="background-main">
      { children }
    </main>

    <Footer/>
    </>
  )
}

export default User
