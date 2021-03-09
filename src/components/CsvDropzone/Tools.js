import {
    CSV_TYPE_HIFO,
    CSV_TYPE_LIFO
} from "./CsvDropzone"

export const parseCsv = (data, year, csvType) => {
    console.log("UP IN HERER", csvType)

    let headers = data[0]

    let rows = []

    let numberRows = [
        'Quantity Transacted',
        'USD Total (inclusive of fees)',
        'USD Spot Price at Transaction',
        'USD Fees',
    ]

    for (let i = 0; i < data.length; i++) {
        if (i !== 0) {
            let row = data[i]
            let rowDict = {}
            for (let j = 0; j < row.length; j++) {
                let val = row[j]
                let header = headers[j]
                if (numberRows.includes(header)) {
                    rowDict[header] = parseFloat(val) || 0
                } else {
                    rowDict[header] = val
                }
            }
            rows.push(rowDict)
        }
    }
    let histories = {}
    let buys = []

    const addTxRow = (buyRow, buyQuantity, sellRow, transactionType) => {
        let d = new Date(sellRow['Timestamp'])

        let costBasis = 0

        if (buyRow['Quantity Transacted'] > 0) {
            costBasis = buyRow['USD Total (inclusive of fees)'] / buyRow['Quantity Transacted'] * buyQuantity
        }

        let proceeds = buyQuantity * sellRow['USD Spot Price at Transaction'] - sellRow['USD Fees'] / sellRow['Quantity Transacted'] * buyQuantity

        if (transactionType === 'Sell' && d.getFullYear() === year) {
            buys.push({
                'Currency Name': buyRow['Asset'],
                'Purchase Date': buyRow['Timestamp'],
                'Cost Basis': costBasis,
                'Date sold': sellRow['Timestamp'],
                'Proceeds': proceeds,
            })
        }
    }

    for (let row of rows) {
        let assetName = row['Asset']
        let transactionType = row['Transaction Type']

        if (!histories[assetName]) {
            histories[assetName] = []
        }

        const processRow = (buyHistories, highest) => {

            const getBuyRow = () => {
                let br = null
                if (csvType === CSV_TYPE_HIFO) {
                    for (let bH of buyHistories) {
                        if (bH['Quantity Transacted'] > 0) {
                            if (!br) {
                                br = bH
                            } else {
                                if (highest && row['USD Spot Price at Transaction'] > br['USD Spot Price at Transaction']) {
                                    br = bH
                                } else if (!highest && row['USD Spot Price at Transaction'] < br['USD Spot Price at Transaction']) {
                                    br = bH
                                }
                            }
                        }
                    }
                } else if (csvType === CSV_TYPE_LIFO) {

                    if (!highest) {
                        for (let i = 0; i < buyHistories.length; i++) {
                            let buyRow = buyHistories[i]
                            if (buyRow['Quantity Transacted'] > 0) {
                                return buyRow
                            }
                        }
                    } else {
                        for (let i = buyHistories.length - 1; i >= 0; i--) {
                            let buyRow = buyHistories[i]
                            if (buyRow['Quantity Transacted'] > 0) {
                                return buyRow
                            }
                        }
                    }

                }

                return br
            }

            let buyRow = getBuyRow()
            let amountSold = row['Quantity Transacted']
            while (buyRow) {
                let amountBought = buyRow['Quantity Transacted']
                if (amountBought > amountSold) {
                    buyRow['Quantity Transacted'] = buyRow['Quantity Transacted'] - amountSold
                    addTxRow(buyRow, amountSold, row, transactionType, year)
                    break
                } else if (amountSold > 0) {
                    addTxRow(buyRow, buyRow['Quantity Transacted'], row, transactionType, year)
                    buyRow['Quantity Transacted'] = 0
                    amountSold -= amountBought
                }
                buyRow = getBuyRow()
            }
        }
        if (['Buy', 'Receive', 'Coinbase Earn'].includes(transactionType)) {
            histories[assetName].push(row)
        } else if (transactionType === 'Sell') {
            processRow(histories[assetName], true)
        } else if (transactionType === 'Send') {
            processRow(histories[assetName], false)
        }

    }

    return buys
}


