import React, { useEffect, useState } from 'react'
import { View } from 'react-native'
import BarcodeForm from '../../components/BarcodeForm'
import CommentBox from '../../components/CommentBox'
import ProductTable from '../../components/ProductTable'

// Driver can scan in packages in current delivery, comment on the delivery and continue with the delivery
const DeliverScreen = ({ route }) => {
  // TODO: 
    // - css
    // - add packages to table after clicking enter
    // - check in database if package is valid
    // - add checkbox
    // - add consecutive screens that depends on checkbox 
    // - add button to get to next screen
  const { delivery } = route.params
  const [ barcode, setBarcode ] = useState()
  const [customerComment, setCustomerComment] = useState('')
  const [driverComment, setDriverComment] = useState('')
  const [tableData, setTableData] = useState([[]])
  const tableWidth = [100, 60, 40]
  const tableHeaders = ['Sendingarnúmer', 'Pakki í sendingu', '']

  useEffect(() => {
    if (delivery.driverComment) { setDriverComment(delivery.driverComment) }
    if (delivery.customerComment) { setCustomerComment(delivery.customerComment) }
  }, [])

  // All packages in current delivery about to be delivered should be scanned
  const addBarcode = () => {
    setTableData([
      ...tableData,
      [
        barcode,
        '1/4',
        <TouchableHighlight key={barcode} onPress={() => { removeBarcode(barcode) }}>
          <Feather name='x' style={{ width: 26 - 32 }} color='#333' size={24} />
        </TouchableHighlight>
      ]
    ])
  }

  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <BarcodeForm barcode={barcode} setBarcode={setBarcode} enterBarcode={addBarcode} />
      <ProductTable tableHeaders={tableHeaders} tableData={tableData} tableWidth={tableWidth} />
      <CommentBox label='Athugasemd viðskiptavinar' editable={false} comment={customerComment} setComment={setCustomerComment} />
      <CommentBox label='Athugasemd bílstjóra' editable={true} comment={driverComment} setComment={setDriverComment} />
    </View>
  )
}

export default DeliverScreen
