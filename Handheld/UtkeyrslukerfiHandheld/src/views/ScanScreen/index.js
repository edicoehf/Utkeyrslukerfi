import AsyncStorage from '@react-native-async-storage/async-storage'
import React, { useEffect, useRef, useState } from 'react'
import { View, Text, Button } from 'react-native'
import { useSelector } from 'react-redux'
import BarcodeForm from '../../components/BarcodeForm'
import ProductTable from '../../components/ProductTable'
import RemoveButton from '../../components/RemoveButton'
import StatusCodeDropdown from '../../components/StatusCodeDropdown'
import deliveryService from '../../services/deliveryService'

// This screen is used to scan multiple products and change their status
const ScanScreen = () => {
  // TODO:
  // - error checking, error messages (error check, error messages, check if in table already?)
  // - css
  const availableStatusCodes = useSelector(({ statusCode }) => statusCode)
  const token = useSelector(({ login }) => login.token)
  const [status, setStatus] = useState(2)
  const [barcode, setBarcode] = useState('')
  const [tableData, setTableData] = useState([])
  const tableHeaders = ['Sendingarnúmer', 'Fyrri staða', 'Ný staða', '']

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
      // Check if barcode is valid
      const delivery = await deliveryService.getDelivery(token, barcode)
      setTableData([
        {
          barcode: barcode,
          fromStatus: delivery.status,
          toStatus: status,
          button: <RemoveButton key={barcode} barcode={barcode} removeBarcode={removeBarcode} />
        },
        ...tableData
      ])
      setBarcode('')
    } catch (error) {
      console.log(error)
    }
  }

  // Update status for all deliveries currently in table
  const updateDeliveries = async () => {
    try {
      const deliveriesData = { deliveries: tableData.map(d => { return { id: d.barcode, status: d.toStatus } }) }
      await deliveryService.updateDeliveries(token, deliveriesData)
      setTableData([])
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
      <ProductTable tableHeaders={tableHeaders} tableData={tableData} />
      <Button onPress={updateDeliveries} title='Uppfæra' />
    </View>
  )
}

export default ScanScreen
