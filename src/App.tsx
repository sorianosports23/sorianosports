import { RouterProvider } from "react-router-dom";
import "./css/global.css"
import "./css/colors.css"
import PageLoading from "./pages/Loading";
import { useEffect } from "react";
import assetsFolder from "./utils/publicfolder";
import { UserSessionProvider } from "./context/session/UserSessionContext";
import pageRoutes from "./utils/AppRoutes";
import Fonts from "./components/Fonts";
import { SocialMediaProvider } from "./context/social/SocialMediaContext"


const App = () => {
  useEffect(() => {
    document.body.style.backgroundImage = `url(${assetsFolder}/img/background.jpg)`

    return () => {
      document.body.style.backgroundImage = ""
    }
  }, [])

  return (
    <SocialMediaProvider>
      <UserSessionProvider>
        <Fonts/>

        <RouterProvider router={pageRoutes} fallbackElement={<PageLoading/>}/>
      </UserSessionProvider>
    </SocialMediaProvider>
  )
}


export default App;
