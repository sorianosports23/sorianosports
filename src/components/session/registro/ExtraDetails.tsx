import { TInputProps } from "../../../pages/session/types/Register"
import { BsFillPersonVcardFill } from "react-icons/bs"
import Loader from "../../Loader"

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

const ExtraDetails = ({ ciInput, loading, buttonClick, prevButtonClick, errorInputs, buttonDisabled }: TExtraDetailsProps) => {
  
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
              ? <Loader/>
              : "Finalizar"
          }
        </button>
      </div>
    </form>
  )
}

export default ExtraDetails
