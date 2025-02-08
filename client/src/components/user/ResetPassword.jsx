import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { resetPassword, clearErrors } from "../../store/reducers/userSlice.js";
import { toast } from "react-toastify";
import { useNavigate, useParams } from "react-router-dom";
import MetaData from "../ui/MetaData/MetaData";
import Loader from "../ui/Loader/Loader";
import { Typography } from "@mui/material"; // Cambiado a @mui/material
import LockResetIcon from "@mui/icons-material/LockReset";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import { Link } from "react-router-dom";
import * as LoginFromStyle from "./Styles/LoginFromStyle";

function ResetPassword() {
  const match = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { error, success, loading } = useSelector(
    (state) => state.forgetPassword
  );
  const [showPassword, setShowPassword] = useState(false);
  const [password, setPassword] = useState("");
  const [confirmPassword, setconfirmPassword] = useState("");
  const [isValidPassword, setIsValidPassword] = useState(true);
  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
    setIsValidPassword(event.target.value.length >= 8);
  };
  const handleConfirmPasswordChange = (event) => {
    setconfirmPassword(event.target.value);
  };

  const handleShowPasswordClick = () => {
    setShowPassword(!showPassword);
  };

  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch(clearErrors());
    }

    if (success) {
      toast.success("Contraseña actualizada con éxito");
      navigate("/login");
    }
  }, [dispatch, error, success, navigate]);

  // submit handler
  function resetPasswordSubmitHandler(e) {
    e.preventDefault();

    if (password !== confirmPassword) {
      toast.error("Contraseña y Confirmar contraseña no coinciden");
      return;
    }
    const myForm = new FormData();
    myForm.set("password", password);
    myForm.set("confirmPassword", confirmPassword);

    dispatch(resetPassword(match.params.token, myForm));
  }

  const isSignInDisabled = !(password && confirmPassword && isValidPassword);

  return (
    <>
      <MetaData title="Reset Password" />
      {loading ? (
        <Loader />
      ) : (
        <LoginFromStyle.FormContainer>
          <LoginFromStyle.Form>
            <LoginFromStyle.StyledAvatar>
              <LockResetIcon />
            </LoginFromStyle.StyledAvatar>
            <LoginFromStyle.Heading variant="h5" component="h1">
              Restablecer contraseña
            </LoginFromStyle.Heading>

            <LoginFromStyle.PasswordInput
              style={{ marginTop: "1rem" }}
              label="Contraseña"
              variant="outlined"
              type={showPassword ? "text" : "password"}
              fullWidth
              error={!isValidPassword && password !== ""}
              helperText={
                !isValidPassword && password !== ""
                  ? "La contraseña debe tener al menos 8 caracteres."
                  : ""
              }
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
            <LoginFromStyle.PasswordInput
              label="Confirmar Contraseña"
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
              value={confirmPassword}
              onChange={handleConfirmPasswordChange}
            />

            <LoginFromStyle.LoginButton
              variant="contained"
              fullWidth
              disabled={isSignInDisabled}
              style={{ marginTop: "3.5rem" }}
              onClick={resetPasswordSubmitHandler}
            >
              Confirmar nueva contraseña
            </LoginFromStyle.LoginButton>
            <Typography
              variant="body1"
              align="center"
              style={{ marginTop: ".5rem" }}
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

export default ResetPassword;
