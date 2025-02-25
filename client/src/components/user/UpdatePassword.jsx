import React, { useState, useEffect } from "react";
import { Typography } from "@mui/material";
import SecurityUpdateGoodIcon from "@mui/icons-material/SecurityUpdateGood";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import Loader from "../ui/Loader/Loader";
import MetaData from "../ui/MetaData/MetaData";
import { useDispatch, useSelector } from "react-redux";
import {
  resetPassword,
  updatePassword,
  clearErrors,
} from "../../store/reducers/userSlice";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import * as LoginFromStyle from "./Styles/LoginFromStyle";

function UpdatePassword() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { loading, isUpdated, error, user } = useSelector(
    (state) => state.user
  );
  const [showPassword, setShowPassword] = useState(false);
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setconfirmPassword] = useState("");
  const [isValidPassword, setIsValidPassword] = useState(true);
  const [isValidConfirmPassword, setisValidConfirmPassword] = useState(true);

  const handleOldPassword = (e) => {
    setOldPassword(e.target.value);
  };
  const handlePasswordChange = (e) => {
    setNewPassword(e.target.value);
    setIsValidPassword(e.target.value.length >= 8);
  };
  const handleConfirmPasswordChange = (e) => {
    setconfirmPassword(e.target.value);
    setisValidConfirmPassword(e.target.value.length >= 8);
  };

  const handleShowPasswordClick = () => {
    setShowPassword(!showPassword);
  };

  function updatePasswordSubmitHandler(e) {
    e.preventDefault();

    if (newPassword !== confirmPassword) {
      toast.error("Contraseña y Confirmar contraseña no coinciden");
      return;
    }
    const myForm = new FormData();
    myForm.set("oldPassword", oldPassword);
    myForm.set("newPassword", newPassword);
    myForm.set("confirmPassword", confirmPassword);

    dispatch(updatePassword(myForm));
  }

  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch(clearErrors());
    }
    if (isUpdated) {
      toast.success("Perfil actualizado exitosamente");
      dispatch({
        type: resetPassword,
      });
      navigate("/account");
    }
  }, [dispatch, error, user, isUpdated, loading, navigate]);

  const isSignInDisabled = !(
    newPassword &&
    confirmPassword &&
    oldPassword &&
    isValidPassword
  );

  return (
    <>
      <MetaData title={"Update Password"} />
      {loading ? (
        <Loader />
      ) : (
        <LoginFromStyle.FormContainer>
          <LoginFromStyle.Form>
            <LoginFromStyle.StyledAvatar>
              <SecurityUpdateGoodIcon />
            </LoginFromStyle.StyledAvatar>
            <LoginFromStyle.Heading variant="h5" component="h1">
              Actualizar Contraseña
            </LoginFromStyle.Heading>

            <LoginFromStyle.PasswordInput
              style={{ marginTop: "1rem" }}
              label="Contraseña Anterior"
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
              value={oldPassword}
              onChange={handleOldPassword}
            />
            <LoginFromStyle.PasswordInput
              style={{ marginTop: "4rem" }}
              label="Contraseña Nueva"
              variant="outlined"
              type={showPassword ? "text" : "password"}
              fullWidth
              error={!isValidPassword && newPassword !== ""}
              helperText={
                !isValidPassword && newPassword !== ""
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
              value={newPassword}
              onChange={handlePasswordChange}
            />
            <LoginFromStyle.PasswordInput
              label="Confirmar Contraseña"
              variant="outlined"
              type={showPassword ? "text" : "password"}
              fullWidth
              error={!isValidConfirmPassword && confirmPassword !== ""}
              helperText={
                !isValidConfirmPassword && confirmPassword !== ""
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
              value={confirmPassword}
              onChange={handleConfirmPasswordChange}
            />

            <LoginFromStyle.LoginButton
              variant="contained"
              fullWidth
              disabled={isSignInDisabled}
              style={{ marginTop: "3.5rem" }}
              onClick={updatePasswordSubmitHandler}
            >
              Actualizar contraseña
            </LoginFromStyle.LoginButton>
            <Typography
              variant="body1"
              align="center"
              style={{ marginTop: ".5rem" }}
            >
              <LoginFromStyle.CreateAccount to="/account">
                Cancelar
              </LoginFromStyle.CreateAccount>
            </Typography>
          </LoginFromStyle.Form>
        </LoginFromStyle.FormContainer>
      )}
    </>
  );
}

export default UpdatePassword;
