import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import { useHistory, useParams } from 'react-router-dom'
import { setViewingUser, getViewingUser } from '../../actions/userActions'
import UpdateUserForm from '../../components/UpdateUserForm'
import '../../styles/user.css'

// Get user and send to update form
const User = ({ token, viewingUser, setViewingUser, getViewingUser }) => {
  const history = useHistory()
  const { id } = useParams()

  useEffect(() => {
    if (history.location.state && history.location.state.params) {
      // To get user from table and skip the url call
      const state = { ...history.location.state }
      const user = state.params
      setViewingUser(user)
      delete state.params
      history.replace({ ...history.location, state })
    } else {
      if (token) {
        getViewingUser(token, id)
      }
    }
  }, [id, token])

  return (
    <div className='user'>
      <UpdateUserForm user={viewingUser} />
    </div>
  )
}

const mapStateToProps = reduxStoreState => {
  return {
    token: reduxStoreState.login.token,
    viewingUser: reduxStoreState.user
  }
}

export default connect(mapStateToProps, { setViewingUser, getViewingUser })(User)
