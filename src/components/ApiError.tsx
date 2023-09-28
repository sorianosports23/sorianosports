import { FaRegFaceFrown } from "react-icons/fa6"

const ApiError = () => {
  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        gap: ".5rem",
        justifyContent: "center",
        alignItems: "center",
        fontFamily: "Raleway, sans-serif",
        fontSize: "1.5em"
      }}
    >
      <FaRegFaceFrown style={{fontSize: "3em"}}/>
      <p>Ocurrio un error...</p>
    </div>
  )
}

export default ApiError
