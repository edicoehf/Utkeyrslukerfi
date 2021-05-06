import { useHistory } from 'react-router'

const PackageList = ({ packages, deliveryID }) => {
  const history = useHistory()
  const navigateToPackage = (p) => {
    history.push(`/deliveries/${deliveryID}/packages/${p.id}`, { params: p })
  }

  return (
    <div className='package-list'>
      <span className='package-title'>Packages</span>
      {packages.map((p) =>
        (
          <div
            className='package'
            onClick={() => navigateToPackage(p)}
          >
            <span>Strikamerki:</span>
            <span>{p.id}</span>
          </div>
        )
      )}
    </div>
  )
}
export default PackageList
