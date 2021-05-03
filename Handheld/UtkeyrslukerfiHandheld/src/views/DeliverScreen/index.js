import React, { useEffect, useRef, useState } from 'react'
import { View, Text, ToastAndroid } from 'react-native'
import BarcodeForm from '../../components/BarcodeForm'
import CommentBox from '../../components/CommentBox'
import ProductTable from '../../components/ProductTable'
import RemoveButton from '../../components/RemoveButton'
import CheckBox from '@react-native-community/checkbox'
import { useDispatch, useSelector } from 'react-redux'
import { setStep } from '../../actions/signingProcessActions'
import BasicButton from '../../components/BasicButton'
import styles from '../../styles/deliverScreen'

// Driver can scan in packages in current delivery, comment on the delivery and continue with the delivery
const DeliverScreen = ({ route, navigation }) => {
  // TODO:
  // - css
  // - add consecutive screens that depend on checkbox
  // - Make sure back buttons decrement steps
  const { delivery } = route.params
  const [count, setCount] = useState(1)
  const [barcode, setBarcode] = useState()
  const [customerComment, setCustomerComment] = useState('')
  const [driverComment, setDriverComment] = useState('')
  const [tableData, setTableData] = useState([])
  const tableHeaders = ['Sendingarnr.', 'Pakki í sendingu', '']
  const [receiverNotHome, setReveiverNotHome] = useState(false)
  const signingProcess = useSelector(({ signingProcess }) => signingProcess)
  const dispatch = useDispatch()

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
    if (!barcode) { ToastAndroid.show('Strikamerki er ekki til staðar', ToastAndroid.LONG) }
    if (delivery.packages.some(p => p.id === barcode)) {
      setTableData([
        ...tableData,
        {
          barcode: barcode,
          package: `${count}/${delivery.packages.length}`,
          button: <RemoveButton key={barcode} barcode={barcode} removeBarcode={removeBarcode} />
        }
      ])
      setCount(count + 1)
    } else {
      ToastAndroid.show('Rangt strikamerki', ToastAndroid.LONG)
    }
    setBarcode('')
  }

  // Navigate to sign page, camera page or delivery received page depending on delivery process
  const continueWithDelivery = () => {
    const route = signingProcess.process[signingProcess.step]
    dispatch(setStep(signingProcess.step + 1))
    navigation.navigate(route)
  }

  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <BarcodeForm barcode={barcode} setBarcode={setBarcode} enterBarcode={addBarcode} labelText='Strikamerki pakka' />
      <ProductTable tableHeaders={tableHeaders} tableData={tableData} numberOfObjects={2} />
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
