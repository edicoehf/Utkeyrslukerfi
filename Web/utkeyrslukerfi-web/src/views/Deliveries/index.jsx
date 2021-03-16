import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import { getDeliveries } from '../../actions/deliveryActions'
import Deliveries from '../../components/Deliveries'

const Deliveries = ({ getDeliveries, deliveries }) => {
  useEffect(() => {
    getDeliveries()
  }, [])

  return (
    <div className='deliveries'>
      {deliveries.map(d =>
        <Deliveries />)}
    </div>
  )
}

const mapStateToProps = reduxStoreState => {
  return {
    users: reduxStoreState.deliveries
  }
}

export default connect(mapStateToProps, { getDeliveries })(Deliveries)