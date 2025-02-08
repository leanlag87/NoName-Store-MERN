import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { clearErrors } from "../../store/reducers/userSlice.js";
import { registerUser } from "../../store/reducers/userSlice.js";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import {
  Avatar,
  Button,
  CssBaseline,
  TextField,
  Link,
  Grid,
  Box,
  Typography,
  Container,
  Paper,
} from "@mui/material";
import { styled } from "@mui/material/styles";

// Estilos personalizados
const MyContainer = styled(Container)({
  marginTop: "80px",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
});

const MyPaper = styled(Paper)({
  padding: "30px",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
});

const MyAvatar = styled(Avatar)({
  margin: "10px",
  backgroundColor: "#f50057",
});

const MyForm = styled("form")({
  width: "100%",
  marginTop: "30px",
});

const RegisterPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { error, loading, isAuthenticated, user } = useSelector(
    (state) => state.user
  ); // Asegúrate de que user sea parte de tu estado inicial si necesitas usarlo aquí

  const [formData, setFormData] = useState({
    name: "",
    lastname: "",
    email: "",
    password: "",
    avatar: null,
  });

  const { name, lastname, email, password } = formData;

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFileChange = (e) => {
    setFormData({ ...formData, avatar: e.target.files[0] });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const form = new FormData();
    form.append("name", name);
    form.append("lastname", lastname);
    form.append("email", email);
    form.append("password", password);
    form.append("avatar", formData.avatar);

    dispatch(registerUser(form));
  };

  useEffect(() => {
    if (isAuthenticated) {
      navigate("/");
    }

    if (error) {
      toast.error(error);
      dispatch(clearErrors());
    }
  }, [dispatch, isAuthenticated, error, navigate]);

  return (
    <MyContainer component="main" maxWidth="xs">
      <CssBaseline />
      <MyPaper elevation={3}>
        <MyAvatar />
        <Typography component="h1" variant="h5">
          Registro
        </Typography>
        <MyForm onSubmit={handleSubmit} encType="multipart/form-data">
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField
                autoComplete="given-name"
                name="name"
                variant="outlined"
                required
                fullWidth
                id="firstName"
                label="Nombre"
                autoFocus
                value={name}
                onChange={handleInputChange}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="lastname"
                label="Apellido"
                name="lastname"
                autoComplete="family-name"
                value={lastname}
                onChange={handleInputChange}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="email"
                label="Correo Electrónico"
                name="email"
                autoComplete="email"
                value={email}
                onChange={handleInputChange}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                name="password"
                label="Contraseña"
                type="password"
                id="password"
                autoComplete="new-password"
                value={password}
                onChange={handleInputChange}
              />
            </Grid>
            <Grid item xs={12}>
              <input
                accept="image/*"
                style={{ display: "none" }}
                id="avatar"
                name="avatar"
                type="file"
                onChange={handleFileChange}
              />
              <label htmlFor="avatar">
                <Button variant="contained" component="span">
                  Subir Avatar
                </Button>
              </label>
            </Grid>
          </Grid>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            sx={{ mt: 3, mb: 2 }}
            disabled={loading}
          >
            {loading ? "Registrando..." : "Registrarse"}
          </Button>
          <Grid container justifyContent="flex-end">
            <Grid item>
              <Link href="/login" variant="body2">
                ¿Ya tienes una cuenta? Inicia Sesión
              </Link>
            </Grid>
          </Grid>
        </MyForm>
      </MyPaper>
      <Box mt={5}>
        {/* Aquí puedes añadir un componente de Footer o información adicional */}
      </Box>
    </MyContainer>
  );
};

export default RegisterPage;
