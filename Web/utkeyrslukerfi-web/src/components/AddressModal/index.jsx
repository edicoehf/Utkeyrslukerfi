import React from 'react'
import Modal from 'react-modal'
import Form from 'react-bootstrap/Form'
import FormGroupInput from '../FormGroupInput'
import FormGroupButton from '../FormGroupButton'
import { useForm, FormProvider } from 'react-hook-form'

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

<<<<<<< HEAD
const AddressModal = ({ canShow, updateModalState, didChange, isDelivery }) => {
  // delivery from the store state
  const delivery = useSelector(({ delivery }) => delivery)
  const dispatch = useDispatch()
  // the address that has to be updates. If it is a delivery address,
  // then set dAddress as delivery address otherwise it will set as pickup address 
  const [dAddres, setDAddress] = useState(isDelivery ? delivery.deliveryAddress : delivery.pickupAddress)
  Modal.setAppElement('#root')
  let subtitle
  function afterOpenModal () {
    subtitle.style.color = '#139ffd'
  }
  // function which will update the state of the delivery when update is clicked
  const updateData = () => {
    if (isDelivery) {
      dispatch(setDelivery({
        ...delivery,
        deliveryAddress: dAddres
      }))
      didChange('delivery')
    } else {
      dispatch(setDelivery({
        ...delivery,
        pickupAddress: dAddres
      }))
      didChange('pickup')
    }
    // will update the state of the modal (from show to hide)
    updateModalState()
=======
const AddressModal = ({ openModal, setOpenModal, address, setAddress }) => {
  const methods = useForm()
  Modal.setAppElement('#root')

  const afterOpenModal = () => {
    methods.setValue('streetname', address.streetName)
    methods.setValue('housenumber', address.houseNumber)
    methods.setValue('city', address.city)
    methods.setValue('zipcode', address.zipCode)
>>>>>>> ddf75552399734b521ad3a5afa8c19cb02f5eeb5
  }

  const submitForm = (data) => {
    address.city = data.city
    address.zipCode = data.zipcode
    address.houseNumber = data.housenumber
    address.streetName = data.streetname
    setAddress(address)
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
          className='form form-horizontal'
        >
          <FormGroupInput
            groupType='streetname'
            label='Götuheiti'
            fieldType='text'
            typeOfForm='UpdateAddress'
          />
          <FormGroupInput
            groupType='housenumber'
            label='Húsnúmer'
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
