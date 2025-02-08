import React, { useState, useEffect } from "react";
import { Typography } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import Loader from "../ui/Loader/Loader";
import MetaData from "../ui/MetaData/MetaData";
//import { UPDATE_PROFILE_RESET } from "../../constants/userConstanat";
import {
  clearErrors,
  resetUpdate,
  updateUser,
  loadUser,
} from "../../store/reducers/userSlice"; // Verificar si esto esta bien
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import UpdateIcon from "@mui/icons-material/Update";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import { Link } from "react-router-dom";
import * as LoginFromStyle from "./Styles/LoginFromStyle";

function UpdateProfile() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { error, isUpdated, loading } = useSelector(
    (state) => state.profileData
  );
  const { user } = useSelector((state) => state.userData);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [isValidEmail, setIsValidEmail] = useState(true);
  const [isValidName, setIsValidEName] = useState(true);
  const [avatar, setAvatar] = useState("");
  const [avatarPreview, setAvatarPreview] = useState("");

  const handleEmailChange = (event) => {
    const newEmail = event.target.value;
    setEmail(newEmail);
    setIsValidEmail(
      newEmail !== "" && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(newEmail)
    );
  };

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

  const handleNameChange = (event) => {
    setName(event.target.value);
    setIsValidEName(event.target.value.length >= 4);
  };

  const UpdateProfileSubmitHandler = (e) => {
    e.preventDefault();
    const myForm = new FormData();
    myForm.set("name", name);
    myForm.set("email", email);
    myForm.set("avatar", avatar);
    dispatch(updateUser(myForm));
  };

  useEffect(() => {
    //si el usuario no actualiza el nombre y cambia otros datos, entonces configuramos todos los datos de los datos del usuario prv inicialmente para nombre, correo electrónico y avatar.
    if (user) {
      setName(user.name);
      setEmail(user.email);
      setAvatarPreview(user.avatar.url);
    }

    if (error) {
      toast.error(error);
      dispatch(clearErrors());
    }
    // isUpadted no es más que un mensaje de éxito de la respuesta. Una vez actualizado el usuario, aparece el mensaje y muestra los datos del perfil.
    if (isUpdated) {
      toast.success("Perfil actualizado exitosamente");
      // ahora obtengo nuevos datos del usuario desde el backend
      dispatch({
        type: resetUpdate,
      });

      // Ahora restablezco todos los valores. por ejemplo: isUpdate: falso y todo
      dispatch({
        type: resetUpdate,
      });

      navigate("/account");

      dispatch(loadUser());
    }
  }, [dispatch, error, navigate, user, isUpdated]);

  const isSignInDisabled = !(email && isValidEmail && name && isValidName);

  return (
    <>
      <MetaData title="Update Profile" />
      {loading ? (
        <Loader />
      ) : (
        <LoginFromStyle.FormContainer>
          <LoginFromStyle.Form>
            <LoginFromStyle.StyledAvatar>
              <UpdateIcon />
            </LoginFromStyle.StyledAvatar>
            <LoginFromStyle.Heading variant="h5" component="h1">
              Actualizar detalles del perfil
            </LoginFromStyle.Heading>
            <LoginFromStyle.NameInput
              label="Nombre"
              variant="outlined"
              fullWidth
              value={name}
              error={!isValidName && name !== ""}
              helperText={
                !isValidName && name !== ""
                  ? "El nombre debe tener entre 4 y 20 caracteres.."
                  : ""
              }
              onChange={handleNameChange}
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
                  ? "Por favor, introduce una dirección de correo electrónico válida.."
                  : ""
              }
            />

            <LoginFromStyle.ImageUploaderRoot>
              <LoginFromStyle.StyledAvatar2
                alt="Avatar Preview"
                src={avatarPreview}
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
                  startIcon={<CloudUploadIcon style={{ color: "#FFFFFF" }} />}
                  component="span"
                >
                  <LoginFromStyle.UploadAvatarText>
                    Subir Avatar
                  </LoginFromStyle.UploadAvatarText>
                </LoginFromStyle.UploadAvatarButton>
              </label>
            </LoginFromStyle.ImageUploaderRoot>

            <LoginFromStyle.LoginButton
              variant="contained"
              fullWidth
              disabled={isSignInDisabled}
              style={{ marginTop: "3rem" }}
              onClick={UpdateProfileSubmitHandler}
            >
              Actualizar perfil
            </LoginFromStyle.LoginButton>
            <Typography
              variant="body1"
              align="center"
              style={{ marginTop: ".5rem" }}
            >
              <Link to="/account">
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

export default UpdateProfile;
