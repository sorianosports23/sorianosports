import { TInputProps } from "../../../pages/session/types/Register"
import { BsEnvelopeAtFill, BsTelephoneFill, BsFillPersonFill } from "react-icons/bs"

type TUserContactProps = {
  emailInput: TInputProps
  phoneInput: TInputProps
  fullnameInput: TInputProps
  buttonClick: () => void
  buttonPrevClick: () => void
  errorInputs: {
    email: "false" | "true"
    phone: "false" | "true"
  }
}

const UserContact = ({ emailInput, phoneInput, fullnameInput, buttonClick, buttonPrevClick, errorInputs }: TUserContactProps) => {
  return (
    <form>
      <div>
        <label htmlFor="#">Correo</label>
        <div>
          <input type="email" 
            {...emailInput}
            data-invalid={errorInputs.email}
          />
          <div>
            <BsEnvelopeAtFill/>
          </div>
        </div>
      </div>

      <div>
        <label htmlFor="#">Nombre completo</label>
        <div>
          <input type="text" {...fullnameInput}/>

          <div>
            <BsFillPersonFill/>
          </div>
        </div>
      </div>

      <div>
        <label htmlFor="#">Telefóno</label>
        <div>
          <input type="number"
            maxLength={9}
            {...phoneInput}
            data-invalid={errorInputs.phone}
          />
          <div>
            <BsTelephoneFill/>
          </div>
        </div>
      </div>

      <div data-btns="true">
        <button type="button" onClick={() => buttonPrevClick()}>Anterior</button>
        <button type="button" onClick={() => buttonClick()}>Siguiente</button>
      </div>
    </form>
  )
}

export default UserContact
