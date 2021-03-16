import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import { getDeliveries } from '../../actions/deliveryActions'
import Delivery from '../../components/Delivery'

const Deliveries = ({ getDeliveries, deliveries }) => {
    useEffect(() => {
        getDeliveries()
    }, [getDeliveries, deliveries])
    return (
        <div className='deliveries'>
            {deliveries.map(d =>
                <Delivery
                    key={d.deliveryId}
                    recipient={d.recipient}
                    seller={d.seller}
                    driverComment={d.driverComment}
                    customerComment={d.customerComment}
                    status={d.status}
                />)}
        </div>
    )
}

const mapStateToProps = reduxStoreState => {
    return {
        deliveries: reduxStoreState.deliveries
    }
}

export default connect(mapStateToProps, getDeliveries)(Deliveries)
