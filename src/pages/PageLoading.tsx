import assetsFolder from "../utils/publicfolder"

const PageLoading = () => {
  return (
    <div style={{
      height: "100%",
      width: "100%",
      display: "grid",
      placeContent: "center",
      backgroundColor: "#fbfbfb"
    }}
      className="loading-page"
    >
      <img src={assetsFolder + "/../logo.gif"} alt="logo-loading" 
        style={{
          width: "150px",
          height: "200px"
        }}
      />
    </div>
  )
}

export default PageLoading
