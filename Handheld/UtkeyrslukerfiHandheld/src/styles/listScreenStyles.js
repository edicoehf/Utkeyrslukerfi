import { StyleSheet } from 'react-native'

export default StyleSheet.create({
  touchableOpacityStyle: {
    position: 'absolute',
    width: 40,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
    right: 30,
    bottom: 30,
    backgroundColor: 'lightblue',
    borderRadius: 30
  },
  floatingButtonStyle: {
    width: 12,
    height: 11,
    transform: [
      { scaleX: 2.5 },
      { scaleY: 2.5 }
    ]
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: '#e5e5e5'
  }
})
