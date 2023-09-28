import { BsFillPersonFill, BsKeyFill } from "react-icons/bs"
import { TInputProps } from "../../../pages/session/types/Register"

type TAccountDetailsProps = {
  userInput: TInputProps
  passwordInput: TInputProps
  buttonClick: () => void
  errorInputs: {
    username: "false" | "true"
    password: "false" | "true"
  }
}

const AccountDetails = ({ userInput, passwordInput, buttonClick, errorInputs }: TAccountDetailsProps) => { 
  return (
    <form>
      <div>
        <label htmlFor="#">Usuario</label>
        <div>
          <input type="text" 
            {...userInput}
            // data-error={errorInputs.username}
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
            // data-error={errorInputs.password}
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

export default AccountDetails
