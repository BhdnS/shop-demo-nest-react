import { AppDispatch } from '../redux/store/store.ts'
import { useDispatch } from 'react-redux'

const useAppDispatch = useDispatch.withTypes<AppDispatch>()

export default useAppDispatch
