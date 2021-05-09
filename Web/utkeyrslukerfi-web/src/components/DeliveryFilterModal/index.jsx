import React, { useState, useEffect } from 'react'
import Modal from 'react-modal'
import config from '../../constants/config.json'
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'
import { isWithinInterval } from 'date-fns'
import FormGroupDropdown from '../FormGroupDropdown'
import FormGroupButton from '../FormGroupButton'
import Form from 'react-bootstrap/Form'
import { useForm, FormProvider } from 'react-hook-form'

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


  const filter = (e) => {
    updateModalState()
    setDeliveries([])
    setDeliveries(deliveries.filter(d => isWithinInterval(new Date(d.deliveryDate), { start: startDate, end: endDate })))
    if (status !== '') {
      setDeliveries(deliveryState => deliveryState.filter(d => d.status === parseInt(status)))
    }
  }

  const clearFilter = () => {
    setDeliveries(deliveries)
    updateModalState()
  }

  useEffect(() => {
    methods.setValue('status', deliveryState)
  })

  useEffect(() => {
    methods.setValue('status', status)
  }, [status, methods])

  // console.log(status)
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
          <Form onSubmit={methods.handleSubmit(filter)} className='form form-horizontal'>
            <div className='row pb-3'>
              <div className='col align-self-center'>
                <FormGroupDropdown
                  groupType='status'
                  label='Staða'
                  options={
                    <>
                      <option value={''}>{''}</option>
                      {Object.keys(config.STATUS).map(function (key) {
                        return (
                          <option key={key} value={key}>{config.STATUS[key]}</option>
                        )
                      })}
                    </>
                  }
                  typeOfForm='UserFilterModal'
                  setState={setStatus}
                />
              </div>
            </div>
            <div className='row pb-3'>
              <div className='col pb-3'>
                <span className='my-auto'>Frá:</span>
              </div>
              <div className='col-sm-8 align-self-start'>
                <DatePicker
                  selected={startDate}
                  onChange={date => setStartDate(date)}
                  selectsStart
                  startDate={startDate}
                  endDate={endDate}
                  className="custom-select"
                />
              </div>
            </div>
            <div className='form-group row'>
              <div className='col align-self-start'>
                <p className='my-auto'>Til:</p>
              </div>
              <div className='col-sm-8 align-self-start'>
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
                  className="custom-select"
                />
              </div>
            </div>
            <div className='row pt-3'>
              <div className='col'>
                <FormGroupButton className='btn btn-primary' onClick={filter} label='Sía' />
              </div>
              <div className='col align-self-end'>
                <FormGroupButton onClick={clearFilter} className='btn btn-outline-warning float-right mx-2'  label='Hreinsa' />
              </div>
            </div>
          </Form>
        </FormProvider>
      </Modal>
    )
  }
  return null
}

export default UserFilterModal
