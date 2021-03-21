import { DELIVERY_URL } from '../constants'

const packageService = () => {
    const token = JSON.parse(localStorage.getItem('token'));
    return {
        getPackages: (id) => fetch(DELIVERY_URL`/${id}/packages`, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        }).then(d => d.json())
    }
}

export default packageService()
