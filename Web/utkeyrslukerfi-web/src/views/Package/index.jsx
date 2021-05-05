import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useLocation, useParams } from 'react-router-dom'
import { setViewingPackage, getViewingPackage } from '../../actions/packageActions'

const Package = () => {
  const { id, delid } = useParams()
  const token = useSelector(({ login }) => login.token)
  const pack = useSelector(({ pack }) => pack)
  const dispatch = useDispatch()
  
  useEffect(() => {
    dispatch(getViewingPackage(token, id, delid))
  })


  return (
    <>
      <div className='col col-md-6 border mt-2 px-auto pt-1'>
        <p>ID/Barcode: {pack.id}</p>
        <p>Weight: {pack.weight}</p>
        <p>Width: {pack.width}</p>
        <p>Length: {pack.length}</p>
        <p>Height: {pack.height}</p>
      </div>
    </>
  )
}

export default Package
