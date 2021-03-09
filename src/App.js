import './App.css'
import '@shopify/polaris/dist/styles.css'
import {
    AppProvider,
    Card,
    DisplayText,
    Layout,
    Stack,
} from '@shopify/polaris'
import CsvDropzone from "./components/CsvDropzone/CsvDropzone"
import Ad from "./components/Ad/Ad"
import Instructions from "./components/Instructions/Instructions"
import Disclaimer from "./components/Disclaimer/Disclaimer"

const App = () => {
    return (
        <div className="App">
            <AppProvider>
                <Layout>

                </Layout>
                <Stack vertical spacing="extraLoose" alignment={"center"}>

                    <DisplayText size={'extraLarge'}>
                        Cryptocurrency Tax CSV Converter
                    </DisplayText>


                    <DisplayText size={'large'}>
                        Transaction History CSV -> Capital Gains Tax CSV
                    </DisplayText>

                    <Stack distribution={"fillEvenly"}>
                        <Stack.Item>
                            <Ad/>
                        </Stack.Item>
                        <Stack.Item>
                            <Card sectioned>
                                <CsvDropzone/>
                            </Card>

                        </Stack.Item>
                        <Stack.Item>
                            <Ad/>
                        </Stack.Item>
                    </Stack>
                    <Instructions/>
                    <div style={{maxWidth: 600}}>
                        <Disclaimer/>
                    </div>

                </Stack>
            </AppProvider>
        </div>
    )
}

export default App
