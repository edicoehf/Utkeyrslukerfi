import React from 'react'

const Delivery = ({ deliveryId, recipient, seller, driverComment, customerComment, status }) => {
    return (
        <>
            <p>{deliveryId}</p>
            <p>{recipient}</p>
            <p>{seller}</p>
            <p>{driverComment}</p>
            <p>{customerComment}</p>
            <p>{status}</p>
        </>
    )
}

export default Delivery;