import React from 'react'
import { Text, TextInput } from 'react-native'
import styles from '../../styles/commentBox'
import PropTypes from 'prop-types'

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

CommentBox.propTypes = {
  // Label for the comment box
  label: PropTypes.string.isRequired,
  // Disable or enable writing into the text box
  editable: PropTypes.bool.isRequired,
  // The state that holds the comment written in the box
  comment: PropTypes.string.isRequired,
  // The function to update the state containing the comment
  setComment: PropTypes.func.isRequired
}

export default CommentBox
