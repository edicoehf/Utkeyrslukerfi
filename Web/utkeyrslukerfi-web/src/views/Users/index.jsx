import React, { useEffect, useState } from 'react'
import { useHistory } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { getUsers } from '../../actions/usersActions'
import { BsPencilSquare, BsFunnel } from 'react-icons/bs'
import { ImPlus } from 'react-icons/im'
import configData from '../../constants/config.json'
import '../../styles/users.css'
import UserFilterModal from '../../components/UserFilterModal'

// Users - display all users in a table
const Users = () => {
  const history = useHistory()
  const token = useSelector(({ login }) => login.token)
  const users = useSelector(({ users }) => users)
  const [userState, setUserState] = useState([])
  const [filterModal, setFilterModel] = useState(false)
  const dispatch = useDispatch()

  const toggleModal = () => {
    setFilterModel(state => !state)
  }

  useEffect(() => {
    if (token) {
      dispatch(getUsers(token))
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [token])

  useEffect(() => {
    setUserState(users)
  }, [users])

  const navigateToUser = (user) => {
    history.push(`/users/${user.id}`, { params: user })
  }

  const navigateToCreateUser = () => {
    history.push('/users/create')
  }

  const renderRows = () => {
    return userState.map(function (user, id) {
      return (
        <tr key={id}>
          <td>{user.id}</td>
          <td>{user.name}</td>
          <td>{user.email}</td>
          <td>{configData.ROLES[user.role]}</td>
          <td onClick={() => navigateToUser(user)} className='clickable'><BsPencilSquare size='1.5em' /></td>
        </tr>
      )
    })
  }
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
            <th onClick={toggleModal} className='clickable'>
              {/* Edit pen icon */}
              <BsFunnel size='2em' color='white' />
            </th>
          </tr>
        </thead>
        <tbody>
          {/* Loading the Add user plus */}
          {
            users.length > 0 ? renderRows() : null
          }
          <tr>
            <td onClick={() => navigateToCreateUser()}><ImPlus size='2em' className='clickable' /></td>
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
      <UserFilterModal visible={filterModal} users={users} setUsers={setUserState} updateModalState={toggleModal} />
    </div>
  )
}

export default Users
