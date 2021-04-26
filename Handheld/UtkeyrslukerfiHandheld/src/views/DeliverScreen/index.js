import React, { useState } from 'react'
import { View, Text } from 'react-native'
import BarcodeForm from '../../components/BarcodeForm'
import CommentBox from '../../components/CommentBox'
import ProductTable from '../../components/ProductTable'

const DeliverScreen = () => {
  const [ barcode, setBarcode ] = useState()
  const [customerComment, setCustomerComment] = useState('')
  const [driverComment, setDriverComment] = useState('')
  const [tableData, setTableData] = useState([[]])
  const tableWidth = [100, 60, 40]
  const tableHeaders = ['Sendingarnúmer', 'Pakki í sendingu', '']

  const addBarcode = () => {
    // All packages in current delivery about to ber delivered should be scanned
    // Use setTableData to add packages
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
