import React, { useEffect } from 'react'
import { useHistory } from 'react-router-dom'
import { connect } from 'react-redux'
import { getUsers } from '../../actions/usersActions'

const Users = ({ getUsers, users, token }) => {
  const history = useHistory()

  useEffect(() => {
    if (token) {
      getUsers(token)
    }
  }, [token])

  const navigateToUser = (user) => {
    history.push(`/users/${user.id}`, { params: user })
  }

  const renderRows = () => {
    return users.map(function (user, id) {
      return (
        <tr key={id} onClick={() => navigateToUser(user)}>
          <td>{user.id}</td>
          <td>{user.name}</td>
          <td>{user.email}</td>
          <td>{user.role}</td>
        </tr>
      )
    })
  }

  return (
    <div className='users'>
      <table className='table'>
        <thead className='thead-dark'>
          <tr>
            <th>
              ID
            </th>
            <th>
              Nafn
            </th>
            <th>
              Netfang
            </th>
            <th>
              Starf
            </th>
          </tr>
        </thead>
        <tbody>
          {renderRows()}
        </tbody>
      </table>
      <hr />
    </div>
  )
}

const mapStateToProps = reduxStoreState => {
  return {
    users: reduxStoreState.users,
    token: reduxStoreState.token
  }
}

export default connect(mapStateToProps, { getUsers })(Users)
