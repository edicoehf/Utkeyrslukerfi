import React, { useEffect, useRef, useState } from 'react'
import { View, Text } from 'react-native'
import { useSelector } from 'react-redux'
import BarcodeForm from '../../components/BarcodeForm'
import ProductTable from '../../components/ProductTable'
import RemoveButton from '../../components/RemoveButton'
import StatusCodeDropdown from '../../components/StatusCodeDropdown'
import deliveryService from '../../services/deliveryService'
import loginService from '../../services/loginService'
// This screen is used to scan multiple products and change their status
const ScanScreen = () => {
  // TODO:
  // - db stuff: get prev status, check if barcode is valid
  // - css
  const availableStatusCodes = useSelector(({ statusCode }) => statusCode)
  const token = useSelector(({ login }) => login.token)
  const [status, setStatus] = useState(2)
  const [barcode, setBarcode] = useState('')
  const [tableData, setTableData] = useState([])
  const tableHeaders = ['Sendingarnúmer', 'Fyrri staða', 'Ný staða', '']
  const tableWidth = [100, 60, 60, 40]

  // A ref is neccessary since the remove buttons contain callbacks that reference the state at the time of creation otherwise
  const tableDataRef = useRef()

  useEffect(() => {
    tableDataRef.current = [...tableData]
  }, [tableData])

  // Remove item from table, barcodes need to be unique
  const removeBarcode = (currentBarcode) => {
    setTableData(tableDataRef.current.filter(b => b[0] !== currentBarcode))
  }

  // Add item to table
  const addBarcode = async () => {
    try {
      console.log(barcode, token)
      let x = await loginService.logout(token)
      console.log(x)
      setTableData([
        [
          barcode,
          availableStatusCodes[x.status],
          availableStatusCodes[status],
          <RemoveButton key={barcode} barcode={barcode} removeBarcode={removeBarcode} />
        ],
        ...tableData
      ])
      setBarcode('')
    } catch (error) {
      console.log(error)
    }
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
