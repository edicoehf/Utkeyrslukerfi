import React, { useEffect } from 'react'
import { useHistory } from 'react-router-dom'
import { connect } from 'react-redux'
import { getUsers } from '../../actions/usersActions'
import { BsPencilSquare } from 'react-icons/bs'
import { ImPlus } from 'react-icons/im'
import '../../styles/users.css'

const Users = ({ getUsers, users, token }) => {
  const history = useHistory()

  useEffect(() => {
    if (token) {
      getUsers(token)
    }
  }, [token])

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
          <td><BsPencilSquare size='1.5em' /></td>
        </tr>
      )
    })
  }
  console.log(users)
  return (
    <div className='users'>
      <table className='table table-bordered'>
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
            <th>
              {/* Leave this empty, it's for the edit pen icon */}
            </th>
          </tr>
        </thead>
        <tbody>
          {
            users.length > 0 ? renderRows() : null
          }
          {/* Loading the Add user plus */}
          <tr>
            <td><ImPlus size='2em' /></td>
            <td />
            <td />
            <td />
            <td />
          </tr>
        </tbody>
      </table>
      {
        users.length <= 0
          ? <div className='text-center'>
            <div className='spinner-border' role='status'>
              <span className='sr-only'>Loading...</span>
            </div>
            </div>
          : null
      }
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
