import React, { useState } from 'react'
import { View, Text, TouchableHighlight } from 'react-native'
import Feather from 'react-native-vector-icons/Feather'
import { useSelector } from 'react-redux'
import BarcodeForm from '../../components/BarcodeForm'
import ProductTable from '../../components/ProductTable'
import StatusCodeDropdown from '../../components/StatusCodeDropdown'

// This screen is used to scan multiple products and change their status
const ScanScreen = () => {
  // TODO: 
    // - db stuff: get prev status, check if barcode is valid
    // - css
  const availableStatusCodes = useSelector(({ statusCode }) => statusCode)

  const [status, setStatus] = useState(availableStatusCodes[2])
  const [barcode, setBarcode] = useState('')
  const [tableData, setTableData] = useState([[]])
  const tableHeaders = ['Sendingarnúmer', 'Fyrri staða', 'Ný staða', '']
  const tableWidth = [100, 60, 60, 40]

  // Add item to table
  const addBarcode = () => {
    setTableData([
      ...tableData,
      [
        barcode,
        'hmm',
        status,
        <TouchableHighlight key={barcode} onPress={() => { removeBarcode(barcode) }}>
          <Feather name='x' style={{ width: 26 - 32 }} color='#333' size={24} />
        </TouchableHighlight>
      ]
    ])
  }

  // Remove item from table, barcodes need to be unique
  const removeBarcode = (currentBarcode) => {
    setTableData(tableData.filter(b => b[0] !== currentBarcode))
  }

  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>Staða</Text>
      <StatusCodeDropdown status={status} setStatus={setStatus} />
      <Text>Strikamerki sendingar</Text>
      <BarcodeForm barcode={barcode} setBarcode={setBarcode} enterBarcode={addBarcode} />
      <Text>Skannaðir pakkar</Text>
      <ProductTable tableHeaders={tableHeaders} tableData={tableData} tableWidth={tableWidth} />
    </View>
  )
}

export default ScanScreen
