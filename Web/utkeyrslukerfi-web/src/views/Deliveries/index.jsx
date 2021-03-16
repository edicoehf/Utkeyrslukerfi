import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import { getDeliveries } from '../../actions/deliveryActions'
import Delivery from '../../components/Delivery'

const Deliveries = ({ getDeliveries, deliveries }) => {
	useEffect(() => {
		getDeliveries()
	}, [])
	const renderRows = () => {
		return deliveries.map(function(obj, id) {
			return (
				<tr key={id} onClick={() => console.log("navigate to item")}>
					<td>{obj.id}</td>
					<td>{obj.status}</td>
					<td>{obj.recipient}</td>
					<td>{obj.seller}</td>
					<td>{obj.driver.name}</td>
					<td>{obj.deliveryAddress.streetName} {obj.deliveryAddress.houseNumber}</td>
					<td>{obj.pickupAddress.streetName} {obj.pickupAddress.houseNumber}</td>
				</tr>
			)
		})
	}
	return (
		<div className='deliveries'>
        <table className="table">
          <thead className="thead-dark">
            <tr>
              <th>
                ID
              </th>
							<th>
                Status
              </th>
              <th>
                Recepient
              </th>
							<th>
                Seller
              </th>
							<th>
                Driver
              </th>
							<th>
                Delivery Address
              </th>
							<th>
                Pickup Address
              </th>
            </tr>
          </thead>
          <tbody>
            {renderRows()}
          </tbody>
        </table>
        <hr/>
		</div>
	)
}

const mapStateToProps = reduxStoreState => {
	return {
		deliveries: reduxStoreState.deliveries
	}
}



export default connect(mapStateToProps, { getDeliveries })(Deliveries)
