//React y hooks
import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";

//Componentes de Material-UI
import { FormControlLabel, Grid, Typography } from "@mui/material";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";

//Utilidades y servicios
import { toast } from "react-toastify";
import { registerUser, clearErrors } from "../../store/reducers/userSlice";

//Componentes propios
import Loader from "../ui/Loader/Loader";
import MetaData from "../ui/MetaData/MetaData";
import * as LoginFromStyle from "./Styles/LoginFromStyle";

function Signup() {
  //Estados de formulario
  const [name, setName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  //Estados de validación
  const [isValidEmail, setIsValidEmail] = useState(true);
  const [isValidName, setIsValidName] = useState(true);
  const [isValidLastName, setIsValidLastName] = useState(true);
  const [isValidPassword, setIsValidPassword] = useState(true);
  // Estados de UI
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [areCheckboxesChecked, setAreCheckboxesChecked] = useState({
    checkbox1: false,
    checkbox2: false,
  });
  //Estados de avatar
  const [avatar, setAvatar] = useState("");
  const [avatarPreview, setAvatarPreview] = useState("");
  // Hooks
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { isAuthenticated, error } = useSelector((state) => state.user);
  //Effects
  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch(clearErrors());
    }

    if (isAuthenticated) {
      toast.success("Usuario registrado exitosamente");
      navigate("/account");
    }
  }, [dispatch, isAuthenticated, loading, error, navigate]);

  //Handlers de validación
  const handleEmailChange = (event) => {
    const newEmail = event.target.value;
    setEmail(newEmail);
    setIsValidEmail(
      newEmail !== "" && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(newEmail)
    );
  };

  const handleNameChange = (event) => {
    const newName = event.target.value;
    setName(newName);
    setIsValidName(newName.length >= 4 && newName.length <= 20);
  };
  //función para el cambio en el campo Apellido
  const handleLastNameChange = (event) => {
    const newLastName = event.target.value;
    setLastName(newLastName);
    setIsValidLastName(newLastName.length >= 4 && newLastName.length <= 20);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
    setIsValidPassword(event.target.value.length >= 8);
  };

  //Handlers de UI
  const handleShowPasswordClick = () => {
    setShowPassword(!showPassword);
  };

  const handleConfirmPasswordChange = (event) => {
    setConfirmPassword(event.target.value);
  };

  const handleCheckboxChange = (checkboxName) => (event) => {
    setAreCheckboxesChecked((prevState) => ({
      ...prevState,
      [checkboxName]: event.target.checked,
    }));
  };

  //Handlers de avatar
  const handleAvatarChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        setAvatarPreview(reader.result);
        setAvatar(reader.result);
      };
    }
  };

  //Handlers de submit
  function handleSignUpSubmit(e) {
    setLoading(true);
    e.preventDefault();

    if (password !== confirmPassword) {
      toast.error("Contraseña y Confirmar contraseña no coinciden");
      setLoading(false);
      return;
    }

    const formData = new FormData();
    formData.set("name", name);
    formData.set("lastName", lastName);
    formData.set("email", email);
    formData.set("password", password);
    formData.set("avatar", avatar);

    dispatch(registerUser(formData));
    setLoading(false);
  }

  //Utilidades y cálculos
  const isSignInDisabled = !(
    email &&
    password &&
    isValidEmail &&
    confirmPassword &&
    name &&
    lastName &&
    isValidName &&
    isValidLastName &&
    areCheckboxesChecked.checkbox1 &&
    areCheckboxesChecked.checkbox2
  );

  return (
    <>
      <MetaData title={"Sign Up"} />
      {loading ? (
        <Loader />
      ) : (
        <LoginFromStyle.FormContainer>
          <LoginFromStyle.Form>
            <LoginFromStyle.StyledAvatar>
              <LockOutlinedIcon />
            </LoginFromStyle.StyledAvatar>
            <LoginFromStyle.Heading variant="h5" component="h1">
              ¡Regístrese para obtener una cuenta!
            </LoginFromStyle.Heading>
            <LoginFromStyle.NameInput
              label="Nombre"
              variant="outlined"
              fullWidth
              value={name}
              onChange={handleNameChange}
              error={!isValidName && name !== ""}
              helperText={
                !isValidName && name !== ""
                  ? "El nombre debe tener entre 4 y 20 caracteres."
                  : ""
              }
            />
            <LoginFromStyle.LastNameInput
              label="Apellido"
              variant="outlined"
              fullWidth
              value={lastName}
              onChange={handleLastNameChange}
              error={!isValidLastName && lastName !== ""}
              helperText={
                !isValidLastName && lastName !== ""
                  ? "El apellido debe tener entre 4 y 20 caracteres."
                  : ""
              }
            />
            <LoginFromStyle.EmailInput
              label="Email"
              variant="outlined"
              fullWidth
              value={email}
              onChange={handleEmailChange}
              error={!isValidEmail && email !== ""}
              helperText={
                !isValidEmail && email !== ""
                  ? "Por favor, introduce una dirección de correo electrónico válida."
                  : ""
              }
            />
            <LoginFromStyle.PasswordInput
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
            <LoginFromStyle.ImageUploaderRoot>
              <LoginFromStyle.StyledAvatar2
                alt="Avatar Preview"
                src={avatarPreview || ""}
              />
              <LoginFromStyle.Input
                accept="image/*"
                id="avatar-input"
                type="file"
                onChange={handleAvatarChange}
              />
              <label htmlFor="avatar-input">
                <LoginFromStyle.UploadAvatarButton
                  variant="contained"
                  color="inherit"
                  component="span"
                  startIcon={<CloudUploadIcon style={{ color: "#FFFFFF" }} />}
                >
                  <LoginFromStyle.UploadAvatarText>
                    Subir Avatar
                  </LoginFromStyle.UploadAvatarText>
                </LoginFromStyle.UploadAvatarButton>
              </label>
            </LoginFromStyle.ImageUploaderRoot>
            <LoginFromStyle.Gridcheckbox
              container
              justify="flex-start"
              alignItems="center"
            >
              <Grid item>
                <FormControlLabel
                  control={<LoginFromStyle.StyledCheckbox color="primary" />}
                  label="Acepto los términos & condiciones de NoName-Store"
                  checked={areCheckboxesChecked.checkbox1}
                  onChange={handleCheckboxChange("checkbox1")}
                />
              </Grid>
              <Grid item>
                <FormControlLabel
                  control={<LoginFromStyle.StyledCheckbox color="primary" />}
                  label="Acepto los términos de uso de NoName-Store"
                  checked={areCheckboxesChecked.checkbox2}
                  onChange={handleCheckboxChange("checkbox2")}
                />
              </Grid>
            </LoginFromStyle.Gridcheckbox>
            <LoginFromStyle.TermsAndConditionsText variant="body2">
              Reconozco que NoName-Store utilizará mi información de acuerdo con
              sus
              <Link to="/policy/privacy" style={{ textDecoration: "none" }}>
                <LoginFromStyle.PrivacyText>
                  Política de privacidad.
                </LoginFromStyle.PrivacyText>
              </Link>
            </LoginFromStyle.TermsAndConditionsText>
            <LoginFromStyle.LoginButton
              variant="contained"
              fullWidth
              onClick={handleSignUpSubmit}
              disabled={isSignInDisabled || loading}
            >
              Crear cuenta
            </LoginFromStyle.LoginButton>
            <Typography
              variant="body1"
              align="center"
              style={{ marginTop: "1rem" }}
            >
              ¿Ya tenes una cuenta?
              <Link to="/login" style={{ textDecoration: "none" }}>
                <LoginFromStyle.CreateAccount>
                  Login
                </LoginFromStyle.CreateAccount>
              </Link>
            </Typography>
          </LoginFromStyle.Form>
        </LoginFromStyle.FormContainer>
      )}
    </>
  );
}

export default Signup;
