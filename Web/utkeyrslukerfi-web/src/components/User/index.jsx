import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import { useHistory, useParams } from 'react-router-dom'
import { setUser, getUser } from '../../actions/userActions'
import UpdateUserForm from '../UpdateUserForm'

const User = ({ token, user, setUser, getUser }) => {
  const history = useHistory()
  const { id } = useParams()

  useEffect(() => {
    if (history.location.state && history.location.state.params) {
      // To get user from table and skip the url call
      const state = { ...history.location.state }
      const user = state.params
      setUser(user)
      delete state.params
      history.replace({ ...history.location, state })
    } else {
      if (token) {
        getUser(token, id)
      }
    }
  }, [id, token])

  return (
    <>
      <UpdateUserForm user={User} />
    </>
  )
}

const mapStateToProps = reduxStoreState => {
  return {
    token: reduxStoreState.login.token,
    user: reduxStoreState.user
  }
}

export default connect(mapStateToProps, { setUser, getUser })(User)
