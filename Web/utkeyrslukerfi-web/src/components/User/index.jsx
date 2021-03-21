import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import { useLocation, useParams } from 'react-router-dom'
import { setViewingUser, getViewingUser } from '../../actions/userActions'

const User = ({ token, viewingUser, setViewingUser, getViewingUser }) => {
  const location = useLocation()
  const id = useParams()
  useEffect(() => {
    if (location) {
      const user = location.state.params
      setViewingUser(user)
    } else {
      getViewingUser(token, id)
    }
  }, [])

  return (
    <>
      <p>{viewingUser.name}</p>
      <p>{viewingUser.email}</p>
      <p>{viewingUser.role}</p>
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
