import { Layout, Form } from './components'
import { getInputs } from './lib'

interface ExchangeFormType {}

const exchangeForm = getInputs<ExchangeFormType>('exchange')

const App = () => {
	const onSubmitExchangeForm = (data: unknown) => console.log({ exchange: data })

	return (
		<Layout>
			<Form
				{...exchangeForm}
				titleForm='Exchange Form!'
				onSubmit={onSubmitExchangeForm}
				labelButtonSubmit='Exchange'
			/>
			<section>
				<div>
					<p>Current Source Wallet: </p>
					<p>{1000}</p>
				</div>
				<div>
					<p>Current Destination Wallet: </p>
					<p>{2000}</p>
				</div>
			</section>
		</Layout>
	)
}
export default App
