import React, { useState, useEffect } from 'react'
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

const UserFilterModal = ({ visible, deliveries, setDeliveries, updateModalState }) => {
  Modal.setAppElement('#root')
  const [status, setStatus] = useState('')

  function getIDByStatus (status) {
    return Object.keys(config.STATUS).find(key => config.STATUS[key] === status)
  }

  const filter = () => {
    updateModalState()
    // if (role === '') {
    //   setUsers(users)
    //   return
    // }
    // setUsers(_.filter(users, user => user.role == getIDByRole(role)))
    // setRole('')
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
        <h2>Sía sendingar</h2>
        <form onSubmit={submitHandler}>
          {/* <label>
            Starf:
            <input type='text' onChange={event => setRole(event.target.value)} name='role' />
          </label> */}
        </form>
        <button className='btn btn-primary' onClick={filter}>Filter</button>
        <button onClick={updateModalState} className='btn btn-outline-warning'>Close</button>
      </Modal>
    )
  }
  return null
}

export default UserFilterModal
