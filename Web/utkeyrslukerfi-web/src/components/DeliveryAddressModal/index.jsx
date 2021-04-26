import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { setDelivery } from '../../actions/deliveryActions'
import Modal from 'react-modal'


const customStyles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)'
  }
};

const DeliveryAddressModal = ({ canShow, updateModalState }) => {
  const delivery = useSelector(({ delivery }) => delivery)
  const dispatch = useDispatch()
  const [dAddres, setDAddress] = useState(delivery.deliveryAddress)
  Modal.setAppElement('#root')
  let subtitle;
  function afterOpenModal() {
    subtitle.style.color = '#139ffd';
  }

  const updateData = () => {
    dispatch(setDelivery({
      ...delivery,
      deliveryAddress: dAddres
    }))
    updateModalState()
  }

  if (canShow) {
    return (
      <Modal
        isOpen={canShow}
        onAfterOpen={afterOpenModal}
        onRequestClose={updateModalState}
        contentLabel="Delivery Address Modal"
        style={customStyles}
      >
        <h2 ref={_subtitle => (subtitle = _subtitle)}>Update Delivery Address</h2>
        <button onClick={updateModalState} className="btn btn-outline-warning">Close</button>
        <form>
          <div className="row">
            <label className="mx-3 my-3">Street Name</label><input className='border-none my-3 ml-auto' type='text' name='streetName' onChange={e => setDAddress(state => ({ ...state, streetName: e.target.value }))} defaultValue={dAddres.streetName} />
          </div>
          <div className="row">
            <label className="mx-3 my-3">House Number</label><input className='border-none my-3 ml-auto' type='text' name='houseNumber' onChange={e => setDAddress(state => ({ ...state, houseNumber: e.target.value }))} defaultValue={dAddres.houseNumber} />
          </div>
        </form>
        <button className="btn btn-primary" onClick={updateData}>Update</button>
      </Modal>
    )
  }
  return null;
}

export default DeliveryAddressModal