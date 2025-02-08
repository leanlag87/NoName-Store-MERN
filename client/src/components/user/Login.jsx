import React, { useState, useEffect } from "react";
import { FormControlLabel, Checkbox, Typography, Grid } from "@mui/material";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import LockOpenIcon from "@mui/icons-material/LockOpen";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useLocation } from "react-router-dom";
import { loginUser, clearErrors } from "../../store/reducers/userSlice";
import Loader from "../ui/Loader/Loader";
import MetaData from "../ui/MetaData/MetaData";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";
import * as LoginFromStyle from "./Styles/LoginFromStyle";

export default function Login() {
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();

  const { isAuthenticated, loading, error } = useSelector(
    (state) => state.user
  );

  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isValidEmail, setIsValidEmail] = useState(true);

  const handleEmailChange = (event) => {
    const newEmail = event.target.value;
    setEmail(newEmail);
    setIsValidEmail(
      newEmail !== "" && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(newEmail)
    );
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleShowPasswordClick = () => {
    setShowPassword(!showPassword);
  };

  const isSignInDisabled = !(email && password && isValidEmail);

  const redirect = location.search ? location.search.split("=")[1] : "/account";

  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch(clearErrors());
    }

    if (isAuthenticated) {
      navigate(redirect);
    }
  }, [dispatch, isAuthenticated, loading, error, navigate, redirect]);

  function handleLoginSubmit(e) {
    e.preventDefault();
    dispatch(loginUser(email, password));
  }

  return (
    <>
      <MetaData title={"Login"} />
      {loading ? (
        <Loader />
      ) : (
        <LoginFromStyle.FormContainer>
          <LoginFromStyle.Form>
            <LoginFromStyle.StyledAvatar>
              <LockOpenIcon />
            </LoginFromStyle.StyledAvatar>
            <LoginFromStyle.Heading variant="h5" component="h1">
              Iniciar sesión
            </LoginFromStyle.Heading>
            <LoginFromStyle.EmailInput
              label="Email"
              variant="outlined"
              fullWidth
              value={email}
              onChange={handleEmailChange}
              error={!isValidEmail && email !== ""}
              helperText={
                !isValidEmail && email !== ""
                  ? "Por favor, ingrese una dirección de correo electrónico válida."
                  : ""
              }
            />
            <LoginFromStyle.PasswordInput
              label="Contraseña"
              variant="outlined"
              type={showPassword ? "text" : "password"}
              fullWidth
              InputProps={{
                endAdornment: (
                  <LoginFromStyle.ShowPasswordButton
                    variant="outlined"
                    onClick={handleShowPasswordClick}
                  >
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </LoginFromStyle.ShowPasswordButton>
                ),
              }}
              value={password}
              onChange={handlePasswordChange}
            />
            <LoginFromStyle.RememberMeContainer container>
              <Grid item>
                <FormControlLabel
                  control={<Checkbox color="primary" />}
                  label="Recuerdame"
                />
              </Grid>
              <Grid item>
                <Link to="/password/forgot" style={{ textDecoration: "none" }}>
                  <LoginFromStyle.ForgotPasswordLink>
                    ¿Olvidaste tu contraseña?
                  </LoginFromStyle.ForgotPasswordLink>
                </Link>
              </Grid>
            </LoginFromStyle.RememberMeContainer>
            <LoginFromStyle.TermsAndConditionsText variant="body2">
              Acepto los Términos de uso de NoName-Store y reconozco que
              NoName-Store utilizará mi información de acuerdo con sus
              <Link to="/policy/privacy" style={{ textDecoration: "none" }}>
                <LoginFromStyle.PrivacyText>
                  Política de Privacidad.
                </LoginFromStyle.PrivacyText>
              </Link>
            </LoginFromStyle.TermsAndConditionsText>
            <LoginFromStyle.LoginButton
              variant="contained"
              fullWidth
              disabled={isSignInDisabled}
              onClick={handleLoginSubmit}
            >
              Iniciar sesión
            </LoginFromStyle.LoginButton>
            <Typography
              variant="body1"
              align="center"
              style={{ marginTop: "1rem" }}
            >
              ¿No tenes cuenta?
              <Link to="/signup" style={{ textDecoration: "none" }}>
                <LoginFromStyle.CreateAccount>
                  Crear una cuenta
                </LoginFromStyle.CreateAccount>
              </Link>
            </Typography>
          </LoginFromStyle.Form>
        </LoginFromStyle.FormContainer>
      )}
    </>
  );
}
