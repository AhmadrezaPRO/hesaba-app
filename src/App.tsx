import {Layout, Form} from './components'
import {getInputs} from './lib'
import {
    QueryClient,
    QueryClientProvider,
} from 'react-query'
import {Provider} from 'react-redux'
import {store} from './store'

interface ExchangeFormType {
}

const exchangeForm = getInputs<ExchangeFormType>('exchange')

const queryClient = new QueryClient()

const App = () => {
    const onSubmitExchangeForm = (data: unknown) => console.log({exchange: data})
    const onSwapExchangeForm = (data: unknown) => console.log({exchange: data})

    return (
        <QueryClientProvider client={queryClient}>
            <Provider store={store}>
                <Layout>
                    <Form
                        {...exchangeForm}
                        titleForm='Exchange Form!'
                        onSubmit={onSubmitExchangeForm}
                        labelButtonSubmit='Exchange'
                    />
                </Layout>
            </Provider>
        </QueryClientProvider>
    )
}
export default App
