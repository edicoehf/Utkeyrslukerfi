import React from 'react'
import { Text, TextInput } from 'react-native'
import styles from '../../styles/commentBox'

// For drivers to insert a comment about deliveries
const CommentBox = ({ label, editable, comment, setComment }) => {
  return (
    <>
      <Text style={styles.label}>{label}</Text>
      <TextInput
        placeholder='Athugasemd...'
        style={editable ? styles.commentBox : styles.commentBoxDisabled}
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
