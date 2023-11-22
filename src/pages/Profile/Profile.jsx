import React, { useEffect, useState } from "react"
import { getProfile } from "../../services/apiCalls";
import { Box, Card, Typography } from "@mui/material";

export const Profile = () => {

  const [profile, setProfile] = useState({})
  useEffect(() => {
    const data = async () => {
      const response = await getProfile();
      setProfile(response);
    };

    data();
  }, []);

  return (
    <Box>
      <Typography variant="h4" padding="10px">
        Your Profile
      </Typography>
      
    <Box
    display="flex"
    flexWrap="wrap"
    gap="15px"
    padding="20px"
    justifyContent="center"    
    >
      <Card sx={{padding: "20px" }}>
       <Typography variant="body1">Username : {profile.username}</Typography>
       <Typography variant="body1">Email : {profile.email}</Typography>
       <Typography variant="body1">Phone : {profile.phone_number}</Typography>
      </Card>
    </Box>
    </Box>
  );
};

export default Profile