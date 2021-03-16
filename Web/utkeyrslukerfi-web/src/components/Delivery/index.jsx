import React from 'react'
import { useLocation } from "react-router-dom";

const Delivery = () => {
	const location = useLocation();
	const obj = location.state.params;
	const { id, recipient, seller, status } = obj;
	const driver = obj.driver.name;
	const deliveryAddress = `${obj.deliveryAddress.streetName}  ${obj.deliveryAddress.houseNumber}`;
	const pickupAddress = `${obj.pickupAddress.streetName}  ${obj.pickupAddress.houseNumber}`;
	const vehicle = obj.vehicle.licensePlate;

	const updateDelivery = () => {
		// this has to be modified to update the form, instead of displaying data
		console.log("delivery updated")
	}

	return (
		<div className="row align-items-start border rounded shadow">
			<div className="col col-md-6">
				<p>Id: {id}</p>
				<p>Recipient: {recipient}</p>
				<p>States: {status}</p>
				<p>Seller: {seller}</p>
				<p>Driver: {driver}</p>
				<p>DeliveryAddres: {deliveryAddress}</p>
				<p>PickupAddress: {pickupAddress}</p>
				<p>Vehicle: {vehicle}</p>
			</div>
			<div className="col col-md-6 border">
				<p>Packages</p>
				{/* TODO: Add packages here */}
			</div>
			<button onClick={() => updateDelivery()} className="btn btn-outline-info m-4 ml-auto">Vista</button>
		</div>
	)
}

export default Delivery;