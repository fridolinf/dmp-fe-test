import { Card, CardMedia } from "@mui/material";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import { useGoogleLogin } from "@react-oauth/google";

import FacebookLogin, {
  FacebookLoginClient,
} from "@greatsumini/react-facebook-login";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const appId = process.env.REACT_APP_FB_ID;
const Auth = () => {
  const navigate = useNavigate();

  const login = useGoogleLogin({
    onSuccess: (tokenResponse) => tokenResponse && navigate("/home"),
  });

  useEffect(() => {
    FacebookLoginClient.init({ appId, version: "v5.0" });
  }, []);

  return (
    <Grid
      container
      spacing={0}
      direction="column"
      alignItems="center"
      justifyContent="center"
      textAlign="center"
      style={{ minHeight: "100vh" }}
    >
      <Grid display="flex" justifyContent="space-around">
        {/* Facebook */}
        <FacebookLogin
          appId="544895064344298"
          onSuccess={(response) => {
            navigate("/home");
          }}
          onFail={(error) => {
            console.log("Login Failed!", error);
          }}
          onProfileSuccess={(response) => {
            console.log("Get Profile Success!", response);
          }}
          render={({ onClick, logout }) => (
            <Card
              sx={{
                width: "30%",
                boxShadow: "1px 1px 10px 5px grey",
                padding: 2.5,
                cursor: "pointer",
                "&:hover": { width: "32%" },
              }}
              onClick={onClick}
            >
              <CardMedia
                sx={{ marginTop: 2, objectFit: "contain" }}
                component="img"
                height="194"
                image="https://upload.wikimedia.org/wikipedia/commons/thumb/5/51/Facebook_f_logo_%282019%29.svg/2048px-Facebook_f_logo_%282019%29.svg.png"
                alt="facebook"
              />
              <Typography>LOGIN WITH FACEBOOK</Typography>
            </Card>
          )}
        />
        {/* Google */}
        <Card
          sx={{
            width: "30%",
            boxShadow: "1px 1px 10px 5px grey",
            padding: 2.5,
            cursor: "pointer",
            "&:hover": { width: "32%" },
          }}
          onClick={() => login()}
        >
          <CardMedia
            sx={{ marginTop: 2, objectFit: "contain" }}
            component="img"
            height="194"
            image="https://upload.wikimedia.org/wikipedia/commons/thumb/5/53/Google_%22G%22_Logo.svg/768px-Google_%22G%22_Logo.svg.png"
            alt="google"
          />
          <Typography>LOGIN WITH GOOGLE</Typography>
        </Card>
      </Grid>
    </Grid>
  );
};

export default Auth;
