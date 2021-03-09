import React, {
    useCallback,
    useEffect,
    useState
} from 'react'
import csv from "csv"
import {parseCsv} from "./Tools"
import {
    DropZone,
    RadioButton,
    Select,
    Stack,
} from "@shopify/polaris"
import './CsvDropzone.css'

export const CSV_TYPE_HIFO = 'hifo'
export const CSV_TYPE_LIFO = 'lifo'
const CsvDropzone = () => {


    const [csvType, setCsvType] = useState('hifo')
    const [dateOptions, setDateOptions] = useState([])
    const [selectedYear, setSelectedYear] = useState((new Date().getFullYear() - 1).toString())


    useEffect(() => {
        let thisYear = new Date().getFullYear()

        let options = [...Array(100).keys()].map((number) => {
            let y = (thisYear - number).toString()
            return (
                {label: y, value: y}
            )
        })

        setDateOptions(options)


    }, [])


    const handleDropZoneDrop = useCallback(
        (_dropFiles, acceptedFiles, _rejectedFiles) => {

            acceptedFiles.forEach(file => {
                const reader = new FileReader()
                reader.fileName = file.name
                reader.onabort = () => console.log("file reading was aborted")
                reader.onerror = () => console.log("file reading failed")
                reader.onload = (evt) => {
                    csv.parse(reader.result, (err, data) => {
                        let fileName = evt.target.fileName.replace('.csv', '').replace('.CSV', '')
                        fileName = `${fileName}__${csvType}__${selectedYear}.csv`
                        let rows = parseCsv(data, parseInt(selectedYear), csvType)
                        let csvContent = "data:text/csv;charset=utf-8,"
                        for (let i = 0; i < rows.length; i++) {
                            let row = rows[i]
                            if (i === 0) {
                                csvContent += Object.keys(row).join(",") + '\n'
                            } else {
                                csvContent += Object.values(row).join(",") + '\n'
                            }
                        }

                        let encodedUri = encodeURI(csvContent)
                        let link = document.createElement("a")
                        link.setAttribute("href", encodedUri)
                        link.setAttribute("download", fileName)
                        document.body.appendChild(link)

                        link.click()
                    })
                }

                reader.readAsText(file)
            })
        },
        [selectedYear, csvType],
    )


    return (
        <Stack vertical spacing="extraLoose" alignment="center">

            <Stack alignment="center">
                <RadioButton
                    label="HIFO"
                    helpText="Highest In First Out"
                    checked={csvType === 'hifo'}
                    id="disabled"
                    name="accounts"
                    onChange={() => {
                        setCsvType('hifo')
                    }}
                />
                <RadioButton
                    label="LIFO"
                    helpText="Last In First out"
                    id="optional"
                    name="accounts"
                    checked={csvType === 'lifo'}
                    onChange={() => {
                        setCsvType('lifo')
                    }}
                />

            </Stack>
            <Select
                label="Year"
                helpText={"Which year do you want to calculate taxes on?"}
                options={dateOptions}
                value={selectedYear}
                onChange={setSelectedYear}
            />

            <div className="CsvDropzone">
                <DropZone onDrop={handleDropZoneDrop}>
                    <DropZone.FileUpload
                        actionTitle={'Process Transactions'}
                        // actionHint={'or drop csv file'}
                    />
                </DropZone>
            </div>
        </Stack>
    )
}

export default CsvDropzone