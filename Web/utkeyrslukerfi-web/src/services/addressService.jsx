import { ADDRESS_URL } from '../constants'

const addressService = () => {
    return {
        createAddress: (token, address) => fetch(ADDRESS_URL, {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`
            },
            method: 'POST',
            body: JSON.stringify(address)
        }).then(d => d)
    }
}

export default addressService()