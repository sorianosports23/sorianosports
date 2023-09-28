import assetsFolder from "../utils/publicfolder"

const LoaderComp = () => {
  return (
    <div style={{
      width: "100%",
      height: "100%",
      display: "grid",
      placeContent: "center"
    }}>
      <img src={assetsFolder + "/../logo.gif"} alt="loader" 
        style={{
          width: "150px",
          height: "200px"
        }}
      />
    </div>
  )
}

export default LoaderComp
