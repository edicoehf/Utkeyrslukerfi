import React, { useState } from 'react'
import Modal from 'react-modal'
import config from '../../constants/config.json'
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'
import { isWithinInterval } from 'date-fns'

const customStyles = {
  content: {
    // top: '50%',
    // left: '50%',
    // right: 'auto',
    // bottom: 'auto',
    // marginRight: '-50%',
    // transform: 'translate(-50%, -50%)'
  }
}

const UserFilterModal = ({ visible, deliveries, setDeliveries, deliveryState, updateModalState }) => {
  Modal.setAppElement('#root')
  const [status, setStatus] = useState('')
  const [startDate, setStartDate] = useState(new Date(Date.now() - (6.048e+8)))
  const [endDate, setEndDate] = useState(new Date(Date.now() + (6.048e+8 * 2)))

  function getIDByStatus (status) {
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
          <label>Staða:
            <select id='status' name='status' onChange={event => setStatus(event.target.value)}>
              <option value='' />
              <option value='Í ferli'>Í ferli</option>
              <option value='Á leiðinni'>Á leiðinni</option>
              <option value='Móttekin'>Móttekin</option>
              <option value='Týnd'>Týnd</option>
            </select>
          </label>
          <DatePicker
            selected={startDate}
            onChange={date => setStartDate(date)}
            selectsStart
            startDate={startDate}
            endDate={endDate}
          />
          <DatePicker
            selected={endDate}
            onChange={date => setEndDate(date)}
            selectsEnd
            startDate={startDate}
            endDate={endDate}
            minDate={startDate}
          />
        </form>
        <button className='btn btn-primary' onClick={filter}>Filter</button>
        <button onClick={clearFilter} className='btn btn-outline-warning'>Hreinsa síu</button>
      </Modal>
    )
  }
  return null
}

export default UserFilterModal
