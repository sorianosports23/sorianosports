import { BsFillPersonFill, BsKeyFill } from "react-icons/bs"
import { TInputProps } from "../../../pages/session/types/PageRegister"

type TAccountDetailsProps = {
  userInput: TInputProps
  passwordInput: TInputProps
  buttonClick: () => void
}

const CompAccountDetails = ({ userInput, passwordInput, buttonClick }: TAccountDetailsProps) => { 
  return (
    <form>
      <div>
        <label htmlFor="#">Usuario</label>
        <div>
          <input type="text" 
            {...userInput}
          />
          <div>
            <BsFillPersonFill/>
          </div>
        </div>
      </div>

      <div>
        <label htmlFor="#">Contraseña</label>
        <div>
          <input type="password" 
            {...passwordInput}
          />
          <div>
            <BsKeyFill/>
          </div>
        </div>
      </div>

      <div>
        <button type="button" onClick={() => buttonClick()}>
          Siguiente
        </button>
      </div>
    </form>
  )
}

export default CompAccountDetails
