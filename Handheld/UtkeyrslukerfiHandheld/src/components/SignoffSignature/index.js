import React, { useEffect, useRef } from 'react'
import { View, ToastAndroid, Text } from 'react-native'
import Signature from 'react-native-signature-canvas'
import BasicButton from '../../components/BasicButton'
import styles from '../../styles/signoffSignature'
import { EAzureBlobStorageFile } from 'react-native-azure-blob-storage'
import { REACT_APP_STORAGE_KEY } from '@env'
import * as FileSystem from 'react-native-fs'

// Signoff Signature, gets receivers signature during delivery
const SignoffSignature = ({ delivery, stepCounter, setStepCounter }) => {
  const canvasRef = useRef()

  // Set the correct configuration for the blob storage
  useEffect(() => {
    (async () => {
      await EAzureBlobStorageFile.configure(
        'utkeyrslukerfistorage',
        REACT_APP_STORAGE_KEY,
        'signatures'
      )
    })()
  }, [])

  const handleEmpty = () => { ToastAndroid.showWithGravity('Undirskrift vantar.', ToastAndroid.LONG, ToastAndroid.TOP) }

  const handleClear = () => { canvasRef.current.clearSignature() }

  const handleConfirm = () => { canvasRef.current.readSignature() }

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
      ToastAndroid.showWithGravity('Ekki náðist að hlaða inn myndinni á skýjið', ToastAndroid.LONG, ToastAndroid.TOP)
    }
  }

  // Save the signature
  const continueWithDelivery = async (signature) => {
    // Set file name
    const fileName = await saveSignature(signature)
    delivery.signoffSignatureURI = fileName

    // Mark SignoffSignature as done (0)
    setStepCounter(stepCounter ^ 4)
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

export default SignoffSignature
