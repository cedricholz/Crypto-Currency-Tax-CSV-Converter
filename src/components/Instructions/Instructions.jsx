import React from 'react'
import {
    Banner,
    List,
    Stack,
    TextStyle,
} from "@shopify/polaris"


const Instructions = () => {


    return (
        <div style={{maxWidth: 600}}>
            <Banner
                title="Instructions"
                status="info"
            >
                <Stack vertical>
                    <TextStyle>
                        Drag your formatted Transaction History CSVs into the Dropzone and wait for your browser
                        to translate them into your Capital Gains Tax CSV, formatted for TurboTax.
                    </TextStyle>
                    <List type="number">
                        <List.Item>
                            Download your Transaction History CSV for all time from Coinbase, Robinhood,
                            Binance, Kraken, etoro or whatever crypto exchange you use.
                        </List.Item>
                        <List.Item>
                            Open the file and edit it to observe to the following:
                            <List type="bullet">
                                <List.Item>
                                    Make sure the top row is the CSV headers. You may have to delete some data.
                                </List.Item>
                                <List.Item>
                                    Rename your headers to this: Timestamp,Transaction Type,Asset,Quantity
                                    Transacted,USD Spot Price at Transaction,USD Subtotal,USD Total (inclusive
                                    of fees),USD Fees
                                </List.Item>
                                <List.Item>
                                    Transaction type can be: Buy, Sell, Send, Receive, Coinbase Earn
                                </List.Item>
                            </List>
                        </List.Item>
                        <List.Item>
                            Select the HIFO or LIFO method for calculating your tax.
                            <List type="bullet">
                                <List.Item>
                                    HIFO: Highest In First Out means that the buy orders with the highest
                                    price will be chosen first when deciding where the currency for the sell
                                    order came from.
                                </List.Item>
                                <List.Item>
                                    LIFO: Last In First Out means that the oldest buy orders will be chosen
                                    first when deciding where the currency for the sell order came from.
                                </List.Item>
                            </List>
                        </List.Item>
                    </List>
                </Stack>
            </Banner>

        </div>
    )

}


export default Instructions
