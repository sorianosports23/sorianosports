import { BsArrowLeft, BsArrowRight } from "react-icons/bs"

type TPaginationProps = {
	totalPages: number
	actualPage: number
	prevBtn: () => void
	nextBtn: () => void
	changePage: (page: number) => void
}

const Pagination = ({ totalPages, actualPage, prevBtn, nextBtn, changePage }: TPaginationProps) => {
  return (
		<div>
			<button onClick={prevBtn}>
				<BsArrowLeft/>
			</button>

			<input 
				type="number" 
				value={actualPage}
				onChange={(ev) => changePage(ev.target.valueAsNumber)}
				min={1}
				max={totalPages}
			/>

			<span>/</span>

			<input 
				type="number" 
				readOnly
				value={totalPages}
			/>

			<button
				onClick={nextBtn}
			>
				<BsArrowRight/>
			</button>
		</div>
  )
}

export default Pagination
