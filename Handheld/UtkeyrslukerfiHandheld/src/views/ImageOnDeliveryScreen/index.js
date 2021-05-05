import React, { useEffect, useState } from 'react'
import { View, Text, ToastAndroid, TextInput, ImageBackground, TouchableOpacity } from 'react-native'
import { launchCamera } from 'react-native-image-picker'
import { useSelector } from 'react-redux'
import BasicButton from '../../components/BasicButton'
import styles from '../../styles/imageOnDeliveryScreen'
import FontAwesome from 'react-native-vector-icons/FontAwesome'
import { EAzureBlobStorageFile } from 'react-native-azure-blob-storage'
import { REACT_APP_STORAGE_KEY } from '@env'
import deliveryService from '../../services/deliveryService'

// Let the receiver sign for the delivery
const ImageOnDeliveryScreen = ({ route, navigation }) => {
  const [name, setName] = useState('')
  const signingProcess = useSelector(({ signingProcess }) => signingProcess)
  const [image, setImage] = useState(null)
  const token = useSelector(({ login }) => login.token)
  const { delivery } = route.params

  useEffect(() => {
    (async () => {
      await EAzureBlobStorageFile.configure(
        'utkeyrslukerfistorage',
        REACT_APP_STORAGE_KEY,
        'images'
      )
    })
  }, [])

  const updateDelivery = async () => {
    try {
      delivery.signoffImageURI = image.name // Update delivery
      const res = await deliveryService.updateDelivery(token, delivery)
      console.log(res)
    } catch (err) {
      console.log(err)
    }
  }

  const saveImageToBlobStorage = async () => {
    // TODO: error catch and error messages to user
    try {
      const name = await EAzureBlobStorageFile.uploadFile({
        filePath: image.uri,
        contentType: image.type,
        fileName: image.fileName
      })
      console.log(name)
    } catch (error) {
      console.log(error)
    }
  }

  // Continue to next step after saving image to cloud adding new image uri to delivery
  const continueWithDelivery = async () => {
    if (!name) {
      ToastAndroid.showWithGravity('Vinsamlegast settu inn nafn móttakanda.', ToastAndroid.LONG, ToastAndroid.TOP)
      return
    }
    if (!image) {
      ToastAndroid.showWithGravity('Vinsamlegast settu inn mynd.', ToastAndroid.LONG, ToastAndroid.TOP)
      return
    }
    console.log(image)
    // Save image to cloud
    await saveImageToBlobStorage()

    // Update delivery in db so url to image is saved
    await updateDelivery() // TODO: where should we update delivery
    const route = signingProcess.process[signingProcess.step]
    navigation.navigate(route)
  }

  const takeImage = () => {
    launchCamera({ noData: true }, (response) => {
      console.log('Response = ', response)
      if (response.didCancel) {
        console.log('User cancelled image picker')
      } else if (response.error) {
        console.log('ImagePicker Error: ', response.error)
      } else if (response.customButton) {
        console.log('User tapped custom button: ', response.customButton)
      } else {
        setImage(response)
      }
    })
  }

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Nafn móttakanda:</Text>
      <TextInput
        style={styles.input}
        onChangeText={setName}
        defaultValue={delivery.recipient}
      />
      {!image && <ImageBackground style={styles.image} source={require('../../images/no_image_available.jpg')} />}
      {image && <ImageBackground style={styles.image} source={{ uri: image.uri }} />}
      <View style={styles.buttonContainer}>
        <TouchableOpacity onPress={takeImage}>
          <FontAwesome name='camera' style={{ width: 26 - 32 }} color='#333' size={35} />
        </TouchableOpacity>
        <BasicButton buttonText='Vista' onPressFunction={continueWithDelivery} />
      </View>
    </View>
  )
}

export default ImageOnDeliveryScreen
