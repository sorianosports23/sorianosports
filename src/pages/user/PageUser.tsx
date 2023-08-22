import { PropsWithChildren } from "react"
import CompHeader from "../../components/templates/CompHeader"
import CompSocialAside from "../../components/templates/CompSocialAside"
import CompFooter from "../../components/templates/CompFooter"

const PageUser = ({ children }: PropsWithChildren) => {
  return (
    <>
    <CompHeader/>
    <CompSocialAside/>

    <main className="background-main">
      { children }
    </main>

    <CompFooter/>
    </>
  )
}

export default PageUser
