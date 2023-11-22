import React, { useEffect, useState } from "react"
import { getProfile } from "../../services/apiCalls";
import { Box, Typography } from "@mui/material";

export const Profile = () => {

  const [profile, setProfile] = useState({})

  useEffect(() => {
    const data = async () => {
      const response = await getProfile();
      //const artist = await getAllArtist();
      //setArtist(artist);
      setProfile(response);
    };

    data();
  }, []);


  return (
    <Box>
       <Typography variant="body1">Username : {profile.username}</Typography>
       <Typography variant="body1">Email : {profile.email}</Typography>
       <Typography variant="body1">Phone : {profile.phone_number}</Typography>
    </Box>
  )
}

export default Profile