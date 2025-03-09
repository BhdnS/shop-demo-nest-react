import { Box, CircularProgress } from '@mui/material'
import { useGetAllUsersQuery } from '../../redux/users/usersApiSlice.ts'
import ErrorComponent from '../../components/pagesComponents/ErrorComponent'
import User from '../../components/pagesComponents/User'

const UsersPage = () => {
  const { data, isFetching, isError } = useGetAllUsersQuery(null)

  if (isError) {
    return <ErrorComponent />
  }

  if (isFetching || !data) {
    return <CircularProgress />
  }

  if (!data.length) {
    return <Box>Not Users</Box>
  }

  return (
    <Box>
      {data.map((user) => (
        <User key={user.id} {...user} />
      ))}
    </Box>
  )
}

export default UsersPage
