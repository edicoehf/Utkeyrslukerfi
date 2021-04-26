import React, { useEffect, useRef, useState } from 'react'
import { View, Text, Button } from 'react-native'
import BarcodeForm from '../../components/BarcodeForm'
import CommentBox from '../../components/CommentBox'
import ProductTable from '../../components/ProductTable'
import RemoveButton from '../../components/RemoveButton'
import CheckBox from '@react-native-community/checkbox'

// Driver can scan in packages in current delivery, comment on the delivery and continue with the delivery
const DeliverScreen = () => {
  // TODO: 
    // - css
    // - check in database if package is valid, need to take in delivery (either from route or props)
    // - add consecutive screens that depends on checkbox 
  const [ delivery, setDelivery ] = useState({})
  const [ barcode, setBarcode ] = useState()
  const [customerComment, setCustomerComment] = useState('')
  const [driverComment, setDriverComment] = useState('')
  const [tableData, setTableData] = useState([[]])
  const tableWidth = [100, 60, 40]
  const tableHeaders = ['Sendingarnúmer', 'Pakki í sendingu', '']
  const [ receiverNotHome, setReveiverNotHome ] = useState(false)

  // A ref is neccessary since the remove buttons contain callbacks that reference the state at the time of creation otherwise 
  const tableDataRef = useRef()

  useEffect(() => {
    tableDataRef.current = [ ...tableData ]
  }), [tableData]

  useEffect(() => {
    if (delivery.driverComment) { setDriverComment(delivery.driverComment) }
    if (delivery.customerComment) { setCustomerComment(delivery.customerComment) }
  }, [])

  // Remove item from table, barcodes need to be unique
  const removeBarcode = (currentBarcode) => {
    setTableData(tableDataRef.current.filter(b => b[0] !== currentBarcode))
  }

  // All packages in current delivery about to be delivered should be scanned
  const addBarcode = () => {
    setTableData([
      ...tableData,
      [
        barcode,
        'hmm 1/4',
        <RemoveButton barcode={barcode} removeBarcode={removeBarcode} />
      ]
    ])
    setBarcode('')
  }

  // Navigate to sign page OR camera page if checkbox is checked
  const continueWithDelivery = () => {

  }

  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <BarcodeForm barcode={barcode} setBarcode={setBarcode} enterBarcode={addBarcode} />
      <ProductTable tableHeaders={tableHeaders} tableData={tableData} tableWidth={tableWidth} />
      <CommentBox label='Athugasemd viðskiptavinar' editable={false} comment={customerComment} setComment={setCustomerComment} />
      <CommentBox label='Athugasemd bílstjóra' editable={true} comment={driverComment} setComment={setDriverComment} />
      <CheckBox value={receiverNotHome} onValueChange={setReveiverNotHome} />
      <Text>Móttakandi ekki við</Text>
      <Button title='Áfram' onPress={continueWithDelivery} accessibilityLabel={'Continue with delivery.'} />
    </View>
  )
}

export default DeliverScreen
