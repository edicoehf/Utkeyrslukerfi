import React, { useState } from 'react'
import Modal from 'react-modal'
import config from '../../constants/config.json'
import _ from 'lodash'

const customStyles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)'
  }
}

const UserFilterModal = ({ visible, users, setUsers, updateModalState }) => {
  Modal.setAppElement('#root')
  const [role, setRole] = useState('')

  function getIDByRole (role) {
    return Object.keys(config.ROLES).find(key => config.ROLES[key] === role)
  }

  const filter = () => {
    updateModalState()
    if (role === '') {
      setUsers(users)
      return
    }
    setUsers(_.filter(users, user => user.role === parseInt(getIDByRole(role))))
    setRole('')
  }

  const submitHandler = (e) => {
    e.preventDefault()
    filter()
  }

  if (visible) {
    return (
      <Modal
        isOpen={visible}
        onRequestClose={updateModalState}
        contentLabel='Test'
        style={customStyles}
      >
        <h2>Sía notendur</h2>
        <form onSubmit={submitHandler}>
          <label>
            Starf:
            <input type='text' onChange={event => setRole(event.target.value)} name='role' />
          </label>
        </form>
        <button className='btn btn-primary' onClick={filter}>Filter</button>
        <button onClick={updateModalState} className='btn btn-outline-warning'>Close</button>
      </Modal>
    )
  }
  return null
}

export default UserFilterModal
