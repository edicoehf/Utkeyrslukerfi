import React, { useState } from 'react'
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

const PickupAddressModal = ({ canShow, updateModalState, dataObj, onUpdatePickupAddress }) => {
  const [pickupAddress, setPickupAddress] = useState(dataObj)
  Modal.setAppElement('#root')
  let subtitle;
  function afterOpenModal() {
    subtitle.style.color = '#139ffd';
  }

  const updateData = () => {
    onUpdatePickupAddress(pickupAddress)
    updateModalState()
  }

  if (canShow) {
    return (
      <Modal
        isOpen={canShow}
        onAfterOpen={afterOpenModal}
        onRequestClose={updateModalState}
        contentLabel="Pickup Address Modal"
        style={customStyles}
      >
        <h2 ref={_subtitle => (subtitle = _subtitle)}>Update Pickup Address</h2>
        <button onClick={updateModalState} className="btn btn-outline-warning">Close</button>
        <form>
          <div className="row">
            <label className="mx-3 my-3">Street Name</label><input className='border-none my-3 ml-auto' type='text' name='streetName' onChange={e => setPickupAddress(state => ({ ...state, streetName: e.target.value }))} defaultValue={pickupAddress.streetName} />
          </div>
          <div className="row">
            <label className="mx-3 my-3">House Number</label><input className='border-none my-3 ml-auto' type='text' name='houseNumber' onChange={e => setPickupAddress(state => ({ ...state, houseNumber: e.target.value }))} defaultValue={pickupAddress.houseNumber} />
          </div>
        </form>
        <button className="btn btn-primary" onClick={updateData}>Update</button>
      </Modal>
    )
  }
  return null;
}

export default PickupAddressModal