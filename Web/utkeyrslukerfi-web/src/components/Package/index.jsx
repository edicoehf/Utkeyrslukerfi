import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import { useLocation, useParams } from 'react-router-dom'
import { setViewingPackage, getViewingPackage } from '../../actions/packageActions'

const Package = ({ token, viewingPackage, setViewingPackage, getViewingPackage }) => {
  const location = useLocation()
  const id = useParams()
  useEffect(() => {
    if (location) {
      const pack = location.state.params
      setViewingPackage(pack)
    } else {
      getViewingPackage(token, id.id, id.delid)
    }
  }, [])
    

  return ( // TODO: Style and make editable
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

const mapStateToProps = reduxStoreState => {
  return {
    token: reduxStoreState.token,
    viewingPackage: reduxStoreState.pack.viewingPackage
  }
}

export default connect(mapStateToProps, { setViewingPackage, getViewingPackage  })(Package)
