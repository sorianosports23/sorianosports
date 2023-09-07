import { RouterProvider } from "react-router-dom";
import "./css/global.css"
import "./css/colors.css"
import PageLoading from "./pages/Loading";
import { useEffect } from "react";
import assetsFolder from "./utils/publicfolder";
import { UserSessionProvider } from "./context/session/UserSessionContext";
import pageRoutes from "./utils/AppRoutes";
import Fonts from "./components/Fonts";


const App = () => {
  useEffect(() => {
    document.body.style.backgroundImage = `url(${assetsFolder}/img/background.jpg)`

    return () => {
      document.body.style.backgroundImage = ""
    }
  }, [])

  return (
    <UserSessionProvider>

      <Fonts/>

      <RouterProvider router={pageRoutes} fallbackElement={<PageLoading/>}/>
    </UserSessionProvider>
  )
}


export default App;
