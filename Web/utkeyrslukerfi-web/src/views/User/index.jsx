import React, { useEffect } from 'react'
import { connect, useSelector } from 'react-redux'
import { useHistory, useParams } from 'react-router-dom'
import { setViewingUser, getViewingUser } from '../../actions/userActions'
import UpdateUserForm from '../../components/UpdateUserForm'
import '../../styles/user.css'

// Get user and send to update form
const User = ({ setViewingUser, getViewingUser }) => {
  const history = useHistory()
  const { id } = useParams()
  const token = useSelector(({ login }) => login.token)
  const viewingUser = useSelector(({ user }) => user)

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

export default connect(null, { setViewingUser, getViewingUser })(User)
