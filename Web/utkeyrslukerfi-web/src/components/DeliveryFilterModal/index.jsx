import React, { useState, useEffect } from 'react'
import Modal from 'react-modal'
import config from '../../constants/config.json'
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'
import { isWithinInterval } from 'date-fns'
import FormGroupDropdown from '../FormGroupDropdown'
import Form from 'react-bootstrap/Form'
import { useForm, FormProvider } from 'react-hook-form'
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
  const methods = useForm()

  function getIDByStatus(status) {
    return Object.keys(config.STATUS).find(key => config.STATUS[key] === status)
  }

  const filter = (e) => {
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

  useEffect(() => {
    methods.setValue('status', deliveryState)
  })

  if (visible) {
    return (
      <Modal
        isOpen={visible}
        onRequestClose={updateModalState}
        contentLabel='Test'
        style={customStyles}
      >
        <h2>Sía sendingar</h2>
        <FormProvider {...methods}>
          <Form onSubmit={methods.handleSubmit(submitHandler)}>
            <div className='row pb-3'>
              <div className='col align-self-center'>
                <FormGroupDropdown
                  groupType='status'
                  label='Staða'
                  options={
                    <>
                      {Object.keys(configData.STATUS).map(function (key) {
                        return (
                          <option key={key} value={key}>{configData.STATUS[key]}</option>
                        )
                      })}
                    </>
                  }
                  typeOfForm='UserFilterModal'
                />
              </div>
            </div>
            <div className='row'>
              <div className='col pb-3'>
                <span className='my-auto'>Frá</span>
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
          </Form>
        </FormProvider>
        <div className='row pt-3'>
          <div className='col'>
            <button className='btn btn-primary' onClick={filter}>Sía</button>
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
