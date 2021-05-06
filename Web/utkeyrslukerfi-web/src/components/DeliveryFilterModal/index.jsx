import React, { useState } from 'react'
import Modal from 'react-modal'
import config from '../../constants/config.json'
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'
import { isWithinInterval } from 'date-fns'
import configData from '../../constants/config.json'

const customStyles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    width: '50%',
    height: '50%',
    transform: 'translate(-50%, -50%)'
  }
}

const UserFilterModal = ({ visible, deliveries, setDeliveries, deliveryState, updateModalState }) => {
  Modal.setAppElement('#root')
  const [status, setStatus] = useState('')
  const [startDate, setStartDate] = useState(new Date(Date.now() - (6.048e+8)))
  const [endDate, setEndDate] = useState(new Date(Date.now() + (6.048e+8 * 2)))

  function getIDByStatus(status) {
    return Object.keys(config.STATUS).find(key => config.STATUS[key] === status)
  }

  const filter = () => {
    updateModalState()
    setDeliveries([])
    setDeliveries(deliveries.filter(d => isWithinInterval(new Date(d.deliveryDate), { start: startDate, end: endDate })))
    if (status !== '') {
      setDeliveries(deliveryState => deliveryState.filter(d => d.status === parseInt(getIDByStatus(status))))
    }
  }

  const clearFilter = () => {
    setDeliveries(deliveries)
    updateModalState()
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
          <div className='row pb-3'>
            <div className='col float-right'>
              <p className='my-auto'>Staða</p>
            </div>
            <div className='col align-self-center'>
              <select id='status' name='status' onChange={event => setStatus(event.target.value)}>
                {Object.keys(configData.STATUS).map(function (key) {
                  return (
                    <option key={key} value={key}>{configData.STATUS[key]}</option>
                  )
                })}
              </select>
            </div>
          </div>
          <div className='row'>
            <div className='col pb-3'>
              <p className='my-auto'>Frá</p>
            </div>
            <div className='col align-self-start'>
              <DatePicker
                selected={startDate}
                onChange={date => setStartDate(date)}
                selectsStart
                startDate={startDate}
                endDate={endDate}
              />
            </div>
          </div>
          <div className='row'>
            <div className='col align-self-start'>
              <p className='my-auto'>Til</p>
            </div>
            <div className='col align-self-start'>
              <DatePicker
                selected={endDate}
                onChange={date => {
                  date.setMinutes(date.getMinutes() + 30)
                  setEndDate(date)
                }}
                selectsEnd
                startDate={startDate}
                endDate={endDate}
                minDate={startDate}
              />
            </div>
          </div>
        </form>
        <div className='row pt-3'>
          <div className='col'>
            <button className='btn btn-primary' onClick={filter}>Filter</button>
          </div>
          <div className='col align-self-end'>
            <button onClick={clearFilter} className='btn btn-outline-warning float-right mx-2'>Hreinsa síu</button>
          </div>
        </div>
      </Modal>
    )
  }
  return null
}

export default UserFilterModal
