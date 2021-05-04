import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useLocation, useParams } from 'react-router-dom'
import { setViewingPackage, getViewingPackage } from '../../actions/packageActions'

const Package = () => {
  const location = useLocation()
  const { id, delid } = useParams()
  const token = useSelector(({ login }) => login.token)
  const viewingPackage = useSelector(({ pack }) => pack)
  const dispatch = useDispatch()

  useEffect(() => {
    if (location) {
      const pack = location.state.params
      dispatch(setViewingPackage(pack))
    } else {
      dispatch(getViewingPackage(token, id, delid))
    }
  }, [])

  return ( // TODO: Style
    <>
      <div className='col col-md-6 border mt-2 px-auto pt-1'>
        <p>ID/Barcode: {viewingPackage.id}</p>
        <p>Weight: {viewingPackage.weight}</p>
        <p>Width: {viewingPackage.width}</p>
        <p>Length: {viewingPackage.length}</p>
        <p>Height: {viewingPackage.height}</p>
      </div>
    </>
  )
}

export default Package
