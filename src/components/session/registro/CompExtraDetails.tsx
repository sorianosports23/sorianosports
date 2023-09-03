import { TInputProps } from "../../../pages/session/types/PageRegister"
import { BsFillPersonVcardFill } from "react-icons/bs"
import CompLoader from "../../CompLoader"

type TExtraDetailsProps = {
  ciInput: TInputProps
  loading: boolean
  buttonClick: () => void
  prevButtonClick: () => void
  errorInputs: {
    ci: boolean
  }
  buttonDisabled: boolean
}

const CompExtraDetails = ({ ciInput, loading, buttonClick, prevButtonClick, errorInputs, buttonDisabled }: TExtraDetailsProps) => {
  
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
        <button type="button" onClick={() => prevButtonClick()} disabled={loading}>
          Anterior
        </button>

        <button type="button" onClick={() => handleFinish()} disabled={buttonDisabled}>
          {
            loading 
              ? <CompLoader/>
              : "Finalizar"
          }
        </button>
      </div>
    </form>
  )
}

export default CompExtraDetails
