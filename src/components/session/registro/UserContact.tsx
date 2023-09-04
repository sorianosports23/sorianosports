import { TInputProps } from "../../../pages/session/types/Register"
import { BsEnvelopeAtFill, BsTelephoneFill } from "react-icons/bs"

type TUserContactProps = {
  emailInput: TInputProps
  phoneInput: TInputProps
  buttonClick: () => void
  buttonPrevClick: () => void
  errorInputs: {
    email: boolean
    phone: boolean
  }
}

const UserContact = ({ emailInput, phoneInput, buttonClick, buttonPrevClick, errorInputs }: TUserContactProps) => {
  return (
    <form>
      <div>
        <label htmlFor="#">Correo</label>
        <div>
          <input type="email" 
            {...emailInput}
            data-error={errorInputs.email}
          />
          <div>
            <BsEnvelopeAtFill/>
          </div>
        </div>
      </div>

      <div>
        <label htmlFor="#">Telefóno</label>
        <div>
          <input type="number"
            maxLength={9}
            {...phoneInput}
            data-error={errorInputs.phone}
          />
          <div>
            <BsTelephoneFill/>
          </div>
        </div>
      </div>

      <div>
        <button type="button" onClick={() => buttonPrevClick()}>Anterior</button>
        <button type="button" onClick={() => buttonClick()}>Siguiente</button>
      </div>
    </form>
  )
}

export default UserContact
