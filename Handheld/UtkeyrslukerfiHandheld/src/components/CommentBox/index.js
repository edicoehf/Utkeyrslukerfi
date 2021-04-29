import React from 'react'
import { Text, TextInput } from 'react-native'

// Form to search for, delivery or add delivery to a table
const CommentBox = ({ label, editable, comment, setComment }) => {
  return (
    <>
      <Text>{label}</Text>
      <TextInput
        multiline
        editable={editable}
        numberOfLines={4}
        defaultValue={comment}
        onChangeText={(text) => setComment(text)}
      />
    </>
  )
}

export default CommentBox
