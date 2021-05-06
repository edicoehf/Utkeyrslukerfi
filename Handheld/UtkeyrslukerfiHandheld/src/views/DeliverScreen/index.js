import React, { useEffect, useRef, useState } from 'react'
import { View, Text, ToastAndroid } from 'react-native'
import BarcodeForm from '../../components/BarcodeForm'
import CommentBox from '../../components/CommentBox'
import ProductTable from '../../components/ProductTable'
import RemoveButton from '../../components/RemoveButton'
import CheckBox from '@react-native-community/checkbox'
import BasicButton from '../../components/BasicButton'
import styles from '../../styles/deliverScreen'
import { useSelector } from 'react-redux'

// Driver can scan in packages in current delivery, comment on the delivery and continue with the delivery
const DeliverScreen = ({ route, navigation }) => {
  // TODO:
  // - add consecutive screens that depend on checkbox
  // - add serial number to db and switch out count state
  const { delivery } = route.params
  const [count, setCount] = useState(1)
  const [barcode, setBarcode] = useState()
  const driver = useSelector(({ login }) => login.driver)
  const [customerComment, setCustomerComment] = useState('')
  const [driverComment, setDriverComment] = useState('')
  const [tableData, setTableData] = useState([])
  const tableHeaders = ['Sendingarnr.', 'Pakki í sendingu', '']
  const [receiverNotHome, setReveiverNotHome] = useState(false)

  // A ref is neccessary since the remove buttons contain callbacks that reference the state at the time of creation otherwise
  const tableDataRef = useRef()

  // Create reference to table data to get a pointer to the current table data
  useEffect(() => {
    tableDataRef.current = [...tableData]
  }, [tableData])

  // Set the values for the comment sections
  useEffect(() => {
    if (delivery.driverComment) { setDriverComment(delivery.driverComment) }
    if (delivery.customerComment) { setCustomerComment(delivery.customerComment) }
    if (tableData.length === 0) { delivery.packages.forEach(p => addToTable(p.id)) }
  }, [])

  // Remove item from table, barcodes need to be unique
  const removeBarcode = (currentBarcode) => {
    setTableData(tableDataRef.current.filter(b => b[0] !== currentBarcode))
  }

  // All packages in current delivery about to be delivered should be scanned
  const addBarcode = () => {
    if (!barcode) { ToastAndroid.showWithGravity('Strikamerki er ekki til staðar', ToastAndroid.LONG, ToastAndroid.TOP) }
    // Only add packages in this delivery && only add packages once
    if (delivery.packages.some(p => p.id === barcode) && tableData.every(p => p.barcode != barcode)) {
      addToTable(barcode)
    } else {
      ToastAndroid.showWithGravity('Rangt strikamerki', ToastAndroid.LONG, ToastAndroid.TOP)
    }
    setBarcode('')
  }

  // Add package to table
  const addToTable = (barcode) => {
    setTableData([
      ...tableData,
      {
        barcode: barcode,
        package: `${count}/${delivery.packages.length}`,
        button: <RemoveButton key={barcode} barcode={barcode} removeBarcode={removeBarcode} />
      }
    ])
    setCount(count + 1)
  }

  // Navigate to signoff screen where already configured signoff methods will be shown
  const continueWithDelivery = () => {
    // Set comment in case it was altered and status to 'delivered'
    delivery.driverComment = driverComment
    delivery.status = 3
    delivery.driverID = driver

    navigation.navigate('Signoff', { delivery: delivery })
  }

  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <BarcodeForm barcode={barcode} setBarcode={setBarcode} enterBarcode={addBarcode} labelText='Strikamerki pakka' />
      <ProductTable tableHeaders={tableHeaders} tableData={tableData} numberOfObjects={2} label={'Pakkar í sendingu'} />
      <CommentBox label='Athugasemd viðskiptavinar' editable={false} comment={customerComment} setComment={setCustomerComment} />
      <CommentBox label='Athugasemd bílstjóra' editable comment={driverComment} setComment={setDriverComment} />
      <View style={styles.container}>
        <CheckBox value={receiverNotHome} onValueChange={setReveiverNotHome} />
        <Text style={styles.check}>Móttakandi ekki við</Text>
        <BasicButton buttonText='Áfram' onPressFunction={continueWithDelivery} />
      </View>
    </View>
  )
}

export default DeliverScreen
