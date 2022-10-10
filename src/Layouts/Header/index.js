import React from "react";
import Search from "@mui/icons-material/Search";
import Notifications from "@mui/icons-material/NotificationsOutlined";
import Message from "@mui/icons-material/MessageOutlined";
import Logout from "@mui/icons-material/Logout";
import People from "@mui/icons-material/People";
import { Box, FormControl, Grid, Input, InputAdornment, Typography } from "@mui/material";

function Header(props) {
  return (
    <div>
      <Box sx={{ boxShadow: 1, p: 1 }}>
        <Grid container justifyContent="space-between">
          <Grid xs={3} sx={{p:1}}>
            <FormControl variant="standard">
              <Input
                id="input-with-icon-adornment"
                placeholder="Search Topics"
                startAdornment={
                  <InputAdornment position="start">
                    <Search />
                  </InputAdornment>
                }
              />
            </FormControl>
          </Grid>
          <Grid sx={9}>
            <Notifications sx={{m:1}} />
            <Message sx={{m:1}}  />
            <Logout sx={{m:1}}  />
          </Grid>
        </Grid>
      </Box>

      <Box sx={{ boxShadow: 1, p: 2 }}>
        <Grid container>
            <Box sx={{boxShadow:1, mr:2}}>
              <People sx={{m:2}} fontSize="large"  />
            </Box>
          <Grid >
            <Typography variant="h5">New Employee</Typography>
            <Typography variant="caption">
              Form Design With Validation
            </Typography>
          </Grid>
        </Grid>
      </Box>
    </div>
  );
}

export default Header;
