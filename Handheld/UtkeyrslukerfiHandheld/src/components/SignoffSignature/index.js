import React, { useRef } from 'react'
import { View, ToastAndroid, Text } from 'react-native'
import Signature from 'react-native-signature-canvas'
import BasicButton from '../../components/BasicButton'
import styles from '../../styles/signoffSignature'
import AzureBlobStorage from '../../resources/AzureBlobStorage.class'
import { REACT_APP_STORAGE_KEY } from '@env'
import * as FileSystem from 'react-native-fs'
import { AZURE_ACCOUNT_NAME, AZURE_CONTAINER_SINGATUERES } from '../../constants'
import PropTypes from 'prop-types'

// Signoff Signature, gets receivers signature during delivery
const SignoffSignature = ({ delivery, stepCounter, setStepCounter }) => {
  const canvasRef = useRef()

  const handleEmpty = () => { ToastAndroid.showWithGravity('Undirskrift vantar.', ToastAndroid.LONG, ToastAndroid.TOP) }

  const handleClear = () => { canvasRef.current.clearSignature() }

  const handleConfirm = () => { canvasRef.current.readSignature() }

  // First the signature base64 needs to be saved to the phones cache and then uploaded to the blob storage
  const saveSignature = async (signature) => {
    try {
      // Set necessary values
      const contentType = 'image/png'
      const b64Data = signature.replace('data:image/png;base64,', '')
      const fileSize = ((b64Data.length * (3 / 4)) - 1) // Size in Bytes
      const fileName = `signature${delivery.id}.png`
      const path = `file://${FileSystem.CachesDirectoryPath}/${fileName}`

      // Save file to device
      await FileSystem.writeFile(path, b64Data, 'base64')

      // Initialize blob service
      const blobService = new AzureBlobStorage(
        AZURE_ACCOUNT_NAME,
        AZURE_CONTAINER_SINGATUERES,
        REACT_APP_STORAGE_KEY
      )

      // Upload file to blob storage
      const fileNameRet = await blobService.createBlockBlob({
        fileName: fileName,
        fileSize: fileSize,
        type: contentType,
        uri: path
      }, fileName)

      return fileNameRet
    } catch (err) {
      ToastAndroid.showWithGravity('Ekki náðist að flytja myndina upp í skýið', ToastAndroid.LONG, ToastAndroid.TOP)
    }
  }

  // Save the signature
  const continueWithDelivery = async (signature) => {
    // Save signature to cloud
    const fileName = await saveSignature(signature)

    if (fileName) {
      delivery.signoffSignatureURI = fileName

      // Mark SignoffSignature as done (0)
      setStepCounter(stepCounter ^ 4)
    }
  }

  return (
    <>
      <Text style={styles.label}>Undirskrift móttakanda:</Text>
      <View style={styles.canvasContainer}>
        <Signature
          ref={canvasRef}
          style={styles.canvas}
          onOK={continueWithDelivery}
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
    </>
  )
}

SignoffSignature.propTypes = {
  // The delivery object containing all the attributes of a delivery
  delivery: PropTypes.object.isRequired,
  // Will be used to goBack on the signoffs not just back to the delivery screen
  stepCounter: PropTypes.number.isRequired,
  // Function to update the stepCounter state
  setStepCounter: PropTypes.func.isRequired
}

export default SignoffSignature
