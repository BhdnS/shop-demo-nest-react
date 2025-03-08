import { useNavigate } from 'react-router'

type UseRedirect = () => (route: string | number, replace?: boolean) => void

const useRedirect: UseRedirect = () => {
  const navigate = useNavigate()

  return (route, replace = true) => {
    if (typeof route === 'number') {
      navigate(route)
    } else {
      navigate(route, { replace })
    }
  }
}

export default useRedirect
