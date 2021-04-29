import React, { useEffect, useRef, useState } from 'react'
import { View, Text, Button } from 'react-native'
import BarcodeForm from '../../components/BarcodeForm'
import CommentBox from '../../components/CommentBox'
import ProductTable from '../../components/ProductTable'
import RemoveButton from '../../components/RemoveButton'
import CheckBox from '@react-native-community/checkbox'

// Driver can scan in packages in current delivery, comment on the delivery and continue with the delivery
const DeliverScreen = ({ route, navigation }) => {
  // TODO:
  // - css
  // - add consecutive screens that depend on checkbox
  const { delivery } = route.params
  const [count, setCount] = useState(1)
  const [barcode, setBarcode] = useState()
  const [customerComment, setCustomerComment] = useState('')
  const [driverComment, setDriverComment] = useState('')
  const [tableData, setTableData] = useState([[]])
  const tableWidth = [100, 60, 40]
  const tableHeaders = ['Sendingarnúmer', 'Pakki í sendingu', '']
  const [receiverNotHome, setReveiverNotHome] = useState(false)

  // A ref is neccessary since the remove buttons contain callbacks that reference the state at the time of creation otherwise
  const tableDataRef = useRef()

  useEffect(() => {
    tableDataRef.current = [...tableData]
  }, [tableData])

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
    if (delivery.packages.some(p => p.id === barcode)) {
      setTableData([
        ...tableData,
        [
          barcode,
          `${count}/${delivery.packages.length}`,
          <RemoveButton key={barcode} barcode={barcode} removeBarcode={removeBarcode} />
        ]
      ])
      setCount(count + 1)
    }
    setBarcode('')
  }

  // Navigate to sign page OR camera page if checkbox is checked
  const continueWithDelivery = () => {
    navigation.navigate('SignForDelivery')
  }

  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <BarcodeForm barcode={barcode} setBarcode={setBarcode} enterBarcode={addBarcode} />
      <ProductTable tableHeaders={tableHeaders} tableData={tableData} tableWidth={tableWidth} />
      <CommentBox label='Athugasemd viðskiptavinar' editable={false} comment={customerComment} setComment={setCustomerComment} />
      <CommentBox label='Athugasemd bílstjóra' editable comment={driverComment} setComment={setDriverComment} />
      <CheckBox value={receiverNotHome} onValueChange={setReveiverNotHome} />
      <Text>Móttakandi ekki við</Text>
      <Button title='Áfram' onPress={continueWithDelivery} accessibilityLabel='Continue with delivery.' />
    </View>
  )
}

export default DeliverScreen
