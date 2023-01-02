import { AppBar, Button, Grid, Typography } from "@mui/material";
import { googleLogout } from "@react-oauth/google";
import { useNavigate } from "react-router-dom";

const HeaderComponent = () => {
  const navigate = useNavigate();
  const logout = () => {
    googleLogout();
    navigate(-1);
  };
  return (
    <AppBar component="nav" position="sticky">
      <Grid container justifyContent="space-between" alignItems="center">
        <Typography
          variant="p"
          component="div"
          sx={{ fontWeight: "bold", padding: 2, fontSize: "1.3rem" }}
        >
          GitHub
          <Typography variant="span" fontWeight="normal">
            Jobs
          </Typography>
        </Typography>
        <Button
          onClick={logout}
          variant="contained"
          sx={{ fontWeight: "bold", fontSize: "1.3rem" }}
        >
          LOGOUT
        </Button>
      </Grid>
    </AppBar>
  );
};

export default HeaderComponent;
