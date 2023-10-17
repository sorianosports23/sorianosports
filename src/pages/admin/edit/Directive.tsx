import { Link } from "react-router-dom"
import Admin from "../Admin"
import { BsPlusLg, BsXLg } from "react-icons/bs"

const Directive = () => {
  return (
    <Admin route_title="/institucion/directiva">
      <div>
        <Link to="/admin/add/directive"><BsPlusLg/> Agregar</Link>
      </div>
    </Admin>
  )
}

export default Directive
