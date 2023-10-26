import {Layout, Form} from './components'
import {getInputs} from './lib'
import {useDispatch} from "react-redux";

interface ExchangeFormType {
}

const exchangeForm = getInputs<ExchangeFormType>('exchange')


const App = () => {
    const dispatch = useDispatch()
    const onSubmitExchangeForm = (data: unknown) => console.log({exchange: data})
    return (
        <Layout>
            <Form
                {...exchangeForm}
                titleForm='Exchange Form!'
                onSubmit={onSubmitExchangeForm}
                labelButtonSubmit='Exchange'
            />
        </Layout>
    )
}
export default App
