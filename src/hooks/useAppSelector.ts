import { useSelector } from 'react-redux'
import { RootState } from '../redux/store/store.ts'

const useAppSelector = useSelector.withTypes<RootState>()

export default useAppSelector
