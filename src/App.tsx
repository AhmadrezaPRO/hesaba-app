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
				labelButtonSubmit='Send info'
			/>
		</Layout>
	)
}
export default App
