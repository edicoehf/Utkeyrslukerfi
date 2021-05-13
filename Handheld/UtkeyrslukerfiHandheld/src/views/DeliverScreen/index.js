import React, { useEffect, useRef, useState } from 'react'
import { View, Text } from 'react-native'
import CommentBox from '../../components/CommentBox'
import ProductTable from '../../components/ProductTable'
import CheckBox from '@react-native-community/checkbox'
import BasicButton from '../../components/BasicButton'
import styles from '../../styles/deliverScreen'
import { useSelector } from 'react-redux'
import { STATUS_DELIVERED } from '../../constants'

// Driver can scan in packages in current delivery, comment on the delivery and continue with the delivery
const DeliverScreen = ({ route, navigation }) => {
  // TODO:
  // - add consecutive screens that depend on checkbox
  // - add serial number to db and switch out count state
  const { delivery } = route.params
  const driver = useSelector(({ login }) => login.driver)
  const [customerComment, setCustomerComment] = useState('')
  const [driverComment, setDriverComment] = useState('')
  const [tableData, setTableData] = useState([])
  const tableHeaders = ['Pakkanr.', 'Pakki í sendingu']
  const [receiverNotHome, setReveiverNotHome] = useState(false)

  // A ref is neccessary since the remove buttons contain callbacks that reference the state at the time of creation otherwise
  const tableDataRef = useRef()

  // Create reference to table data to get a pointer to the current table data
  useEffect(() => {
    tableDataRef.current = [...tableData]
  }, [tableData])

  // Set the values for the comment sections, add the packages to the table
  useEffect(() => {
    if (delivery.driverComment) { setDriverComment(delivery.driverComment) }
    if (delivery.customerComment) { setCustomerComment(delivery.customerComment) }
    if (tableData.length === 0) {
      setTableData(delivery.packages.map((pck, idx) => {
        return {
          barcode: pck.id,
          package: `${idx + 1}/${delivery.packages.length}`
        }
      }))
    }
  }, [])

  // Navigate to signoff screen where already configured signoff methods will be shown
  const continueWithDelivery = () => {
    // Set comment in case it was altered and change status to 'delivered' as well as updating the driver and date
    delivery.driverComment = driverComment
    delivery.status = STATUS_DELIVERED
    delivery.driverID = driver
    // delivery.deliverDate = new Date() // TODO: test!!!

    navigation.navigate('Signoff', { delivery: delivery })
  }

  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <ProductTable tableHeaders={tableHeaders} tableData={tableData} numberOfObjects={2} label='Pakkar í sendingu' />
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
