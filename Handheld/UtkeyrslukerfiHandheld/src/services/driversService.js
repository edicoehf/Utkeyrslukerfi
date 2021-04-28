import { DRIVERS_URL } from '../constants'

const driverService = () => {
    return {
        getDrivers: () => fetch(DRIVERS_URL, {}).then(d => d.json()).then(d => d)
    }
}

export default driverService()