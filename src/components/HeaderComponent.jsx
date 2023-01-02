import { AppBar, Typography } from "@mui/material";

const HeaderComponent = () => {
  return (
    <AppBar component="nav" position="sticky">
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
    </AppBar>
  );
};

export default HeaderComponent;
