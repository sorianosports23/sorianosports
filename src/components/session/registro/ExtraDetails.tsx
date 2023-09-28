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
        <label htmlFor="#">Cedula</label>
        <div>
          <input type="number" maxLength={8} 
            {...ciInput}
            data-error={errorInputs.ci}
          />
          <div>
            <BsFillPersonVcardFill/>
          </div>
        </div>
      </div>

      <div>
        <label htmlFor="#">Edad:</label>
        <div>
          <input type="number" min={5} max={100}
            {...ageInput}
            data-error={errorInputs.age}
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
