import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { setViewingDelivery } from '../../actions/deliveryActions'
import Modal from 'react-modal'
import Form from 'react-bootstrap/Form'
import FormGroupInput from '../FormGroupInput'
import FormGroupButton from '../FormGroupButton'
import FormGroupDropdown from '../FormGroupDropdown'
import { useForm, FormProvider } from 'react-hook-form'

const customStyles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
  }
}

const AddressModal = ({ openModal, setOpenModal, address, setAddress }) => {
  const dispatch = useDispatch()
  const methods = useForm()
  Modal.setAppElement('#root')

  const afterOpenModal = () => {
    methods.setValue('streetname', address.streetName)
    methods.setValue('housenumber', address.houseNumber)
    methods.setValue('city', address.city)
    methods.setValue('zipcode', address.zipCode)
  }

  const submitForm = (data) => {
    address.city = data.city
    address.zipCode = data.zipcode
    address.houseNumber = data.housenumber
    address.streetName = data.streetname
    console.log(address);
    setAddress(address);
    setOpenModal(false)
  }
    return (
      <Modal
        isOpen={openModal}
        onAfterOpen={afterOpenModal}
        onRequestClose={() => setOpenModal(false)}
        style={customStyles}
      >
        <FormProvider {...methods}>
          <Form
            onSubmit={methods.handleSubmit(submitForm)}
            className='form form-horizontal'>
            <FormGroupInput
              groupType='streetname'
              label='Götu Nafn'
              fieldType='text'
              typeOfForm='UpdateAddress'
            />
            <FormGroupInput
              groupType='housenumber'
              label='Hús Númer'
              fieldType='text'
              typeOfForm='UpdateAddress'
            />
            <FormGroupInput
              groupType='city'
              label='Sveitarfélag'
              fieldType='text'
              typeOfForm='UpdateAddress'
            />
            <FormGroupInput
              groupType='zipcode'
              label='Póstnúmer'
              fieldType='text'
              typeOfForm='UpdateAddress'
            />
            <FormGroupButton
              label='Vista'
              typeOfForm='UpdateAddress'
            />
          </Form>
        </FormProvider>
      </Modal>
    )
}

export default AddressModal
