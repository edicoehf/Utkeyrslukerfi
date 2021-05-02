import React from 'react'
import { Text, TextInput } from 'react-native'
import styles from '../../styles/commentBox'

// Form to search for, delivery or add delivery to a table
const CommentBox = ({ label, editable, comment, setComment }) => {
  return (
    <>
      <Text style={styles.label}>{label}</Text>
      <TextInput
        placeholder='Athugasemd...'
        style={styles.commentBox}
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
