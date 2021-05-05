import { useHistory } from 'react-router'

const PackageList = ({ packages, deliveryID }) => {
  const history = useHistory()
  const navigateToPackage = (p) => {
    history.push(`/deliveries/${deliveryID}/packages/${p.id}`, { params: p })
  }

  return (
    <div>
      <h3>Packages</h3>
      {packages.map((p) =>
        (
          <div onClick={() => navigateToPackage(p)}>
            <h4>Barkóði:</h4>
            <h4>{p.id}</h4>
          </div>
        )
      )}
    </div>
  )
}
export default PackageList
