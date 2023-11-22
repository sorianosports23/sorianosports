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
import { SearchContextProvider } from "./context/search/SearchContext"
import '@wojtekmaj/react-timerange-picker/dist/TimeRangePicker.css'
import 'react-clock/dist/Clock.css'

const App = () => {
  useEffect(() => {
    document.body.style.backgroundImage = `url(${assetsFolder}/img/background.jpg)`

    return () => {
      document.body.style.backgroundImage = ""
    }
  }, [])

  return (
    <SocialMediaProvider>
      <SearchContextProvider>
        <UserSessionProvider>
          <Fonts/>

          <RouterProvider router={pageRoutes} fallbackElement={<PageLoading/>}/>
        </UserSessionProvider>
      </SearchContextProvider>
    </SocialMediaProvider>
  )
}


export default App;
