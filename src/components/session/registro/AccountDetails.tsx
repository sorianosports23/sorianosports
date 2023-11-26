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
  errorMsg?: string
}

const AccountDetails = ({ userInput, passwordInput, buttonClick, errorInputs, errorMsg }: TAccountDetailsProps) => {
  
  const [showPwd, setShowPwd] = useState(false)

  return (
    <form>
      <div>
        <label htmlFor="#">Usuario</label>
        <div>
          <input type="text" 
            {...userInput}
            data-invalid={errorInputs.username}
          />
          <div>
            <BsFillPersonFill/>
          </div>
        </div>
        {
          (errorInputs.username === "true" && errorMsg)
          && <span>{errorMsg}</span>
        }
      </div>

      <div data-icon="true">
        <label htmlFor="#">Contraseña</label>
        <div>
          <input 
            type={showPwd ? "text" : "password"} 
            {...passwordInput}
            data-invalid={errorInputs.password}
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
        {
          (errorInputs.password === "true" && errorMsg)
          && <span>{errorMsg}</span>
        }
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
