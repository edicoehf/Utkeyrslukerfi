import React, { useEffect } from 'react'
import { useHistory } from 'react-router-dom'
import { connect } from 'react-redux'
import { getUsers } from '../../actions/usersActions'

const Users = ({ getUsers, users }) => {
  const history = useHistory()

  useEffect(() => {
    getUsers()
  }, [])

  const navigateToDelivery = (obj) => {
    history.push(`/users/${obj.id}`, { params: obj })
  }

  const renderRows = () => {
    return users.map(function (obj, id) {
      return (
        <tr key={id} onClick={() => navigateToDelivery(obj)}>
          <td>{obj.id}</td>
          <td>{obj.name}</td>
          <td>{obj.email}</td>
          <td>{obj.role}</td>
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
              Name
            </th>
            <th>
              Email
            </th>
            <th>
              Role
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
    users: reduxStoreState.users
  }
}

export default connect(mapStateToProps, { getUsers })(Users)
