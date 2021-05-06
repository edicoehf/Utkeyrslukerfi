import React, { useEffect, useRef, useState } from 'react'
import { View, Text, ToastAndroid, TextInput } from 'react-native'
import Signature from 'react-native-signature-canvas'
import { useDispatch, useSelector } from 'react-redux'
import { setStep } from '../../actions/signingProcessActions'
import BasicButton from '../../components/BasicButton'
import styles from '../../styles/signForDeliveryScreen'
import { EAzureBlobStorageFile } from 'react-native-azure-blob-storage'
import { REACT_APP_STORAGE_KEY } from '@env'
import * as FileSystem from 'react-native-fs'

// Let the receiver sign for the delivery
const SignForDeliveryScreen = ({ route, navigation }) => {
  const [name, setName] = useState('')
  const signingProcess = useSelector(({ signingProcess }) => signingProcess)
  const dispatch = useDispatch()
  const canvasRef = useRef()
  const { delivery } = route.params

  useEffect(() => {
    (async () => {
      await EAzureBlobStorageFile.configure(
        'utkeyrslukerfistorage',
        REACT_APP_STORAGE_KEY,
        'signatures'
      )
    })()
    setName(delivery.recipient)
  }, [])

  // First the signature base64 needs to be saved to the phones cache and then uploaded to the blob storage
  const saveSignature = async (signature) => {
    try {
      const contentType = 'image/png'
      const b64Data = signature.replace('data:image/png;base64,', '')
      const fileName = `signature${delivery.id}.png`
      const path = `file://${FileSystem.CachesDirectoryPath}/${fileName}`

      // Save file
      await FileSystem.writeFile(path, b64Data, 'base64')

      // Upload file to blob storage
      const fileNameRet = await EAzureBlobStorageFile.uploadFile({
        filePath: path,
        contentType: contentType,
        fileName: fileName
      })
      return fileNameRet
    } catch (err) {
      console.log(err)
    }
  }

  // Save the signature and recipient
  const handleSignature = async (signature) => {
    // TODO: save the image on a server and save the link in the db, get the link for the image from signature.data
    if (!name) {
      ToastAndroid.showWithGravity('Vinsamlegast settu inn nafn móttakanda.', ToastAndroid.LONG, ToastAndroid.TOP)
      return
    }
    // Set recipient
    delivery.recipient = name

    // Set file name
    const fileName = await saveSignature(signature)
    delivery.signoffSignatureURI = fileName // TODO: save to db
    const route = signingProcess.process[signingProcess.step]
    dispatch(setStep(2)) // TODO: numbering
    navigation.navigate(route, { delivery: delivery })
  }

  const handleEmpty = () => { ToastAndroid.showWithGravity('Undirskrift vantar.', ToastAndroid.LONG, ToastAndroid.TOP) }

  const handleClear = () => { canvasRef.current.clearSignature() }

  const handleConfirm = () => { canvasRef.current.readSignature() }

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Nafn móttakanda:</Text>
      <TextInput
        style={styles.input}
        onChangeText={setName}
        defaultValue={delivery.name}
      />
      <View style={styles.canvasContainer}>
        <Signature
          ref={canvasRef}
          style={styles.canvas}
          onOK={handleSignature}
          onEmpty={handleEmpty}
          bgColor='#000000'
          webStyle={`
          .m-signature-pad--footer {display: none !important;}
          `}
        />
      </View>
      <View style={styles.buttonContainer}>
        <BasicButton
          buttonText='Hreinsa'
          onPressFunction={handleClear}
        />
        <BasicButton
          buttonText='Vista'
          onPressFunction={handleConfirm}
        />
      </View>
    </View>
  )
}

export default SignForDeliveryScreen
