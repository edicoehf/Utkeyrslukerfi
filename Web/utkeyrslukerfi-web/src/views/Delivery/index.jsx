import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory, useParams } from 'react-router-dom'
import { setViewingDelivery, getViewingDelivery } from '../../actions/deliveryActions'
import UpdateDeliveryForm from '../../components/UpdateDeliveryForm'

// Get user and send to update form
const Delivery = () => {
  const history = useHistory()
  const { id } = useParams()
  const token = useSelector(({ login }) => login.token)
  const viewingDelivery = useSelector(({ delivery }) => delivery)
  const dispatch = useDispatch()

  useEffect(() => {
    if (history.location.state && history.location.state.params) {
      // To get delivery from table and skip the url call
      const state = { ...history.location.state }
      const delivery = state.params
      dispatch(setViewingDelivery(delivery))
      delete state.params
      history.replace({ ...history.location, state })
    } else {
      if (token) {
        dispatch(getViewingDelivery(token, id))
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id, token])

  return (
    <div>
      <UpdateDeliveryForm delivery={viewingDelivery} />
    </div>
  )
}

export default Delivery
