import { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { getLogin } from '../../actions/loginActions'
import Login from '../../components/Login'

// eslint-disable-next-line
export default function (Component) {
  const Authorization = () => {
    const dispatch = useDispatch()
    const token = useSelector(({ login }) => login.token)
    const [shouldNotLogin, setShouldNotLogin] = useState(true)

    useEffect(() => {
      dispatch(getLogin())
    })

    useEffect(() => {
      const header = document.getElementsByTagName('nav')[0]
      const container = document.getElementsByClassName('container')[0]
      if (token === null || token.length === 0) {
        setShouldNotLogin(false)
        header.classList.add('hide')
        container.classList.add('login-container')
        return
      }
      header.classList.remove('hide')
      container.classList.remove('login-container')
      setShouldNotLogin(true)
    }, [token])
    return (
      shouldNotLogin ? <Component /> : <Login />
    )
  }
  return (Authorization)
}
