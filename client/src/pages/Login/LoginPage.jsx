import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loginUser, clearErrors } from "../../store/reducers/userSlice"; // Importar las acciones
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
  backgroundColor: "#f50057", // Color de tu elección
});

const MyForm = styled("form")({
  width: "100%",
  marginTop: "10px",
});

const LoginPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isAuthenticated, error, loading } = useSelector(
    (state) => state.user
  );

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();
    dispatch(loginUser({ email, password }));
  };

  useEffect(() => {
    if (isAuthenticated) {
      navigate("/"); // Redirigir al home después del login
    }

    if (error) {
      // Aquí puedes mostrar el error al usuario, por ejemplo, con una toasta o un mensaje en la página
      toast.error(error);
      dispatch(clearErrors());
    }
  }, [isAuthenticated, error, dispatch, navigate]);

  return (
    <MyContainer component="main" maxWidth="xs">
      <CssBaseline />
      <MyPaper elevation={3}>
        <MyAvatar></MyAvatar>
        <Typography component="h1" variant="h5">
          Iniciar Sesión
        </Typography>
        <MyForm onSubmit={handleSubmit}>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="email"
            label="Correo Electrónico"
            name="email"
            autoComplete="email"
            autoFocus
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="password"
            label="Contraseña"
            type="password"
            id="password"
            autoComplete="current-password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            sx={{ mt: 3, mb: 2 }}
            disabled={loading}
          >
            {loading ? "Iniciando sesión..." : "Iniciar Sesión"}
          </Button>
          <Grid container>
            <Grid item xs>
              <Link href="/password/forgot" variant="body2">
                ¿Olvidaste tu contraseña?
              </Link>
            </Grid>
            <Grid item>
              <Link href="/register" variant="body2">
                {"¿No tienes una cuenta? Regístrate"}
              </Link>
            </Grid>
          </Grid>
        </MyForm>
      </MyPaper>
      <Box mt={8}>
        {/* Aquí puedes añadir un componente de Footer o información adicional */}
      </Box>
    </MyContainer>
  );
};

export default LoginPage;
