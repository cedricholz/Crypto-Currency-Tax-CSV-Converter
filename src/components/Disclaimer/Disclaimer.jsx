import React from 'react'

import {
    Card,
    TextStyle,
} from '@shopify/polaris'

const Disclaimer = () => {


    return (
        <Card sectioned title="Disclaimer">
            <TextStyle>
                This cryptocurrency capital gains tax calculator is for entertainment purposes only. I am not a professional in the crypto tax field.
                I wrote this for myself to learn how taxes are calculated on crypto currency. The Capital Gains Tax
                CSV you get back may not be correct.
            </TextStyle>
        </Card>
    )

}


export default Disclaimer
