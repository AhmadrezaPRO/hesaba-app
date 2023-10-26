import {Layout, Form} from './components'
import {getInputs} from './lib'
import {useDispatch} from "react-redux";
import {addBalance, reduceBalance} from "./store/walletSlice";

interface ExchangeFormType {
}

const exchangeForm = getInputs<ExchangeFormType>('exchange')


const App = () => {
    const dispatch = useDispatch()
    const onSubmitExchangeForm = (formData: unknown) => {
        dispatch(addBalance({ currency: formData?.dest, amount: formData?.outputAmount }))
        dispatch(reduceBalance({ currency: formData?.source, amount: formData?.inputAmount }))
    }
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
