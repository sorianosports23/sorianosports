import { TInputProps } from "../../../pages/session/types/PageRegister"
import { BsEnvelopeAtFill, BsTelephoneFill } from "react-icons/bs"

type TUserContactProps = {
  emailInput: TInputProps
  phoneInput: TInputProps
  buttonClick: () => void
  buttonPrevClick: () => void
}

const CompUserContact = ({ emailInput, phoneInput, buttonClick, buttonPrevClick }: TUserContactProps) => {
  return (
    <form>
      <div>
        <label htmlFor="#">Correo</label>
        <div>
          <input type="email" 
            {...emailInput}
          />
          <div>
            <BsEnvelopeAtFill/>
          </div>
        </div>
      </div>

      <div>
        <label htmlFor="#">Telefóno</label>
        <div>
          <input type="tel"
            {...phoneInput}
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

export default CompUserContact
