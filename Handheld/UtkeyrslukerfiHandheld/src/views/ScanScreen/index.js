import React, { useEffect, useRef, useState } from 'react'
import { View, ToastAndroid, DeviceEventEmitter } from 'react-native'
import { useSelector } from 'react-redux'
import BarcodeForm from '../../components/BarcodeForm'
import BasicButton from '../../components/BasicButton'
import ProductTable from '../../components/ProductTable'
import RemoveButton from '../../components/RemoveButton'
import StatusCodeDropdown from '../../components/StatusCodeDropdown'
import deliveryService from '../../services/deliveryService'

// This screen is used to scan multiple products and change their status
const ScanScreen = () => {
  // TODO:
  // - css of error messages, error checking, error messages (error check, error messages, check if in table already?)
  const availableStatusCodes = useSelector(({ statusCode }) => statusCode)
  const token = useSelector(({ login }) => login.token)
  const [status, setStatus] = useState(2)
  const [barcode, setBarcode] = useState('')
  const [tableData, setTableData] = useState([])
  const tableHeaders = ['Sendingarnr', 'Fyrri staða', 'Ný staða', '']

  // A ref is neccessary since the remove buttons contain callbacks that reference the state at the time of creation otherwise
  const tableDataRef = useRef()

  useEffect(() => {
    tableDataRef.current = [...tableData]
  }, [tableData])

  useEffect(() => {
    DeviceEventEmitter.addListener('barcode_scan', scanBarcode)
  }, [])

  // Remove item from table, barcodes need to be unique
  const removeBarcode = (currentBarcode) => {
    setTableData(tableDataRef.current.filter(b => b.barcode !== currentBarcode))
  }

  // On barcode scanned
  const scanBarcode = (barcodeObj) => { addBarcodeToTable(barcodeObj.data) }

  // On barcode entered
  const addBarcode = () => { addBarcodeToTable(barcode); setBarcode(''); }

  // Add item to table
  const addBarcodeToTable = async (barcode) => {
    if (!barcode) { return ToastAndroid.showWithGravity('Strikamerki er ekki til staðar', ToastAndroid.LONG, ToastAndroid.TOP) }
    if (tableData.some(p => p.barcode === barcode)) { return ToastAndroid.showWithGravity('Sending er nú þegar í töflu', ToastAndroid.LONG, ToastAndroid.TOP) }
    try {
      const res = await deliveryService.getDelivery(token, barcode)

      if (res?.status === 400) { return ToastAndroid.showWithGravity('Óheimil beiðni.', ToastAndroid.LONG, ToastAndroid.TOP) }
      if (res?.status === 401) { return ToastAndroid.showWithGravity('Notandi er ekki innskráður.', ToastAndroid.LONG, ToastAndroid.TOP) }
      if (res?.status === 404) { return ToastAndroid.showWithGravity('Sending fannst ekki.', ToastAndroid.LONG, ToastAndroid.TOP) }
      if (res?.status === 200) {
        const delivery = await res.json()
        setTableData([
          {
            barcode: barcode,
            fromStatus: availableStatusCodes[delivery.status],
            toStatus: availableStatusCodes[status],
            button: <RemoveButton key={barcode} barcode={barcode} removeBarcode={removeBarcode} />,
            status: status
          },
          ...tableData
        ])
      }

    } catch (error) {
      ToastAndroid.showWithGravity('Ekki náðist samband við netþjón', ToastAndroid.LONG, ToastAndroid.TOP)
    }
  }

  // Update status for all deliveries currently in table
  const updateDeliveries = async () => {
    try {
      const deliveriesData = { deliveries: tableData.map(d => { return { id: d.barcode, status: d.status } }) }
      const res = await deliveryService.updateDeliveries(token, deliveriesData)
      setTableData([])
      if (res?.status === 400) { return ToastAndroid.showWithGravity('Óheimil beiðni.', ToastAndroid.LONG, ToastAndroid.TOP) }
      if (res?.status === 401) { return ToastAndroid.showWithGravity('Notandi er ekki innskráður.', ToastAndroid.LONG, ToastAndroid.TOP) }
      if (res?.status === 404) { return ToastAndroid.showWithGravity('Sending fannst ekki.', ToastAndroid.LONG, ToastAndroid.TOP) }
      if (res?.status === 204) { return ToastAndroid.showWithGravity('Gögn vistuð', ToastAndroid.LONG, ToastAndroid.TOP) }
    } catch (error) {
      ToastAndroid.showWithGravity('Ekki náðist samband við netþjón', ToastAndroid.LONG, ToastAndroid.TOP)
    }
  }

  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <StatusCodeDropdown status={status} setStatus={setStatus} label='Breyta í stöðu' />
      <BarcodeForm barcode={barcode} setBarcode={setBarcode} enterBarcode={addBarcode} labelText='Strikamerki sendingar' />
      <ProductTable tableHeaders={tableHeaders} tableData={tableData} numberOfObjects={3} label='Skannaðar sendingar' />
      <BasicButton buttonText='Uppfæra' onPressFunction={updateDeliveries} />
    </View>
  )
}

export default ScanScreen
