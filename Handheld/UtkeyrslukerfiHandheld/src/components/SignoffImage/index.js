import React, { useState } from 'react'
import { View, Text, ToastAndroid, ImageBackground, TouchableOpacity } from 'react-native'
import { launchCamera } from 'react-native-image-picker'
import BasicButton from '../../components/BasicButton'
import styles from '../../styles/signoffImage'
import FontAwesome from 'react-native-vector-icons/FontAwesome'
import AzureBlobStorage from '../../resources/AzureBlobStorage.class'
import { REACT_APP_STORAGE_KEY } from '@env'
import { AZURE_ACCOUNT_NAME, AZURE_CONTAINER_IMAGES } from '../../constants'

// Signoff Image, gets image of delivery during delivery
const SignoffImage = ({ delivery, stepCounter, setStepCounter }) => {
  const [image, setImage] = useState(null)

  // Save image to azure blob storage
  const saveImageToBlobStorage = async () => {
    try {
      // Initialize blob service
      const blobService = new AzureBlobStorage({
        account: AZURE_ACCOUNT_NAME,
        container: AZURE_CONTAINER_IMAGES,
        key: REACT_APP_STORAGE_KEY
      })
      // Upload image to Azure cloud storage
      const fileName = await blobService.createBlockBlob(image, image.fileName)
      return fileName
    } catch (error) {
      ToastAndroid.showWithGravity('Ekki náðist að flytja myndina upp í skýið', ToastAndroid.LONG, ToastAndroid.TOP)
    }
  }

  // Continue to next step after saving image to cloud and adding new image uri to delivery object
  const continueWithDelivery = async () => {
    if (!image) {
      ToastAndroid.showWithGravity('Vinsamlegast settu inn mynd', ToastAndroid.LONG, ToastAndroid.TOP)
      return
    }
    // Save image to cloud
    const fileName = await saveImageToBlobStorage()

    if (fileName) {
      delivery.signoffImageURI = image.fileName

      // Mark SignoffImage as done (0)
      setStepCounter(stepCounter ^ 2)
    }
  }

  // Activate image picker, launch camera so user can take images
  const takeImage = () => {
    launchCamera({ noData: true }, (response) => {
      if (!response.didCancel) {
        setImage(response)
      }
    })
  }

  // Get relevant image, show default if no image has been taken
  const getImage = () => {
    if (image) {
      return <ImageBackground style={styles.image} source={{ uri: image.uri }} />
    }
    return <ImageBackground style={styles.image} source={require('../../images/no_image_available.jpg')} />
  }

  return (
    <>
      <Text style={styles.label}>Mynd af sendingu:</Text>
      {getImage()}
      <View style={styles.buttonContainer}>
        <TouchableOpacity onPress={takeImage}>
          <FontAwesome name='camera' style={{ width: 26 - 32 }} color='#333' size={35} />
        </TouchableOpacity>
        <BasicButton buttonText='Vista' onPressFunction={continueWithDelivery} />
      </View>
    </>
  )
}

export default SignoffImage
