import React from 'react'

const Delivery = ({ deliveryId, recipient, seller, driverComment, customerComment, status }) => {
	return (
		<>
			<p>{deliveryId} {recipient} {seller} {driverComment} {customerComment} {status} </p>
		</>
	)
}

export default Delivery;