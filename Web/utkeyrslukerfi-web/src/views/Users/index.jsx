import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import { getUsers } from '../../actions/userActions'
import User from '../../components/User'

const Users = ({ getUsers, users }) => {
  useEffect(() => {
    getUsers()
  }, [])

  return (
    <div className='users'>
      {users.map(u =>
        <User
          key={u.id}
          name={u.name}
          email={u.email}
          role={u.role}
        />)}
    </div>
  )
}

const mapStateToProps = reduxStoreState => {
  return {
    users: reduxStoreState.users
  }
}

export default connect(mapStateToProps, { getUsers })(Users)
