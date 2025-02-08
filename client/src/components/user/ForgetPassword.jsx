import React, { useState, useEffect } from "react";
import LockClockIcon from "@mui/icons-material/LockClock";
import { Typography } from "@mui/material"; // Cambiado a @mui/material
import { useDispatch, useSelector } from "react-redux";
import { forgotPassword, clearErrors } from "../../store/reducers/userSlice";
import { toast } from "react-toastify";
import MetaData from "../ui/MetaData/MetaData";
import Loader from "../ui/Loader/Loader";
import { Link } from "react-router-dom";
import * as LoginFromStyle from "./Styles/LoginFromStyle";

export default function ForgetPassowrd() {
  const dispatch = useDispatch();
  const { error, message, loading } = useSelector(
    (state) => state.forgetPassword
  );

  const [email, setEmail] = useState("");
  const [isValidEmail, setIsValidEmail] = useState(true);
  const [isDone, setIsDone] = useState(false);

  const handleEmailChange = (event) => {
    const newEmail = event.target.value;
    setEmail(newEmail);
    setIsValidEmail(
      newEmail !== "" && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(newEmail)
    );
  };

  function handleforgotPasswordSubmit(e) {
    e.preventDefault();
    setIsDone(!isDone);

    const myForm = new FormData();
    myForm.set("email", email);
    dispatch(forgotPassword(myForm));
  }

  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch(clearErrors());
    }

    if (message) {
      toast.success(message);
      setEmail("");
    }
  }, [dispatch, error, message, loading]);

  const isSignInDisabled = !(email && isValidEmail);

  return (
    <>
      <MetaData title="Forget Password" />
      {loading ? (
        <Loader />
      ) : (
        <LoginFromStyle.FormContainer>
          <LoginFromStyle.Form>
            <LoginFromStyle.StyledAvatar>
              <LockClockIcon />
            </LoginFromStyle.StyledAvatar>
            <LoginFromStyle.Heading variant="h5" component="h1">
              ¿Olvidaste tu contraseña?
            </LoginFromStyle.Heading>

            {isDone && (
              <LoginFromStyle.Heading
                variant="body1"
                align="center"
                style={{ color: "#007500" }}
              >
                Se ha enviado un correo electrónico sobre el cambio de
                contraseña a su dirección de correo electrónico.
              </LoginFromStyle.Heading>
            )}

            <LoginFromStyle.EmailInput
              label="Email"
              variant="outlined"
              fullWidth
              value={email}
              onChange={handleEmailChange}
              error={!isValidEmail && email !== ""}
              helperText={
                !isValidEmail && email !== ""
                  ? "Por favor ingrese un correo electrónico valido."
                  : ""
              }
            />

            <LoginFromStyle.LoginButton
              variant="contained"
              fullWidth
              disabled={isSignInDisabled}
              style={{ marginTop: "3rem" }}
              onClick={handleforgotPasswordSubmit}
            >
              Enviar correo
            </LoginFromStyle.LoginButton>
            <Typography
              variant="body1"
              align="center"
              style={{ marginTop: ".3rem" }}
            >
              <Link to="/login">
                <LoginFromStyle.CreateAccount>
                  Cancelar
                </LoginFromStyle.CreateAccount>
              </Link>
            </Typography>
          </LoginFromStyle.Form>
        </LoginFromStyle.FormContainer>
      )}
    </>
  );
}
