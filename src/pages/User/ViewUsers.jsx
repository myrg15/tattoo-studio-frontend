import React, { useEffect, useState } from 'react'
import { getAllUsers } from '../../services/apiCalls';
import { Box, Card, Typography } from '@mui/material';

const ViewUsers = () => {

    const [users, setUsers] = useState([])

    useEffect(() => {
        const fetchData = async () => {
          const resp = await getAllUsers();
          setUsers(resp.users)
        };
    
        fetchData();
      }, []);

  return (
    <Box display="flex" flexWrap="wrap" gap="15px" padding="15px" justifyContent="center">
      {
        users.map(item => {
            return <Card sx={{ width:"270px" }}>
                <Typography variant="body1">User Name: {item.username}</Typography>
                <Typography variant="body1">Email: {item.email}</Typography>
                <Typography variant="body1">Role: {item.role}</Typography>
            </Card>
        })
      }
    </Box>
  )
}

export default ViewUsers
