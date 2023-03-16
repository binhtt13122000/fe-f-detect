import GoogleButton from "src/components/Button/GoogleButton";

import loginImg from "../../assets/login.jpg";

import { Grid, Typography } from "@mui/material";
import { Box } from "@mui/system";
import { Fragment } from "react";
import useAuth, { googleProvider } from "src/hooks/useAuth";

const Login: React.FC = () => {
  const { login } = useAuth();
  return (
    <Fragment>
      <Grid
        container
        justifyContent="center"
        alignItems="center"
        sx={{
          minHeight: "100vh",
          backgroundImage: `url(${loginImg})`,
          backgroundSize: "100% 100%",
        }}
      >
        <Grid item xs={6} pt="6">
          <Grid item xs={12} sx={{ display: "flex", justifyContent: "center" }}>
            <span style={{ fontFamily: "Philosopher", fontSize: 100 }}>
              F - Detect
            </span>
          </Grid>
          <Grid item xs={12} sx={{ display: "flex", justifyContent: "center" }}>
            <Typography variant="overline" fontSize="20px">
              Bắt đầu ứng dụng với
            </Typography>
          </Grid>
          <Grid
            item
            xs={12}
            sx={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "center",
              m: 3,
            }}
          >
            <Box sx={{ width: 140, pr: 3 }}>
              <GoogleButton
                variant="outlined"
                fullWidth
                onClick={() => login(googleProvider)}
              >
                Google
              </GoogleButton>
            </Box>
          </Grid>
        </Grid>
      </Grid>
    </Fragment>
  );
};

export default Login;
