import React, { useState } from 'react'
import { View, Text, ToastAndroid, TextInput, ImageBackground } from 'react-native'
import { launchCamera } from 'react-native-image-picker'
import { useDispatch, useSelector } from 'react-redux'
import { setStep } from '../../actions/signingProcessActions'
import BasicButton from '../../components/BasicButton'

// Let the receiver sign for the delivery
const ImageOnDeliveryScreen = ({ navigation }) => {
  // TODO:
  // - css
  const [name, setName] = useState('')
  const signingProcess = useSelector(({ signingProcess }) => signingProcess)
  const dispatch = useDispatch()
  const [imageSource, setImageSource] = useState(null)

  const continueWithDelivery = () => {
    // TODO: save the image on a server and save the link in the db, get the link for the image from signature.data
    if (!name) {
      ToastAndroid.showWithGravity('Vinsamlegast settu inn nafn móttakanda.', ToastAndroid.LONG, ToastAndroid.TOP)
      return
    }
    if (!imageSource) {
      ToastAndroid.showWithGravity('Vinsamlegast settu inn mynd.', ToastAndroid.LONG, ToastAndroid.TOP)
      return
    }
    console.log(imageSource) // Response =  "file:///data/user/0/com.utkeyrslukerfihandheld/cache/rn_image_picker_lib_temp_62a34ffd-77e1-4929-a7ec-c71f4f24bdf2.jpg"
    const route = signingProcess.process[signingProcess.step]
    dispatch(setStep(2))
    navigation.navigate(route)
  }

  const takeImage = () => { 
    launchCamera({noData: true}, (response) => {
      console.log('Response = ', response); // {"fileName": "rn_image_picker_lib_temp_62a34ffd-77e1-4929-a7ec-c71f4f24bdf2.jpg", "fileSize": 198418, "height": 1280, "type": "image/jpeg", "uri": "file:///data/user/0/com.utkeyrslukerfihandheld/cache/rn_image_picker_lib_temp_62a34ffd-77e1-4929-a7ec-c71f4f24bdf2.jpg", "width": 960}
      if (response.didCancel) {
          console.log('User cancelled image picker');
      } else if (response.error) {
          console.log('ImagePicker Error: ', response.error);
      } else if (response.customButton) {
          console.log('User tapped custom button: ', response.customButton);
      } else {
          const source = response.uri;
          setImageSource(source);
      }
    })
  }

  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>Nafn móttakanda:</Text>
      <TextInput
        onChangeText={setName}
      />
      { !imageSource && <ImageBackground style={{width: 300, height: 300, overflow: 'hidden'}} source={ require('../../images/no_image_available.jpg') } />}
      { imageSource && <ImageBackground style={{width: 300, height: 300, overflow: 'hidden'}} source={ {uri: imageSource} } /> }
      <BasicButton buttonText='Taka mynd' onPressFunction={takeImage} />
      <BasicButton buttonText='Vista' onPressFunction={continueWithDelivery} />
    </View>
  )
}

export default ImageOnDeliveryScreen
