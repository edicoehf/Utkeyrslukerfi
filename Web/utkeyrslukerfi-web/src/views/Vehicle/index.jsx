import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory, useParams } from 'react-router-dom'
import { setViewingVehicle, getViewingVehicle } from '../../actions/vehiclesActions'
import UpdateVehicleForm from '../../components/UpdateVehicleForm'
import '../../styles/user.css'

const Vehicle = () => {
  const history = useHistory()
  const { id } = useParams()
  const token = useSelector(({ login }) => login.token)
  const viewingVehicle = useSelector(({ vehicle }) => vehicle)
  const dispatch = useDispatch()

  useEffect(() => {
    if (history.location.state && history.location.state.params) {
      const state = { ...history.location.state }
      const vehicle = state.params
      dispatch(setViewingVehicle(vehicle))
      delete state.params
      history.replace({ ...history.location, state })
    } else {
      if (token) {
        dispatch(getViewingVehicle(token, id))
      }
    }
    // eslint-disable-next-line
  }, [id, token])

  return (
    <div className="user">
      <UpdateVehicleForm vehicle={viewingVehicle} />
    </div>
  )
}

export default Vehicle
