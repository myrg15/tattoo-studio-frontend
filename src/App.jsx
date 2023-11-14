
import { Box } from '@mui/material'
import  Header  from './common/Header/Header'
import { Body } from './pages/Body/Body'

function App() {

    return (
        <Box display="flex" flexDirection="column" height="100vh">
            <Header />
            <Body />
        </Box>
    )
}

export default App
