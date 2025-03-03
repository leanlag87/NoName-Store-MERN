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
import * as LoginFromStyle from "./Styles/LoginFromStyle";

export default function Login() {
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();

  const { isAuthenticated, loading, error, user, authInitialized } =
    useSelector((state) => state.user);

  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isValidEmail, setIsValidEmail] = useState(true);

  const handleEmailChange = (e) => {
    const newEmail = e.target.value;
    setEmail(newEmail);
    setIsValidEmail(
      newEmail !== "" && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(newEmail)
    );
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleShowPasswordClick = () => {
    setShowPassword(!showPassword);
  };

  const isSignInDisabled = !(email && password && isValidEmail);

  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch(clearErrors());
    }
  }, [dispatch, error]);

  async function handleLoginSubmit(e) {
    e.preventDefault();

    if (!email || !password) {
      toast.error("Por favor, complete todos los campos");
      return;
    }

    if (!isValidEmail) {
      toast.error("Por favor, ingrese un email válido");
      return;
    }

    try {
      const result = await dispatch(loginUser({ email, password })).unwrap();
      console.log("Resultado del login:", result);

      if (!result.access) {
        throw new Error("No se recibió el token de acceso");
      }

      //Guardar el token en el LocalStorage
      localStorage.setItem("token", result.access);

      // Redirige aquí, después de un inicio de sesión exitoso
      const redirectTo = location.state?.from || "/account";
      navigate(redirectTo, { replace: true });
    } catch (error) {
      console.error("Error en login:", error);
      toast.error(
        error.message ||
          "Error al iniciar sesión. Por favor, verifique sus credenciales."
      );
    }
  }

  // Redirige en el useEffect si ya está autenticado al cargar el componente
  useEffect(() => {
    if (authInitialized && isAuthenticated && user) {
      const redirectTo = location.state?.from || "/account";
      navigate(redirectTo, { replace: true });
    }
  }, [authInitialized, isAuthenticated, user, navigate, location]);

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
              id="email"
              name="email"
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
              autoComplete="email"
            />
            <LoginFromStyle.PasswordInput
              id="password"
              name="password"
              label="Contraseña"
              variant="outlined"
              type={showPassword ? "text" : "password"}
              fullWidth
              InputProps={{
                endAdornment: (
                  <LoginFromStyle.ShowPasswordButton
                    type="button"
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
                <LoginFromStyle.ForgotPasswordLink to="/password/forgot">
                  ¿Olvidaste tu contraseña?
                </LoginFromStyle.ForgotPasswordLink>
              </Grid>
            </LoginFromStyle.RememberMeContainer>
            <LoginFromStyle.TermsAndConditionsText variant="body2">
              Acepto los Términos de uso de NoName-Store y reconozco que
              NoName-Store utilizará mi información de acuerdo con sus
              <LoginFromStyle.PrivacyText to="/policy/privacy">
                Política de Privacidad.
              </LoginFromStyle.PrivacyText>
            </LoginFromStyle.TermsAndConditionsText>
            <LoginFromStyle.LoginButton
              type="submit"
              variant="contained"
              fullWidth
              disabled={isSignInDisabled || loading}
              onClick={handleLoginSubmit}
            >
              {loading ? "Iniciando sesión..." : "Iniciar sesión"}
            </LoginFromStyle.LoginButton>
            <Typography
              variant="body1"
              align="center"
              style={{ marginTop: "1rem" }}
            >
              ¿No tenes cuenta?
              <LoginFromStyle.CreateAccount to="/signup">
                Crear cuenta
              </LoginFromStyle.CreateAccount>
            </Typography>
          </LoginFromStyle.Form>
        </LoginFromStyle.FormContainer>
      )}
    </>
  );
}
