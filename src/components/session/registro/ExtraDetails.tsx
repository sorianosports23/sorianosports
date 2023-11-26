import { TInputProps } from "../../../pages/session/types/Register"
import { BsFillPersonVcardFill } from "react-icons/bs"
import Loader from "../../Loader"

type TExtraDetailsProps = {
  ciInput: TInputProps
  ageInput: TInputProps
  loading: boolean
  buttonClick: () => void
  prevButtonClick: () => void
  errorInputs: {
    ci: "false" | "true"
    age: "false" | "true"
  }
  buttonDisabled: boolean
}

const ExtraDetails = ({ ciInput, ageInput, loading, buttonClick, prevButtonClick, errorInputs, buttonDisabled }: TExtraDetailsProps) => {

  const handleFinish = () => {
    if (loading) return
    buttonClick()
  }

  return (
    <form>
      <div>
        <label htmlFor="#">Cédula</label>
        <div>
          <input type="number" maxLength={8} 
            {...ciInput}
            data-invalid={errorInputs.ci}
            
          />
          <div>
            <BsFillPersonVcardFill/>
          </div>
        </div>
      </div>

      <div>
        <label htmlFor="#">Fecha de Nacimiento:</label>
        <div>
          <input type="date"
            {...ageInput}
            data-invalid={errorInputs.age}
          />
        </div>
      </div>

      <div>
        <button type="button" onClick={() => prevButtonClick()} disabled={loading}>
          Anterior
        </button>

        <button type="button" onClick={() => handleFinish()} disabled={false}>
          {
            loading 
              ? <Loader/>
              : "Finalizar"
          }
        </button>
      </div>
    </form>
  )
}

export default ExtraDetails
