import { BsEyeFill, BsEyeSlashFill, BsFillPersonFill, BsKeyFill } from "react-icons/bs"
import { TInputProps } from "../../../pages/session/types/Register"
import { useState } from "react"

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
  
  const [showPwd, setShowPwd] = useState(false)

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

      <div data-icon="true">
        <label htmlFor="#">Contraseña</label>
        <div>
          <input 
            type={showPwd ? "text" : "password"} 
            {...passwordInput}
            // data-error={errorInputs.password}
          />
          <button 
            data-btn="true"
            type="button"
            onClick={() => setShowPwd(prev => !prev)}
          >
            {
              showPwd
              ? <BsEyeFill/>
              : <BsEyeSlashFill/>
            }
          </button>
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
