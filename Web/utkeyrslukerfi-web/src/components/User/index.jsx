import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import { useHistory, useLocation, useParams } from 'react-router-dom'
import { setViewingUser, getViewingUser } from '../../actions/userActions'
import UpdateUserForm from '../UpdateUserForm'

const User = ({ token, viewingUser, setViewingUser, getViewingUser }) => {
  const history = useHistory()
  const { id } = useParams()

  useEffect(() => {
    if (history.location.state && history.location.state.params) {
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
    <>
      <UpdateUserForm user={viewingUser} />
    </>
  )
}

const mapStateToProps = reduxStoreState => {
  return {
    token: reduxStoreState.token,
    viewingUser: reduxStoreState.user.viewingUser
  }
}

export default connect(mapStateToProps, { setViewingUser, getViewingUser })(User)
