import { PropsWithChildren, useEffect } from "react"
import Header from "../../components/templates/Header"
import Footer from "../../components/templates/Footer"

type TUserCompProps = {
  children: PropsWithChildren["children"]
  pageTitle?: string
}

const User = ({ pageTitle, children }: TUserCompProps) => {

  useEffect(() => {
    if (pageTitle) {
      document.title = pageTitle
    } else {
      document.title = "Deportes y Recreacion"
    }
  }, [pageTitle])

  return (
    <>
    <Header/>

    <main className="background-main">
      { children }
    </main>

    <Footer/>
    </>
  )
}

export default User
